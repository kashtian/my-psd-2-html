// left 不同为水平方向，left相同为垂直方向判断top
function isALessB(a, b) {
  if (a.top !== b.top && !isVerticalCross(a, b) ) {
    // 垂直布局
    return a.top < b.top
  } else {
    return a.left < b.left
  }
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

function addChild(p, c) {
  if (!p._children) {
    p._children = [c]
  } else {
    insertInArr(p._children, c)
  }
  c._parent = p
}

// 判断两个元素在垂直方向是否有交集,+2是因为设计有误差，让元素相交了
function isVerticalCross(a, b) {
  return !(a.top + 2 >= (b.top + b.height) || (a.top + a.height) <= b.top + 2)
}

// 判断item与parent是否是父子元素关系
function isParent(item, parent) {
  return item.left >= parent.left && (item.left + item.width) <= (parent.left + parent.width) // 水平方向范围
    && isVerticalCross(item, parent) // 垂直方向有交集的才能是父子关系
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

// 判断一个layer是否有任何有效信息
function validLayer(layer) {
  let types = ['textLayer', 'shapeLayer']
  if (types.includes(layer.type)) {
    return true
  }
  let options = ['layerEffects', 'fill', 'strokeStyle', 'blendOptions', 'path']
  let i = -1
  while(++i < options.length) {
    if (layer.hasOwnProperty(options[i])) {
      return true
    }
  }
  return false
}

// 构造具有嵌套关系的dom tree
function createDomTree(arr) {
  let parents = []
  let i = validLayer(arr[1]) ? 0 : 1
  let item
  while(++i < arr.length) {
    item = arr[i]
    retrieveParents(item, parents)
  }
  return parents
}

module.exports = {
  createDomTree
}
