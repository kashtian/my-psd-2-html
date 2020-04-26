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
  while(++i < nodes.length - 1) {
    if (nodes[i].top === nodes[i + 1].top) {
      if (!harr.length) {
        harr.push(i)
        harr.push(nodes[i])
      }
      harr.push(nodes[i+1]) 
    } else if (harr.length > 0) {
      map.set(harr[0], harr.slice(1))
      harr = []
    }
  }
  // 处理map里的水平元素
  addFlexParent(map, nodes)
}

// 给垂直布局里的水平元素添加flex父元素
function addFlexParent(map, nodes) {
  for (let [index, arr] of map) {
    let last = arr[arr.length - 1]
    let parent = {
      visible: true,
      type: 'layerSection',
      width: last.left + last.width - arr[0].left,
      height: arr[0].height,
      left: arr[0].left,
      top: arr[0].top,
      _extra: true,
      _horizontal: true,
      _prefixClass: 'flex',
      name: 'flex_extra',
      _children: arr
    }
    for (let j = 0; j < arr.length; j++) {
      arr[j]._parent = parent
    }
    nodes.splice(index, arr.length, parent)
  }
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
  } else {
    node._prefixClass = 'flow-root'
  }
}

// 重新构造nodes关系
function rebuildNodes(nodes, level) {
  if (level === 0) {
    flexWrapper(nodes)
  }
}

module.exports = {
  rebuildNode,
  rebuildNodes
}
