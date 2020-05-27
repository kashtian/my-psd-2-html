module.exports = class StyleBuilder {
  isMobile = false
  mobileFontSize = 0
  tabUnit = '  '

  constructor(layerParser) {
    this.layerParser = layerParser
  }

  // 根据节点信息创建节点样式
  createNodeStyle(n, level, index, nodes) {
    let style = this.tabUnit
    let o = {}
    // 给图层解析器设置要解析的当前图层
    this.layerParser.setLayerInfo(n)
    style += '.' + n._class + ' {\n'
    // 图层解析器生成样式代码
    style += this.layerParser.webPSCode(this.isMobile, this.tabUnit + this.tabUnit)
    if (n.images) {
      o['background-image'] = `url(${n.images.orgUrl})`
      o['background-repeat'] = 'no-repeat'
      o['background-size'] = `100%`
    }

    if (n.type === 'textLayer' && n._parent && !n._parent._horizontal ) {
      this.handleTextChild(n, level, index, nodes, o)
    } else {
      this.calcMargin(n, level, index, nodes, o)
      this.calcPadding(n, o)
    }
    
    for (var Y in o) o[Y] && (style += (this.tabUnit + this.tabUnit).concat(Y, ': ').concat(o[Y], ';\n'))
    style += this.tabUnit + '}\n'
    return style
  }

  // 处理子元素是文本的情况
  handleTextChild(n, level, index, nodes, o) {
    let parent = n._parent
    let hdiff = Math.abs((parent.width - n.width) / 2 - (n.left - parent.left))
    let vdiff = Math.abs((parent.height - n.height) / 2 - (n.top - parent.top))
    if (hdiff < 5) {
      o['text-align'] = 'center'
    } else {
      let marginLeft = this.getMarginLeft(n, level, index, nodes)
      marginLeft && (o['margin-left'] = `${this.getModel(marginLeft)}`)
    }
    if (vdiff < 5) {
      o['line-height'] = this.getModel(parent.height)
    } else {
      let marginTop = this.getMarginTop(n, level, index, nodes)
      marginTop && (o['margin-top'] = `${this.getModel(marginTop)}`)
      o['line-height'] = this.getModel(n.height)
    }
  }

  // 计算元素的marginLeft
  getMarginLeft(n, level, index, nodes) {
    let marginLeft = 0
    if (level !== 0) {      
      if (n._parent._horizontal) {
        if (index !== 0) {
          marginLeft = n.left - (nodes[index - 1].left + nodes[index - 1].width)
        }
      } else {
        marginLeft = n.left - n._parent.left
      }
    } else {
      marginLeft = n.left
    }
    return marginLeft
  }

  // 计算元素的marginTop
  getMarginTop(n, level, index, nodes) {
    let marginTop = 0
    if (level !== 0) {
      if (!n._parent._horizontal) {
        marginTop = n.top - (index === 0 ? n._parent.top : (nodes[index - 1].top + nodes[index - 1].height))
      }
    } else {
      marginTop = n.top - (index === 0 ? 0 : (nodes[index - 1].top + nodes[index - 1].height))
    }
    return marginTop
  }

  // 计算元素的margin属性
  calcMargin(n, level, index, nodes, o) {
    let marginLeft = this.getMarginLeft(n, level, index, nodes)
    let marginTop = this.getMarginTop(n, level, index, nodes)
    if (marginLeft) {
      o['margin-left'] = `${this.getModel(marginLeft)}`
    }
    if (marginTop) {
      o['margin-top'] = `${this.getModel(marginTop)}`
    }
  }

  // 计算元素的padding
  calcPadding(n, o) {
    if (n._horizontal && n._children && n._children.length > 1) {
      let first = n._children[0]
      let last = n._children[n._children.length - 1]
      let paddingLeft = first.left - n.left
      let paddingRight = n.width - (last.left - n.left + last.width)
      if (paddingLeft) {
        o['padding-left'] = `${this.getModel(paddingLeft)}`
      }
      if (paddingRight) {
        o['padding-right'] = `${this.getModel(paddingRight)}`
      }
    }
  }

  // 根据isMobile获取对应的数值
  getModel(v) {
    return (this.isMobile ? Math.round(v / this.mobileFontSize * 100) / 100 + 'rem' : v + 'px')
  }

  setMobileFontSize(fontSize) {
    this.mobileFontSize = fontSize
  }

  setMobile(flag) {
    this.isMobile = flag
  }
}
