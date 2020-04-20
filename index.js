const axios = require('axios')
const fs = require('fs')
const LayerParser = require('./LayerParser.js')
var parser

function getPsdInfo() {
  return axios({
    url: 'https://alipic.lanhuapp.com/psc7f813107e3483bb-8a21-413a-9d44-7e03d81dcb10'
  }).then(res => {
    let psdInfo = res.data
    parser = new LayerParser()
    parser.initData(psdInfo)
    let doms = createDomTree(psdInfo.info)
    parser.setImageData(psdInfo.board)
    let domRes = getDomStr(doms)
    let domstr = domRes.str
    domstr = `<html><head>
      <link rel="stylesheet" type="text/css" href="../main.css" />
      <link rel="stylesheet" type="text/css" href="dom.css" />
      </head><body>\n` + domstr + '</body></html>'
    fs.promises.writeFile('dist/dom.html', domstr).then(() => {
      console.log('dom file success')
    }).catch(err => {
      console.error(err)
    })
    fs.promises.writeFile('dist/dom.css', domRes.style).then(() => {
      console.log('dom css success.')
    }).catch(err => {
      console.error('css error-->', err)
    })
  })
}
getPsdInfo()

// 生成dom string
function getDomStr(nodes, level = 0) {
  let str = ''
  let i = -1
  let n
  let tag = level === 0 ? 'section' : 'div'
  let p = level === 0 ? null : nodes[0]._parent
  let style = ''
  while(++i < nodes.length) {
    n = nodes[i]
    n._class = level > 0 ? p._class + '_' + (i + 1) : tag + (i + 1)
    n._tab = level > 0 ? p._tab + '  ' : ''
    rebuildChildren(n)
    // style
    style += getStyle(n, level, i)
    
    // dom
    if (level === 0) {
      str += `<!-- ${n._class} start -->\n`
    } else if (i === 0) {
      str += '\n'
    }
    str += n._tab + `<${tag} class="${(n._prefixClass ? n._prefixClass + ' ' : '') + n._class}" data="${n.name}">`
    if (n._children) {
      let res = getDomStr(n._children, level + 1)
      str += res.str + n._tab
      style += res.style
    }
    if (n.type === 'textLayer') {
      str += n.textInfo.text.trim()
    }
    str += `</${tag}>\n`
    if (level === 0) {
      str += `<!-- ${n._class} end -->\n`
    }
  }
  return {
    str,
    style
  }
}

// 根据布局需要，重新调整节点的children
function rebuildChildren(node) {
  let horizontal = isHorizontal(node)
  if (horizontal) {
    node._horizontal = true
    node._prefixClass = 'flex'
  } else {
    node._prefixClass = 'flow-root'
  }
}

// 水平布局(不好实现)
function horizontalLayout(node) {
  let i = 0
  node._class = 'flex ' + node._class
  while(++i < node.length) {
  }
}

// 垂直布局
function verticalLayout(node) {

}

function getStyle(n, level, index) {
  parser.setLayerInfo(n)
  let style = ''
  style += '.' + n._class + '{\n'
  style += parser.webPSCode()
  if (n.images) {
    style += `background-image: url(${n.images.orgUrl});\n`
  }
  if (level !== 0) {
    if (n._parent._horizontal) {
      let preNode = index === 0 ? n._parent : n._parent._children[index - 1]
      style += `margin-left: ${n.left - (preNode.left + (index === 0 ? 0 : preNode.width))}px;\n`
      style += `margin-top: ${n.top - n._parent.top}px;\n`
    } else {
      style += `margin-left: ${n.left - n._parent.left}px;\n`
      let preNode = index === 0 ? n._parent : n._parent._children[index - 1]
      style += `margin-top: ${n.top - (preNode.top + (index === 0 ? 0 : preNode.height))}px;\n`
    }
  }
  style += '}\n'
  return style
}

// 构造具有嵌套关系的dom tree
function createDomTree(arr) {
  let parents = []
  let i = 1
  let item
  while(++i < arr.length) {
    item = arr[i]
    retrieveParents(item, parents)
  }
  return parents
}

/**
 * 在parents里查找item的父元素，
 * 如果item是某个p的父元素，则删除p，加入item
 * @param {Object} item
 * @param {Array} parents 
 */
function retrieveParents(item, parents) {
  let i = 0
  let p
  let finded = false
  while(i < parents.length) {
    p = parents[i]
    if (!finded && isDescendants(item, p)) {
      finded = true
      i++
    } else if (isParent(p, item)) {
      addChild(item, p)
      parents.splice(i, 1)
    } else {
      i++
    }
  }
  if (!finded) {
    insertInArr(parents, item)
  }
}

function addChild(p, c) {
  if (!p._children) {
    p._children = [c]
  } else {
    insertInArr(p._children, c)
  }
  c._parent = p
}

// 根据left值插入到数组的正确位置
function insertInArr(arr, item) {
  let len = arr.length  
  if (!len || isALessB(arr[len - 1], item)) {
    return arr.push(item)
  }
  if (isALessB(item, arr[0])) {
    return arr.unshift(item)
  }
  for (let i = 1; i < len; i++) {
    if (isALessB(item, arr[i])) {
      arr.splice(i, 0, item)
      return
    }
  }
  arr.push(item)
}

// left 不同为水平方向，left相同为垂直方向判断top
function isALessB(a, b) {
  if (a.top !== b.top && (a.top >= (b.top + b.height) || (a.top + a.height) <= b.top) ) {
    // 垂直布局
    return a.top < b.top
  } else {
    return a.left < b.left
  }
}

// 判断item是否是parent的后代，并将item加入到父级元素的_children中
function isDescendants(item, parent) {
  if (parent && isParent(item, parent)) {
    if (parent._children) {
      for (let i = 0; i < parent._children.length; i++) {
        if (isDescendants(item, parent._children[i])) {
          return true
        }
      }
    }
    addChild(parent, item)
    return true
  }
}

// 判断item与parent是否是父子元素关系
function isParent(item, parent) {
  return item.left >= parent.left && (item.left + item.width) <= (parent.left + parent.width) // 水平方向范围
    && item.top < (parent.top + parent.height) && (item.top + item.height) > parent.top // 垂直方向有交集的才能是父子关系
}

// 根据children判断node是水平还是垂直布局
function isHorizontal(node) {
  let chlids = node._children
  if (!chlids || chlids.length < 2) {
    return false
  }
  let first = chlids[0]
  for (let i = 1; i < chlids.length; i++) {
    if (chlids[i].top >= first.top + first.height) {
      return false
    }
  }
  return true
}
