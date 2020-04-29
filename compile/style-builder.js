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
    let marginLeft = 0
    let marginTop = 0
    if (level !== 0) {
      if (n._parent._horizontal) {
        marginLeft = n.left - (index === 0 ? n._parent.left : (nodes[index - 1].left + nodes[index - 1].width))
        marginTop = n.top - n._parent.top
      } else {
        marginLeft = n.left - n._parent.left
        marginTop = n.top - (index === 0 ? n._parent.top : (nodes[index - 1].top + nodes[index - 1].height))
      }
    } else {
      marginLeft = n.left
      marginTop = n.top - (index === 0 ? 0 : (nodes[index - 1].top + nodes[index - 1].height))
    }
    if (marginLeft) {
      style += `margin-left: ${this.getModel(marginLeft)};\n`
    }
    if (marginTop) {
      style += `margin-top: ${this.getModel(marginTop)};\n`
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
