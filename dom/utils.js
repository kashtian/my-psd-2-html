module.exports = {
  // 判断两个元素在垂直方向是否有交集, 相交不超过元素高度的1/3就算不相交
  isVerticalCross(a, b) {
    return !(a.top + a.height / 3 >= (b.top + b.height) || (a.top + a.height - a.height / 3) <= b.top)
  }
}
