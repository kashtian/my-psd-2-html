const template = require('lodash/template')
const fs = require('fs')

module.exports = class HtmlBuilder {
  tabUnit = '  '
  isMobile = false

  // 创建节点开始标签
  createNodeStart(n, level, i) {
    let str = ''
    let tag = this.getTag(level)
    let nodeClass = ''

    n._class = level > 0 ? n._parent._class + '_' + (i + 1) : tag + (i + 1)
    n._tab = level > 0 ? n._parent._tab + this.tabUnit : ''
    nodeClass = (n._prefixClass ? n._prefixClass + ' ' : '') + n._class
    if (level === 0) {
      str += `<!-- ${n._class} start -->\n`
    } else if (i === 0) {
      str += '\n'
    }
    str += n._tab + `<${tag} class="${nodeClass}" data="${n.name}">`
    if (n.type === 'textLayer') {
      str += n.textInfo.text.trim()
    }
    return str
  }

  // 创建节点结束标签
  createNodeEnd(n, level) {
    let str = '' 
    str += n._tab + `</${this.getTag(level)}>\n`
    if (level === 0) {
      str += `<!-- ${n._class} end -->\n`
    }
    return str
  }

  // 获取html 标签名
  getTag(level) {
    return level === 0 ? 'section' : 'div'
  }

  // 将html插入到模板中
  compilteTemplate(templateVars, options) {
    return fs.promises.readFile(this.getTemplatePath(options), {
      encoding: 'utf-8'
    }).then(fileContent => {
      let templateFunction = template(fileContent, {
        interpolate: /{{([\s\S]+?)}}/g
      })
      return templateFunction(templateVars)
    })
  }

  // 根据isMobile获取相应的模板path
  getTemplatePath(options) {
    if (options && options.template === 'vue') {
      return 'template/temp.vue'
    }
    return this.isMobile ? 'template/mobile.html' : 'template/pc.html'
  }

  setMobile(flag) {
    this.isMobile = flag
  }
}
