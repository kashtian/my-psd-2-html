const template = require('lodash/template')
const fs = require('fs')

module.exports = class HtmlBuilder {
  tabUnit = '  '

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

  createNodeEnd(n, level) {
    let str = '' 
    str += `</${this.getTag(level)}>\n`
    if (level === 0) {
      str += `<!-- ${n._class} end -->\n`
    }
    return str
  }

  getTag(level) {
    return level === 0 ? 'section' : 'div'
  }

  // 将html插入到模板中
  compilteTemplate(templateVars) {
    return fs.promises.readFile('temp.html', {
      encoding: 'utf-8'
    }).then(fileContent => {
      let templateFunction = template(fileContent, {
        interpolate: /{{([\s\S]+?)}}/g
      })
      return templateFunction(templateVars)
    })
  }
}