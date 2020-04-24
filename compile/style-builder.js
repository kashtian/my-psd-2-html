module.exports = class StyleBuilder {
  unit = 'px'
  constructor(layerParser) {
    this.layerParser = layerParser
  }

  // 根据节点信息创建节点样式
  createNodeStyle(n, level, index) {
    let style = ''    
    this.layerParser.setLayerInfo(n)
    style += '.' + n._class + '{\n'
    style += this.layerParser.webPSCode()
    if (n.images) {
      style += `background-image: url(${n.images.orgUrl});\n`
      style += `background-repeat: no-repeat;\n`
      style += `background-size: 100%;\n`
    }
    if (level !== 0) {
      if (n._parent._horizontal) {
        let preNode = index === 0 ? n._parent : n._parent._children[index - 1]
        style += `margin-left: ${n.left - (preNode.left + (index === 0 ? 0 : preNode.width))}${this.unit};\n`
        style += `margin-top: ${n.top - n._parent.top}${this.unit};\n`
      } else {
        style += `margin-left: ${n.left - n._parent.left}${this.unit};\n`
        let preNode = index === 0 ? n._parent : n._parent._children[index - 1]
        style += `margin-top: ${n.top - (preNode.top + (index === 0 ? 0 : preNode.height))}${this.unit};\n`
      }
    }
    style += '}\n'
    return style
  }
}
