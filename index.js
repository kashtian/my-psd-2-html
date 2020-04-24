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

function getPsdInfo() {
  return axios({
    url: 'https://alipic.lanhuapp.com/psc7f813107e3483bb-8a21-413a-9d44-7e03d81dcb10'
  }).then(res => {
    let psdInfo = res.data
    layersHelper.initData(psdInfo)

    layerParser.setImageData(psdInfo.board)

    let doms = createDomTree(psdInfo.info)
    traverseDoms(doms)

    htmlBuilder.compilteTemplate({
      APP: html
    }).then(htmlStr => {
     writeFile('dist/dom.html', htmlStr)
    }).catch(err => {
      console.error('template compiler error -->', err)
    })
    writeFile('dist/dom.css', style)
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
    // dom
    html += htmlBuilder.createNodeStart(n, level, i)
    // style
    style += styleBuilder.createNodeStyle(n, level, i)    
    if (n._children) {
      traverseDoms(n._children, level + 1)
    }
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
