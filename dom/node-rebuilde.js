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

// 根据布局需要，重新调整节点的children
module.exports = function rebuildNode(node) {
  let horizontal = isHorizontal(node)
  if (horizontal) {
    node._horizontal = true
    node._prefixClass = 'flex'
  } else {
    node._prefixClass = 'flow-root'
  }
}
