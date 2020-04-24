const {
  fontWeightList,
  psLayerEffectsDefault
} = require('./layer-config')

module.exports = class LayerParser {
  codeString = ''
  resolu = 2
  decimal = true
  resoluscale = 1
  layerinfo = {} // 接口里info数组里的单个对象
  imageData = {} // 接口获取的board里的宽高属性
  fontWeightList = fontWeightList
  psLayerEffectsDefault = psLayerEffectsDefault
  mobileFontSize = 0 // mobile设置的基础html fontsize

  // 设置imageData
  setImageData(data) {
    this.imageData = data
  }

  // 设置layerinfo
  setLayerInfo(info) {
    this.layerinfo = info
  }

  // 设置mobile fontsize
  setMobileFontSize(fontSize) {
    this.mobileFontSize = fontSize
  }

  // 将layers数据解析为web style code
  webPSCode(t) {
    var e = this;
    this.codeString = '';
    var n = t ? 'rem' : 'px';
    // 5 == this.resolu && (n = this.$parent.$refs.devicedom.customUnit);
    var i = {
      width: 5 != this.resolu ? this.getModel(this.layerinfo.width, t) + n : ''.concat(Math.round(this.layerinfo.width / this.imageData.width * this.resoluscale)).concat(n),
      height: 5 != this.resolu ? this.getModel(this.layerinfo.height, t) + n : ''.concat(Math.round(this.layerinfo.height / this.imageData.height * (this.resoluscale / (this.imageData.width / this.imageData.height)))).concat(n)
    };
    if (5 == this.resolu && this.layerinfo.height == this.imageData.height && (i.height = Math.round(this.resoluscale / (this.imageData.width / this.imageData.height)) + n), 5 == this.resolu && this.layerinfo.width == this.imageData.width && (i.width = this.resoluscale + n), 'textLayer' == this.layerinfo.type) if (i['font-size'] = 5 != this.resolu ? this.getModel(this.layerinfo.textInfo.size, t) + n : ''.concat(Math.round(this.layerinfo.textInfo.size / this.imageData.width * this.resoluscale)).concat(n), i['font-family'] = this.layerinfo.textInfo.fontName, this.layerinfo.xdType) {
      if (this.layerinfo.xdStyles.textStyles.fontStyle) if ('Condensed Bold' == this.layerinfo.xdStyles.textStyles.fontStyle) i['font-weight'] = 'bold';
      else if ('Condensed Black' == this.layerinfo.xdStyles.textStyles.fontStyle) i['font-weight'] = 'bolder';
      else {
        var o = this.layerinfo.xdStyles.textStyles.fontStyle.indexOf(' ') > - 1 ? this.layerinfo.xdStyles.textStyles.fontStyle.substring(0, this.layerinfo.xdStyles.textStyles.fontStyle.indexOf(' ')) : this.layerinfo.xdStyles.textStyles.fontStyle;
        i['font-weight'] = this.getFontWeight(o)
      }
      i['line-height'] = 5 != this.resolu ? ''.concat(this.getModel(this.layerinfo.xdStyles.textStyles.lineSpacing, t)).concat(n) : ''.concat(Math.round(this.layerinfo.xdStyles.textStyles.lineSpacing / this.imageData.width * this.resoluscale)).concat(n),
        this.layerinfo.xdStyles.fill && this.layerinfo.xdStyles.fill.enabled && (i.color = 'rgba('.concat(this.xdColorToRGBA(this.layerinfo.xdStyles.fill.color).r, ',').concat(this.xdColorToRGBA(this.layerinfo.xdStyles.fill.color).g, ',').concat(this.xdColorToRGBA(this.layerinfo.xdStyles.fill.color).b, ',').concat(this.xdColorToRGBA(this.layerinfo.xdStyles.fill.color).a / 255 < 1 ? (this.xdColorToRGBA(this.layerinfo.xdStyles.fill.color).a / 255).toFixed(2) : this.xdColorToRGBA(this.layerinfo.xdStyles.fill.color).a / 255, ')')),
        this.layerinfo.xdStyles.shadow && this.layerinfo.xdStyles.shadow.enabled && (5 != this.resolu ? i['text-shadow'] = ''.concat(this.layerinfo.xdStyles.shadow.offset[0], 'px ').concat(this.layerinfo.xdStyles.shadow.offset[1], 'px ').concat(this.layerinfo.xdStyles.shadow.blur, 'px ') : i['text-shadow'] = ''.concat(Math.round(this.layerinfo.xdStyles.shadow.offset[0] / this.imageData.width * this.resoluscale), 'px ').concat(Math.round(this.layerinfo.xdStyles.shadow.offset[1] / this.imageData.width * this.resoluscale), 'px ').concat(Math.round(this.layerinfo.xdStyles.shadow.blur / this.imageData.width * this.resoluscale), 'px '), i['text-shadow'] += 'rgba('.concat(this.xdColorToRGBA(this.layerinfo.xdStyles.shadow.color).r, ',').concat(this.xdColorToRGBA(this.layerinfo.xdStyles.shadow.color).g, ',').concat(this.xdColorToRGBA(this.layerinfo.xdStyles.shadow.color).b, ',').concat(this.xdColorToRGBA(this.layerinfo.xdStyles.shadow.color).a / 255 < 1 ? (this.xdColorToRGBA(this.layerinfo.xdStyles.shadow.color).a / 255).toFixed(2) : this.xdColorToRGBA(this.layerinfo.xdStyles.shadow.color).a / 255, ')')),
        this.layerinfo.xdStyles.stroke && this.layerinfo.xdStyles.stroke.enabled && (i['-webkit-text-stroke'] = 5 != this.resolu ? ''.concat(this.layerinfo.xdStyles.stroke.weight, ' ') : ''.concat(Math.round(this.layerinfo.xdStyles.stroke.weight / this.imageData.width * this.resoluscale), ' '), i['-webkit-text-stroke'] += 'rgba('.concat(this.xdColorToRGBA(this.layerinfo.xdStyles.stroke.color).r, ',').concat(this.xdColorToRGBA(this.layerinfo.xdStyles.stroke.color).g, ',').concat(this.xdColorToRGBA(this.layerinfo.xdStyles.stroke.color).b, ',').concat(this.xdColorToRGBA(this.layerinfo.xdStyles.stroke.color).a / 255 < 1 ? (this.xdColorToRGBA(this.layerinfo.xdStyles.stroke.color).a / 255).toFixed(2) : this.xdColorToRGBA(this.layerinfo.xdStyles.stroke.color).a / 255, ')'), i['text-stroke'] = 5 != this.resolu ? ''.concat(this.layerinfo.xdStyles.stroke.weight, ' ') : ''.concat(Math.round(this.layerinfo.xdStyles.stroke.weight / this.imageData.width * this.resoluscale), ' '), i['text-stroke'] += 'rgba('.concat(this.xdColorToRGBA(this.layerinfo.xdStyles.stroke.color).r, ',').concat(this.xdColorToRGBA(this.layerinfo.xdStyles.stroke.color).g, ',').concat(this.xdColorToRGBA(this.layerinfo.xdStyles.stroke.color).b, ',').concat(this.xdColorToRGBA(this.layerinfo.xdStyles.stroke.color).a / 255 < 1 ? (this.xdColorToRGBA(this.layerinfo.xdStyles.stroke.color).a / 255).toFixed(2) : this.xdColorToRGBA(this.layerinfo.xdStyles.stroke.color).a / 255, ')')),
        this.layerinfo.xdStyles.textStyles && this.layerinfo.xdStyles.textStyles.underline && (i['text-decoration'] = 'underline'),
        this.layerinfo.xdStyles.textStyles && this.layerinfo.xdStyles.textStyles.charSpacing > 0 && (i['letter-spacing'] = 5 != this.resolu ? ''.concat(this.layerinfo.xdStyles.textStyles.charSpacing, 'px') : ''.concat(Math.round(this.layerinfo.xdStyles.textStyles.charSpacing / this.imageData.width * this.resoluscale), 'px')),
        this.layerinfo.opacity && (i.opacity = ''.concat(Math.round(100 * this.layerinfo.opacity) / 100))
    } else {
      if (this.layerinfo.textInfo.bold ? i['font-weight'] = 'bold' : !this.layerinfo.textInfo.bold && this.layerinfo.textInfo.fontStyleName && (this.layerinfo.textInfo.fontStyleName.indexOf('-') > - 1 ? i['font-weight'] = this.getFontWeight(this.layerinfo.textInfo.fontStyleName.substring(this.layerinfo.textInfo.fontStyleName.lastIndexOf('-') + 1)) : i['font-weight'] = this.getFontWeight(this.layerinfo.textInfo.fontStyleName)), this.layerinfo.textInfo.italic && (i['font-style'] = 'italic'), this.layerinfo.textInfo.underline && (i['text-decoration'] = 'underline'), this.layerinfo.textInfo.textStyleRange) for (var r = 0; r < this.layerinfo.textInfo.textStyleRange.length; r++) if (this.layerinfo.textInfo.textStyleRange[r].textStyle && this.layerinfo.textInfo.textStyleRange[r].textStyle.strikethrough && 'xHeightStrikethroughOn' == this.layerinfo.textInfo.textStyleRange[r].textStyle.strikethrough) {
        i['text-decoration'] ? i['text-decoration'] += ' line-through' : i['text-decoration'] = 'line-through';
        break
      }
      if (this.layerinfo.blendOptions && this.layerinfo.blendOptions.fillOpacity ? i.color = 'rgba('.concat(Math.round(this.layerinfo.textInfo.color.r), ',').concat(Math.round(this.layerinfo.textInfo.color.g), ',').concat(Math.round(this.layerinfo.textInfo.color.b), ',').concat(Math.round(this.layerinfo.blendOptions.fillOpacity.value) / 100, ')') : i.color = this.layerinfo.textInfo.color.value, this.layerinfo && this.layerinfo.textInfo && this.layerinfo.textInfo.hasOwnProperty('leading') && null != this.layerinfo.textInfo.leading && (i['line-height'] = 5 != this.resolu ? ''.concat(this.getModel(this.layerinfo.textInfo.leading, t)).concat(n) : ''.concat(Math.round(this.layerinfo.textInfo.leading / this.imageData.width * this.resoluscale)).concat(n)), this.layerinfo.blendOptions && this.layerinfo.blendOptions.opacity && this.layerinfo.blendOptions.opacity.value < 100 && (i.opacity = ''.concat(this.layerinfo.blendOptions.opacity.value / 100)), this.layerinfo.layerEffects && (!this.layerinfo.layerEffects.hasOwnProperty('masterFXSwitch') || this.layerinfo.layerEffects.hasOwnProperty('masterFXSwitch') && this.layerinfo.layerEffects.masterFXSwitch)) {
        if (this.layerinfo.layerEffects.solidFill || this.layerinfo.layerEffects.solidFillMulti) if (this.layerinfo.layerEffects.solidFill && this.layerinfo.layerEffects.solidFill.enabled) i.color = ''.concat(this.layerinfo.layerEffects.solidFill.color.value);
        else if (this.layerinfo.layerEffects.solidFillMulti) {
          for (var a = {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            count: 0
          }, s = 0; s < this.layerinfo.layerEffects.solidFillMulti.length; s++) this.layerinfo.layerEffects.solidFillMulti[s].enabled && (this.layerinfo.layerEffects.solidFillMulti[s].color && this.layerinfo.layerEffects.solidFillMulti[s].color.red ? (a.r = a.r + Math.round(this.layerinfo.layerEffects.solidFillMulti[s].color.red), a.g = a.g + Math.round(this.layerinfo.layerEffects.solidFillMulti[s].color.green), a.b = a.b + Math.round(this.layerinfo.layerEffects.solidFillMulti[s].color.blue)) : (a.r = a.r + this.psLayerEffectsDefault.solidFill.color.red, a.g = a.g + this.psLayerEffectsDefault.solidFill.color.green, a.b = a.b + this.psLayerEffectsDefault.solidFill.color.blue), a.a = a.a + (this.layerinfo.layerEffects.solidFillMulti[s].opacity ? Math.round(this.layerinfo.layerEffects.solidFillMulti[s].opacity.value) : 100), a.count = a.count + 1);
          i.color = 'rgba('.concat(Math.round(a.r / a.count), ', ').concat(Math.round(a.g / a.count), ', ').concat(Math.round(a.b / a.count), ', ').concat(a.a / a.count / 100, ')')
        }
        if (this.layerinfo.layerEffects.dropShadow || this.layerinfo.layerEffects.dropShadowMulti) {
          var c = [
          ];
          if (this.layerinfo.layerEffects.dropShadowMulti) for (var l = 0; l < this.layerinfo.layerEffects.dropShadowMulti.length; l++) c.push(this.layerinfo.layerEffects.dropShadowMulti[l]);
          this.layerinfo.layerEffects.dropShadow && c.push(this.layerinfo.layerEffects.dropShadow);
          for (var u = 0; u < c.length; u++) if (c[u].enabled) {
            var d = c[u].hasOwnProperty('chokeMatte') ? c[u].chokeMatte : this.psLayerEffectsDefault.dropShadow.chokeMatte,
              g = void 0;
            g = c[u].hasOwnProperty('useGlobalAngle') && !c[u].useGlobalAngle ? c[u].localLightingAngle ? 180 - c[u].localLightingAngle.value : 90 : this.layerinfo.globalLight && this.layerinfo.globalLight.hasOwnProperty('angle') ? 180 - this.layerinfo.globalLight.angle : 90;
            var p = void 0,
              h = void 0;
            5 == this.resolu ? (p = c[u].hasOwnProperty('distance') ? c[u].distance / this.imageData.width * this.resoluscale : this.psLayerEffectsDefault.dropShadow.distance / this.imageData.width * this.resoluscale, h = c[u].hasOwnProperty('blur') ? c[u].blur / this.imageData.width * this.resoluscale : this.psLayerEffectsDefault.dropShadow.blur / this.imageData.width * this.resoluscale) : (p = c[u].hasOwnProperty('distance') ? this.getModel(c[u].distance, t) : this.getModel(this.psLayerEffectsDefault.dropShadow.distance, t), h = c[u].hasOwnProperty('blur') ? this.getModel(c[u].blur, t) : this.getModel(this.psLayerEffectsDefault.dropShadow.blur, t)),
              0 == u ? i['text-shadow'] = ''.concat(Math.round(Math.cos(2 * Math.PI / 360 * g) * p)).concat(n, ' ') : i['text-shadow'] ? i['text-shadow'] += ', '.concat(Math.round(Math.cos(2 * Math.PI / 360 * g) * p)).concat(n, ' ') : i['text-shadow'] = ''.concat(Math.round(Math.cos(2 * Math.PI / 360 * g) * p)).concat(n, ' '),
              i['text-shadow'] += ''.concat(Math.round(Math.sin(2 * Math.PI / 360 * g) * p)).concat(n, ' '),
              i['text-shadow'] += ''.concat(Math.round(h - h * (d / 100))).concat(n, ' '),
              c[u].opacity && c[u].color.hasOwnProperty('red') ? i['text-shadow'] += c[u].color.value : c[u].opacity && !c[u].color.hasOwnProperty('red') ? i['text-shadow'] += 'rgba('.concat(this.psLayerEffectsDefault.dropShadow.color.red, ', ').concat(this.psLayerEffectsDefault.dropShadow.color.green, ', ').concat(this.psLayerEffectsDefault.dropShadow.color.blue, ', ').concat(c[u].opacity.value / 100, ')') : !c[u].hasOwnProperty('opacity') && c[u].color.hasOwnProperty('red') ? i['text-shadow'] += 'rgba('.concat(Math.round(c[u].color.red), ', ').concat(Math.round(c[u].color.blue), ', ').concat(Math.round(c[u].color.green), ', ').concat(this.psLayerEffectsDefault.dropShadow.opacity.value / 100, ')') : i['text-shadow'] += 'rgba('.concat(this.psLayerEffectsDefault.dropShadow.color.red, ', ').concat(this.psLayerEffectsDefault.dropShadow.color.green, ', ').concat(this.psLayerEffectsDefault.dropShadow.color.blue, ', ').concat(this.psLayerEffectsDefault.dropShadow.opacity.value / 100, ')')
          }
        }
        if (this.layerinfo.layerEffects.frameFX || this.layerinfo.layerEffects.frameFXMulti) {
          var f = [
          ];
          this.layerinfo.layerEffects.frameFXMulti ? f = this.layerinfo.layerEffects.frameFXMulti : this.layerinfo.layerEffects.frameFX && f.push(this.layerinfo.layerEffects.frameFX);
          for (var m = f.length - 1; m >= 0; m--) if (f[m].enabled) {
            5 != this.resolu ? (i['-webkit-text-stroke'] = ''.concat(f[m].size ? this.getModel(f[m].size, t) : this.getModel(this.psLayerEffectsDefault.frameFX.size, t), 'px ').concat(f[m].color.value), i['text-stroke'] = ''.concat(f[m].size ? this.getModel(f[m].size, t) : this.getModel(this.psLayerEffectsDefault.frameFX.size, t), 'px ').concat(f[m].color.value)) : (i['-webkit-text-stroke'] = ''.concat(f[m].size ? Math.round(f[m].size / this.imageData.width * this.resoluscale) : Math.round(this.psLayerEffectsDefault.frameFX.size / this.imageData.width * this.resoluscale), 'px ').concat(f[m].color.value), i['text-stroke'] = ''.concat(f[m].size ? Math.round(f[m].size / this.imageData.width * this.resoluscale) : Math.round(this.psLayerEffectsDefault.frameFX.size / this.imageData.width * this.resoluscale), 'px ').concat(f[m].color.value));
            break
          }
        }
        if (this.layerinfo.layerEffects.gradientFillMulti || this.layerinfo.layerEffects.gradientFill) {
          var I = [
          ];
          this.layerinfo.layerEffects.gradientFillMulti ? I = this.layerinfo.layerEffects.gradientFillMulti : this.layerinfo.layerEffects.gradientFill && I.push(this.layerinfo.layerEffects.gradientFill);
          for (var w = 0; w < I.length; w++) if (I[w].enabled) {
            var v = I[w].type && 'radial' == I[w].type ? 'radial-gradient(' : 'linear-gradient(',
              M = '',
              b = I[w].angle && I[w].angle.value ? 90 - I[w].angle.value : 0;
            I[w].opacity && I[w].opacity.value ? I[w].opacity : null;
            for (var y = 0; y < I[w].gradient.colors.length; y++) M && (M += ', '),
              I[w].type && I[w].type,
              M += I[w].gradient.colors[y].color.value,
              M += ' '.concat(I[w].gradient.colors[y].location / 4096 * 100, '%');
            I[w].type && 'radial' == I[w].type ? i['\nbackground'] = ''.concat(v).concat(M, ')') : i['\nbackground'] = ''.concat(v).concat(b, 'deg,').concat(M, ')'),
              i['-webkit-background-clip'] = 'text',
              i['-webkit-text-fill-color'] = 'transparent';
            break
          }
        }
      }
    }
    if ('shapeLayer' == this.layerinfo.type || 'layerSection' == this.layerinfo.type || 'layer' == this.layerinfo.type) {
      if (this.layerinfo.fill && this.layerinfo.fill.color && (!this.layerinfo.strokeStyle || this.layerinfo.strokeStyle && this.layerinfo.strokeStyle.fillEnabled) && (this.layerinfo.blendOptions ? i.background = this.layerinfo.blendOptions.fillOpacity ? 'rgba('.concat(Math.round(this.layerinfo.fill.color.red), ',').concat(Math.round(this.layerinfo.fill.color.green), ',').concat(Math.round(this.layerinfo.fill.color.blue), ',').concat(Math.round(this.layerinfo.blendOptions.fillOpacity.value) / 100, ')') : this.layerinfo.fill.color.value : i.background = this.layerinfo.fill.color.value), this.layerinfo.strokeStyle && this.layerinfo.strokeStyle.strokeEnabled) if (this.layerinfo.strokeStyle.strokeStyleContent && !this.layerinfo.strokeStyle.strokeStyleContent.type) i.border = ''.concat(5 != this.resolu ? this.getModel(this.layerinfo.strokeStyle.strokeStyleLineWidth.value || this.layerinfo.strokeStyle.strokeStyleLineWidth) : Math.round(this.layerinfo.strokeStyle.strokeStyleLineWidth / this.imageData.width * this.resoluscale), 'px solid rgba(').concat(Math.round(this.layerinfo.strokeStyle.strokeStyleContent.color.red), ',').concat(Math.round(this.layerinfo.strokeStyle.strokeStyleContent.color.green), ',').concat(Math.round(this.layerinfo.strokeStyle.strokeStyleContent.color.blue), ',').concat(this.layerinfo.xdType ? this.layerinfo.strokeStyle.opacity.value / 100 : this.layerinfo.strokeStyle.strokeStyleOpacity.value / 100, ')');
      else if (this.layerinfo.strokeStyle.strokeStyleContent && 'linear' == this.layerinfo.strokeStyle.strokeStyleContent.type) {
        i.border = ''.concat(5 != this.resolu ? this.getModel(this.layerinfo.strokeStyle.strokeStyleLineWidth) : Math.round(this.layerinfo.strokeStyle.strokeStyleLineWidth / this.imageData.width * this.resoluscale), 'px solid');
        var x = '';
        if (this.layerinfo.strokeStyle.strokeStyleContent.gradient.colors && this.layerinfo.strokeStyle.strokeStyleContent.gradient.colors.length) for (var A = 0; A < this.layerinfo.strokeStyle.strokeStyleContent.gradient.colors.length; A++) x += x ? ', '.concat(this.layerinfo.strokeStyle.strokeStyleContent.gradient.colors[A].color.value) : ''.concat(this.layerinfo.strokeStyle.strokeStyleContent.gradient.colors[A].color.value);
        i['border-image'] = 'linear-gradient('.concat(this.layerinfo.strokeStyle.strokeStyleContent.angle && this.layerinfo.strokeStyle.strokeStyleContent.angle.value ? 90 - this.layerinfo.strokeStyle.strokeStyleContent.angle.value : 0, 'deg, ').concat(x, ') 10 10')
      }
      if (this.layerinfo.xdType) {
        if (this.layerinfo.xdStyles.fill && this.layerinfo.xdStyles.fill.colorStops) {
          for (var C = this.layerinfo.xdStyles.fill.type.indexOf('linear') < 0 ? 'radial-gradient(' : 'linear-gradient(', D = '', N = 0; N < this.layerinfo.xdStyles.fill.colorStops.length; N++) D += ''.concat(this.xdColorToRGBA(this.layerinfo.xdStyles.fill.colorStops[N].color).str, ' ').concat(Math.round(100 * this.layerinfo.xdStyles.fill.colorStops[N].position), '%'),
            N + 1 !== this.layerinfo.xdStyles.fill.colorStops.length && (D += ',');
          C.indexOf('radial') > - 1 ? i.background = ''.concat(C, 'circle,').concat(D, ')') : C.indexOf('linear') > - 1 && (i.background = ''.concat(C).concat(this.vectorXDandSKtoCSSDeg({
            x1: this.layerinfo.xdStyles.fill.x1,
            x2: this.layerinfo.xdStyles.fill.x2,
            y1: this.layerinfo.xdStyles.fill.y1,
            y2: this.layerinfo.xdStyles.fill.y2
          }), 'deg,').concat(D, ')'))
        }
        this.layerinfo.xdStyles.shadow && this.layerinfo.xdStyles.shadow.enabled && (i['box-shadow'] = 5 != this.resolu ? ''.concat(this.getModel(this.layerinfo.xdStyles.shadow.offset[0]) || 0).concat(n, ' ') : ''.concat(Math.round(this.layerinfo.xdStyles.shadow.offset[0] / this.imageData.width * this.resoluscale) || 0).concat(n, ' '), i['box-shadow'] += 5 != this.resolu ? ''.concat(this.getModel(this.layerinfo.xdStyles.shadow.offset[1]) || 0).concat(n, ' ') : ''.concat(Math.round(this.layerinfo.xdStyles.shadow.offset[1] / this.imageData.width * this.resoluscale) || 0).concat(n, ' '), i['box-shadow'] += 5 != this.resolu ? ''.concat(this.getModel(this.layerinfo.xdStyles.shadow.blur) || 0).concat(n, ' ') : ''.concat(Math.round(this.layerinfo.xdStyles.shadow.blur / this.imageData.width * this.resoluscale) || 0).concat(n, ' '), i['box-shadow'] += this.xdColorToRGBA(this.layerinfo.xdStyles.shadow.color).str),
          'ellipse' == this.layerinfo.xdSubType && (i['border-radius'] = '50%'),
          this.layerinfo.xdStyles.backgroundBlur && this.layerinfo.xdStyles.backgroundBlur.enabled && (i.filter = 'blur('.concat(Math.round(this.layerinfo.xdStyles.backgroundBlur.amount), 'px)')),
          this.layerinfo.opacity && (i.opacity = ''.concat(Math.round(100 * this.layerinfo.opacity) / 100))
      } else {
        if (this.layerinfo.fill && this.layerinfo.fill.gradient) {
          for (var _ = 'radial' == this.layerinfo.fill.type ? 'radial-gradient(' : 'linear-gradient(', j = '', S = 0; S < this.layerinfo.fill.gradient.colors.length; S++) j += ''.concat(this.layerinfo.fill.gradient.colors[S].color.value, ' ').concat(100 * (this.layerinfo.fill.gradient.colors[S].location / 4096).toFixed(2), '%'),
            S + 1 !== this.layerinfo.fill.gradient.colors.length && (j += ',');
          _.indexOf('radial') > - 1 ? i.background = ''.concat(_, 'circle,').concat(j, ')') : _.indexOf('linear') > - 1 && (i.background = ''.concat(_).concat(90 - this.layerinfo.fill.angle.value, 'deg,').concat(j, ')'))
        }
        if (this.layerinfo.layerEffects && (!this.layerinfo.layerEffects.hasOwnProperty('masterFXSwitch') || this.layerinfo.layerEffects.hasOwnProperty('masterFXSwitch') && this.layerinfo.layerEffects.masterFXSwitch)) {
          if (this.layerinfo.layerEffects.gradientFill || this.layerinfo.layerEffects.gradientFillMulti) {
            var T = [
            ];
            this.layerinfo.layerEffects.gradientFill ? T.push(this.layerinfo.layerEffects.gradientFill) : this.layerinfo.layerEffects.gradientFillMulti && (T = this.layerinfo.layerEffects.gradientFillMulti);
            for (var k = T.length - 1; k >= 0; k--) if (T[k].enabled) {
              for (var z = 'radial' == T[k].type ? 'radial-gradient(' : 'linear-gradient(', L = '', E = 0; E < T[k].gradient.colors.length; E++) L += T[k].gradient.colors[E].color.value,
                E + 1 !== T[k].gradient.colors.length && (L += ',');
              z.indexOf('radial') > - 1 ? i.background = ''.concat(z, 'circle,').concat(L, ')') : z.indexOf('linear') > - 1 && (i.background = ''.concat(z).concat(T[k].angle ? 90 - T[k].angle.value : 0, 'deg,').concat(L, ')'));
              break
            }
          }
          if (this.layerinfo.layerEffects.frameFX || this.layerinfo.layerEffects.frameFXMulti) {
            var O = [
            ];
            this.layerinfo.layerEffects.frameFX && O.push(this.layerinfo.layerEffects.frameFX),
              this.layerinfo.layerEffects.frameFXMulti && (O = this.layerinfo.layerEffects.frameFXMulti);
            for (var P = O.length - 1; P >= 0; P--) if (O[P].enabled) {
              var B = void 0,
                G = '';
              if (B = 5 != this.resolu ? O[P].size ? this.getModel(O[P].size, t) : this.getModel(this.psLayerEffectsDefault.frameFX.size, t) : O[P].size ? Math.round(O[P].size / this.imageData.width * this.resoluscale) : Math.round(this.psLayerEffectsDefault.frameFX.size / this.imageData.width * this.resoluscale), O[P].type) {
                for (var U = 0; U < O[P].gradient.colors.length; U++) G += G ? O[P].opacity ? ', rgba('.concat(Math.round(O[P].gradient.colors[U].color.red), ', ').concat(Math.round(O[P].gradient.colors[U].color.green), ', ').concat(Math.round(O[P].gradient.colors[U].color.blue), ', ').concat(O[P].opacity.value / 100, ')') : ', '.concat(O[P].gradient.colors[U].color.value) : O[P].opacity ? 'rgba('.concat(Math.round(O[P].gradient.colors[U].color.red), ', ').concat(Math.round(O[P].gradient.colors[U].color.green), ', ').concat(Math.round(O[P].gradient.colors[U].color.blue), ', ').concat(O[P].opacity.value / 100, ')') : ''.concat(O[P].gradient.colors[U].color.value);
                i.border = ''.concat(B, 'px solid'),
                  'linear' == O[P].type ? i['border-image'] = 'linear-gradient('.concat(O[P].angle ? 90 - O[P].angle.value : 0, 'deg, ').concat(G, ') ').concat(B, ' ').concat(B) : i['border-image'] = 'radial-gradient(circle, '.concat(G, ') ').concat(B, ' ').concat(B)
              } else G = O[P].color && O[P].color.red ? O[P].opacity ? 'rgba('.concat(Math.round(O[P].color.red), ', ').concat(Math.round(O[P].color.green), ', ').concat(Math.round(O[P].color.blue), ', ').concat(O[P].opacity.value / 100, ')') : 'rgba('.concat(Math.round(O[P].color.red), ', ').concat(Math.round(O[P].color.green), ', ').concat(Math.round(O[P].color.blue), ', ').concat(this.psLayerEffectsDefault.frameFX.opacity.value / 100, ')') : O[P].opacity ? 'rgba('.concat(this.psLayerEffectsDefault.frameFX.color.red, ', ').concat(this.psLayerEffectsDefault.frameFX.color.green, ', ').concat(this.psLayerEffectsDefault.frameFX.color.blue, ', ').concat(O[P].opacity.value / 100, ')') : 'rgba('.concat(this.psLayerEffectsDefault.frameFX.color.red, ', ').concat(this.psLayerEffectsDefault.frameFX.color.green, ', ').concat(this.psLayerEffectsDefault.frameFX.color.blue, ', ').concat(this.psLayerEffectsDefault.frameFX.opacity.value / 100, ')'),
                i.border = ''.concat(B, 'px solid ').concat(G);
              break
            }
          }
          if (this.layerinfo.layerEffects.dropShadow || this.layerinfo.layerEffects.dropShadowMulti || this.layerinfo.layerEffects.innerShadow || this.layerinfo.layerEffects.innerShadowMulti) {
            var Z = [
            ];
            this.layerinfo.layerEffects.dropShadow && Z.push(this.layerinfo.layerEffects.dropShadow),
              this.layerinfo.layerEffects.dropShadowMulti && (Z = Z.length ? Z.concat(this.layerinfo.layerEffects.dropShadowMulti) : this.layerinfo.layerEffects.dropShadowMulti),
              this.layerinfo.layerEffects.innerShadow && Z.push(this.layerinfo.layerEffects.innerShadow),
              this.layerinfo.layerEffects.innerShadowMulti && (Z = Z.length ? Z.concat(this.layerinfo.layerEffects.innerShadowMulti) : this.layerinfo.layerEffects.innerShadowMulti),
            Z.forEach(function (o, r) {
              if (o.enabled) {
                var a,
                  s = o.hasOwnProperty('chokeMatte') ? o.chokeMatte : e.psLayerEffectsDefault.dropShadow.chokeMatte;
                if (5 != e.resolu) {
                  a = o.hasOwnProperty('useGlobalAngle') && !o.useGlobalAngle ? o.localLightingAngle ? 180 - o.localLightingAngle.value : 90 : e.layerinfo.globalLight && e.layerinfo.globalLight.hasOwnProperty('angle') ? 180 - e.layerinfo.globalLight.angle : 90;
                  var c = o.hasOwnProperty('distance') ? e.getModel(o.distance, t) : e.getModel(e.psLayerEffectsDefault.dropShadow.distance, t),
                    l = o.hasOwnProperty('blur') ? e.getModel(o.blur, t) : e.getModel(e.psLayerEffectsDefault.dropShadow.blur, t);
                  0 == r ? i['box-shadow'] = ''.concat(Math.round(Math.cos(2 * Math.PI / 360 * a) * c)).concat(n, ' ') : i['box-shadow'] ? i['box-shadow'] += ', '.concat(Math.round(Math.cos(2 * Math.PI / 360 * a) * c)).concat(n, ' ') : i['box-shadow'] = ''.concat(Math.round(Math.cos(2 * Math.PI / 360 * a) * c)).concat(n, ' '),
                    i['box-shadow'] += ''.concat(Math.round(Math.sin(2 * Math.PI / 360 * a) * c)).concat(n, ' '),
                    i['box-shadow'] += ''.concat(Math.round(l - l * (s / 100))).concat(n, ' '),
                    i['box-shadow'] += ''.concat(Math.round(l * (s / 100))).concat(n, ' ')
                } else {
                  var u;
                  u = o.hasOwnProperty('useGlobalAngle') && !o.useGlobalAngle ? o.localLightingAngle ? 180 - o.localLightingAngle.value : 90 : e.layerinfo.globalLight && e.layerinfo.globalLight.hasOwnProperty('angle') ? 180 - e.layerinfo.globalLight.angle : 90;
                  var d = o.hasOwnProperty('distance') ? o.distance / e.imageData.width * e.resoluscale : e.psLayerEffectsDefault.dropShadow.distance / e.imageData.width * e.resoluscale,
                    g = o.hasOwnProperty('blur') ? o.blur / e.imageData.width * e.resoluscale : e.psLayerEffectsDefault.dropShadow.blur / e.imageData.width * e.resoluscale;
                  0 == r ? i['box-shadow'] = ''.concat(Math.round(Math.cos(2 * Math.PI / 360 * u) * d)).concat(n, ' ') : i['box-shadow'] ? i['box-shadow'] += ', '.concat(Math.round(Math.cos(2 * Math.PI / 360 * u) * d)).concat(n, ' ') : i['box-shadow'] = ''.concat(Math.round(Math.cos(2 * Math.PI / 360 * u) * d)).concat(n, ' '),
                    i['box-shadow'] += ''.concat(Math.round(Math.sin(2 * Math.PI / 360 * u) * d)).concat(n, ' '),
                    i['box-shadow'] += ''.concat(Math.round(Math.round(g) - Math.round(g) * (s / 100))).concat(n, ' '),
                    i['box-shadow'] += ''.concat(Math.round(Math.round(g) * (s / 100))).concat(n, ' ')
                }
                o.opacity && o.color.hasOwnProperty('red') ? i['box-shadow'] += o.color.value : o.opacity && !o.color.hasOwnProperty('red') ? i['box-shadow'] += 'rgba('.concat(e.psLayerEffectsDefault.dropShadow.color.red, ', ').concat(e.psLayerEffectsDefault.dropShadow.color.green, ', ').concat(e.psLayerEffectsDefault.dropShadow.color.blue, ', ').concat(o.opacity.value / 100, ')') : !o.opacity && o.color.hasOwnProperty('red') ? i['box-shadow'] += 'rgba('.concat(Math.round(o.color.red), ', ').concat(Math.round(o.color.blue), ', ').concat(Math.round(o.color.green), ', ').concat(e.psLayerEffectsDefault.dropShadow.opacity.value / 100, ')') : i['box-shadow'] += 'rgba('.concat(e.psLayerEffectsDefault.dropShadow.color.red, ', ').concat(e.psLayerEffectsDefault.dropShadow.color.green, ', ').concat(e.psLayerEffectsDefault.dropShadow.color.blue, ', ').concat(e.psLayerEffectsDefault.dropShadow.opacity.value / 100, ')')
              }
            })
          }
        }
      }
      this.layerinfo.blendOptions && (this.layerinfo.blendOptions.opacity || this.layerinfo.blendOptions.fillOpacity) && (this.layerinfo.hasOwnProperty('pixels')
      ? this.layerinfo.blendOptions.opacity && this.layerinfo.blendOptions.fillOpacity
        ? i.opacity = (Math.round(this.layerinfo.blendOptions.opacity.value) / 100 * (Math.round(this.layerinfo.blendOptions.fillOpacity.value) / 100)).toFixed(2)
        : this.layerinfo.blendOptions.opacity
          ? i.opacity = Math.round(this.layerinfo.blendOptions.opacity.value) / 100
          : this.layerinfo.blendOptions.fillOpacity && (i.opacity = Math.round(this.layerinfo.blendOptions.fillOpacity.value) / 100)
      : this.layerinfo.blendOptions.opacity && (i.opacity = Math.round(this.layerinfo.blendOptions.opacity.value) / 100)),
        this.layerinfo.path && this.layerinfo.path.pathComponents[0].origin.radii && (this.layerinfo.path.pathComponents[0].origin.radii[0] == this.layerinfo.path.pathComponents[0].origin.radii[1] && this.layerinfo.path.pathComponents[0].origin.radii[0] == this.layerinfo.path.pathComponents[0].origin.radii[2] && this.layerinfo.path.pathComponents[0].origin.radii[0] == this.layerinfo.path.pathComponents[0].origin.radii[3]
       ? 5 != this.resolu
         ? i['border-radius'] = ''.concat(this.getModel(this.layerinfo.path.pathComponents[0].origin.radii[1], t)).concat(n)
         : i['border-radius'] = ''.concat(Math.round(this.layerinfo.path.pathComponents[0].origin.radii[1] / this.imageData.width * this.resoluscale)).concat(n)
       : 5 != this.resolu
         ? (i['border-radius'] = ''.concat(this.getModel(this.layerinfo.path.pathComponents[0].origin.radii[3])).concat(n, ' '), i['border-radius'] += ''.concat(this.getModel(this.layerinfo.path.pathComponents[0].origin.radii[0])).concat(n, ' '), i['border-radius'] += ''.concat(this.getModel(this.layerinfo.path.pathComponents[0].origin.radii[1])).concat(n, ' '), i['border-radius'] += ''.concat(this.getModel(this.layerinfo.path.pathComponents[0].origin.radii[2])).concat(n))
         : (i['border-radius'] = ''.concat(Math.round(this.layerinfo.path.pathComponents[0].origin.radii[3] / this.imageData.width * this.resoluscale)).concat(n, ' '), i['border-radius'] += ''.concat(Math.round(this.layerinfo.path.pathComponents[0].origin.radii[0] / this.imageData.width * this.resoluscale)).concat(n, ' '), i['border-radius'] += ''.concat(Math.round(this.layerinfo.path.pathComponents[0].origin.radii[1] / this.imageData.width * this.resoluscale)).concat(n, ' '), i['border-radius'] += ''.concat(Math.round(this.layerinfo.path.pathComponents[0].origin.radii[2] / this.imageData.width * this.resoluscale)).concat(n))),
        this.layerinfo.path && this.layerinfo.path.pathComponents[0] && 'ellipse' == this.layerinfo.path.pathComponents[0].origin.type && (i['border-radius'] = '50%')
    }
    // 修正单行text的行高
    if ('textLayer' == this.layerinfo.type) {
      if (this.layerinfo.textInfo.size >= this.layerinfo.height) {        
        i['line-height'] = i.height
        let size = this.layerinfo.textInfo.size
        // 暂时不限制fontsize, 会导致手机上布局错误，手机可以支持到8px
        // if (t && size < 24) {
        //   size = 24
        // }
        this.layerinfo.width = size * this.layerinfo.textInfo.text.trim().length
        i.width = this.getModel(this.layerinfo.width, t) + n
      } else if (this.layerinfo.textInfo.leading < this.layerinfo.textInfo.size) {
        i['line-height'] = ''
      }
    }
    for (var Y in i) i[Y] && (this.codeString += ''.concat(Y, ':').concat(i[Y], ';\n'))
    return this.codeString
  }

  getModel(t, e) {
    return e ? Math.round(t / this.mobileFontSize * 100) / 100 : t ? Math.round(t / this.resoluscale) : '0'
  }

  getFontWeight(t) {
    for (var e = null, n = 0; n < this.fontWeightList.length; n++) if (t.toLowerCase() == this.fontWeightList[n].name || t.toLowerCase() == this.fontWeightList[n].realName.toLowerCase()) {
      e = 'bold' == this.fontWeightList[n].name ? 'bold' : this.fontWeightList[n].num;
      break
    }
    return null == e ? 'normal' : e
  }

  xdColorToRGBA(t, e) {
    var n = {};
    return t = Number.parseInt(t),
      n.a = t >> 24 & 255,
      n.r = t >> 16 & 255,
      n.g = t >> 8 & 255,
      n.b = 255 & t,
      n.value = 255 == n.a ? n.a / 255 * 100 : 100 * (n.a / 255).toFixed(2),
      n.str = 'rgba('.concat(n.r, ',').concat(n.g, ',').concat(n.b, ',').concat(n.value / 100, ')'),
      n
  }

  vectorXDandSKtoCSSDeg(t) {
    var e,
      n = t.x1,
      i = t.y1,
      o = t.x2 - n,
      r = t.y2 - i,
      a = o > 0,
      s = r / Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2)),
      c = 180 * Math.acos(s) / Math.PI;
    return e = a ? 360 - c : c,
      (e += 180) > 360 && (e -= 360),
      Math.round(e)
  }
}