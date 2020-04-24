const axios = require('axios')
const fs = require('fs')
const LayerParser = require('./lanhu/LayerParser.js')
const layersHelper = require('./lanhu/layers-helper')
const { createDomTree } = require('./dom/dom-parser')
const rebuildNode = require('./dom/node-rebuilde')
const StyleBuilder = require('./compile/style-builder')
const HtmlBuilder = require('./compile/html-builder')

let layerParser = new LayerParser()
let styleBuilder = new StyleBuilder(layerParser)
let htmlBuilder = new HtmlBuilder()
let html = ''
let style = ''
let mobile = true
let mobileFontSize = 32

function getPsdInfo() {
  return axios({
    url: 'https://alipic.lanhuapp.com/psc7f813107e3483bb-8a21-413a-9d44-7e03d81dcb10'
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
  })
}
getPsdInfo()

// 遍历doms
function traverseDoms(nodes, level = 0) {
  let i = -1
  let n
  while(++i < nodes.length) {
    n = nodes[i]
    rebuildNode(n)
    // 构建html开始标签
    html += htmlBuilder.createNodeStart(n, level, i)
    // 生成节点样式
    style += styleBuilder.createNodeStyle(n, level, i)    
    if (n._children) {
      traverseDoms(n._children, level + 1)
    }
    // 构建html结束标签
    html += htmlBuilder.createNodeEnd(n, level)
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
