const axios = require('axios')
const fs = require('fs')
const LayerParser = require('./lanhu/LayerParser.js')
const layersHelper = require('./lanhu/layers-helper')
const { createDomTree } = require('./dom/dom-parser')
const { rebuildNodes, rebuildNode } = require('./dom/node-helper')
const StyleBuilder = require('./compile/style-builder')
const HtmlBuilder = require('./compile/html-builder')
const rm = require('rimraf')

let layerParser = new LayerParser()
let styleBuilder = new StyleBuilder(layerParser)
let htmlBuilder = new HtmlBuilder()
let html = ''
let style = ''
let mobile = true
let mobileFontSize = 20

let sections = []
let styles = []

function getPsdInfo() {
  return axios({
    url: 'https://alipic.lanhuapp.com/ps8d43d55c9cb94603-d6ba-4c0b-a83d-62f48c323dd2'
  }).then(res => {
    let psdInfo = res.data
    // 处理蓝湖数据，规范结构
    layersHelper.initData(psdInfo)
    // 设置图层解析器的全局数据
    layerParser.setImageData(psdInfo.board)
    layerParser.setMobileFontSize(mobileFontSize)

    // 设置mobile模式
    styleBuilder.setMobile(mobile)
    styleBuilder.setMobileFontSize(mobileFontSize)
    htmlBuilder.setMobile(mobile)

    // 根据蓝湖平铺的数组，构建dom tree结构
    let doms = createDomTree(psdInfo.info)
    // 深度遍历dom树
    traverseDoms(doms)

    rm('output/*', err => {
      if (err) {
        return console.error(err)
      }
      // 编译html模板
      htmlBuilder.compilteTemplate({
        APP: html,
        baseFontSize: mobileFontSize / 2
      }).then(htmlStr => {
       writeFile('output/dom.html', htmlStr)
      }).catch(err => {
        console.error('template compiler error -->', err)
      })
      writeFile('output/dom.css', style)
  
      createSections(sections, styles)
    })
  })
}
getPsdInfo()

// 遍历doms
function traverseDoms(nodes, level = 0, si) {
  let i = -1
  let n
  let temp = ''
  
  rebuildNodes(nodes, level)

  while(++i < nodes.length) {
    si = level === 0 ? i : si
    if (level === 0) {
      sections[si] = ''
      styles[si] = ''
    }
    n = nodes[i]
    rebuildNode(n)
    // 构建html开始标签
    temp = htmlBuilder.createNodeStart(n, level, i)
    html += temp
    sections[si] += temp
    if (n._children) {
      traverseDoms(n._children, level + 1, si)
    }
    // 生成节点样式
    temp = styleBuilder.createNodeStyle(n, level, i, nodes)
    style += temp
    styles[si] += temp
    // 构建html结束标签
    temp = htmlBuilder.createNodeEnd(n, level)
    html += temp
    sections[si] += temp
  }
}

// 生成文件
function writeFile(path, data) {
  fs.promises.writeFile(path, data).then(() => {
    console.log(path + ' success.')
  }).catch(err => {
    console.error(path + ' error-->', err)
  })
}

// 生成sections目录
function createSections(sections, styles) {
  sections.forEach((s, i) => {
    htmlBuilder.compilteTemplate({
      html: s,
      css: styles[i]
    }, { template: 'vue' }).then(htmlStr => {
     writeFile(`output/section${i+1}.vue`, htmlStr)
    }).catch(err => {
      console.error('sections compiler error -->', err)
    })
  })
}