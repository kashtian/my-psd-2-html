const utils = require('./utils.js')

// 根据children判断node是水平还是垂直布局
function isHorizontal(node) {
  let childs = node._children
  if (!childs || childs.length < 2) {
    return false
  }
  let first = childs[0]
  for (let i = 1; i < childs.length; i++) {
    if (childs[i].top >= first.top + first.height) {
      return false
    }
  }
  return true
}

// 垂直布局里的水平元素增加一层父元素
function flexWrapper(nodes) {
  let i = -1
  let harr = []
  let map = new Map()
  let node
  let nextNode
  while(++i < nodes.length) {
    node = nodes[i]
    nextNode = nodes[i + 1] || {top: 0, height: 0}
    // 小于3个像素是为了避免设计稿误差
    if (node.top === nextNode.top || Math.abs(Math.floor(node.top + node.height / 2 - (nextNode.top + nextNode.height / 2))) < 3) {
      if (!harr.length) {
        harr.push(i)
        harr.push(node)
      }
      harr.push(nextNode) 
    } else if (harr.length > 0) {
      map.set(harr[0], harr.slice(1))
      harr = []
    }
  }
  // 处理map里的水平元素
  addFlexParent(map, nodes)
  map = null
}

// 将flex布局里的垂直元素用一个父元素包起来
function addSubWrapper(nodes) {
  let i = nodes.length - 1
  let arr = [nodes[i]]
  let indexes = [i]
  while (--i) {
    if (!utils.isVerticalCross(arr[0], nodes[i])) {
      indexes.push(i)
      arr.push(nodes[i])
    }
  }
  if (arr.length > 1) {
    let last = nodes[indexes[indexes.length - 1]]
    let parent = createLayer({
      left: last.left,
      top: last.top,
      name: 'v-wrapper',
      _prefixClass: 'flex-1',
      _children: arr,
      _parent: last._parent
    })
    for (let j = 0; j < indexes.length; j++) {
      arr[j]._parent = parent
      if (j === indexes.length - 1) {
        nodes.splice(indexes[j], 1, parent)
      } else {
        nodes.splice(indexes[j], 1)
      }
    }
    arr.reverse()
  }
}

// 给垂直布局里的水平元素添加flex父元素
function addFlexParent(map, nodes) {
  if (!map.size) {
    return
  }
  let count = 0
  for (let [index, arr] of map) {
    let last = arr[arr.length - 1]
    let parent = createLayer({
      width: last.left + last.width - arr[0].left,
      height: arr[0].height,
      left: arr[0].left,
      top: arr[0].top,
      _horizontal: true,
      _prefixClass: 'flex',
      name: 'flex_extra',
      _children: arr,
      _parent: arr[0]._parent
    })
    for (let j = 0; j < arr.length; j++) {
      arr[j]._parent = parent
    }
    nodes.splice(index - count, arr.length, parent)
    count += arr.length - 1
  }
}

// 构造蓝湖layer
function createLayer(options) {
  return Object.assign({
    visible: true,
    type: 'layerSection',
    _extra: true
  }, options)
}

// 根据布局需要，重新调整节点的children
function rebuildNode(node) {
  if (node._extra) {
    return
  }
  let horizontal = isHorizontal(node)
  if (horizontal) {
    node._horizontal = true
    node._prefixClass = 'flex'
  } else if (node._children && node.top !== node._children[0].top) {
    node._prefixClass = 'flow-root'
  }
}

// 重新构造nodes关系
function rebuildNodes(nodes, level) {
  if (level === 0 || (nodes.length > 2 && !nodes[0]._parent._horizontal)) {
    flexWrapper(nodes)
  } else if (nodes[0]._parent && nodes[0]._parent._horizontal) {
    addSubWrapper(nodes)
  }
}

module.exports = {
  rebuildNode,
  rebuildNodes
}
