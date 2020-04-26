module.exports = class StyleBuilder {
  isMobile = false
  mobileFontSize = 0

  constructor(layerParser) {
    this.layerParser = layerParser
  }

  // 根据节点信息创建节点样式
  createNodeStyle(n, level, index, nodes) {
    let style = ''
    // 给图层解析器设置要解析的当前图层
    this.layerParser.setLayerInfo(n)
    style += '.' + n._class + '{\n'
    // 图层解析器生成样式代码
    style += this.layerParser.webPSCode(this.isMobile)
    if (n.images) {
      style += `background-image: url(${n.images.orgUrl});\n`
      style += `background-repeat: no-repeat;\n`
      style += `background-size: 100%;\n`
    }
    if (level !== 0) {
      if (n._parent._horizontal) {
        let preNode = index === 0 ? n._parent : n._parent._children[index - 1]
        style += `margin-left: ${this.getModel(n.left - (preNode.left + (index === 0 ? 0 : preNode.width)))};\n`
        style += `margin-top: ${this.getModel(n.top - n._parent.top)};\n`
      } else {
        style += `margin-left: ${this.getModel(n.left - n._parent.left)};\n`
        let preNode = index === 0 ? n._parent : n._parent._children[index - 1]
        style += `margin-top: ${this.getModel(n.top - (preNode.top + (index === 0 ? 0 : preNode.height)))};\n`
      }
    } else {
      style += `margin-left: ${this.getModel(n.left)};\n`
      style += `margin-top: ${this.getModel(n.top - (index === 0 ? 0 : (nodes[index - 1].top + nodes[index - 1].height)))}`
    }
    style += '}\n'
    return style
  }

  // 根据isMobile获取对应的数值
  getModel(v) {
    return (this.isMobile ? Math.floor(v / this.mobileFontSize * 1000) / 1000 + 'rem' : v + 'px')
  }

  setMobileFontSize(fontSize) {
    this.mobileFontSize = fontSize
  }

  setMobile(flag) {
    this.isMobile = flag
  }
}
