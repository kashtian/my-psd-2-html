const I = {
  a: {
    getSet: function (t) {
      return false
    },
    setSet: function (t) {
      console.error('no set')
    }
  }
}

module.exports = {
  initData(e) {
    if ('ps' != e.type) {
      return
    }
    var i = this
    i.sliceIndex = []
    var r,
      a,
      c;
    if (r = i.layersFilter(e.info), i.layers = i.sortByHasImages(r), i.type = 'ps', e.device ? i.device = e.device : i.device = i._setDefaultUserDevice(e), a = [
      'fill',
      'textInfo',
      'dropShadow',
      'frameFX',
      'solidFill',
      'gradientFill',
      'innerShadow'
    ], c = [
      'frameFXMulti',
      'dropShadowMulti',
      'solidFillMulti',
      'gradientFillMulti',
      'innerShadowMulti'
    ], i.layers.forEach(function (t, e) {
      if ((t.hasOwnProperty('resolution') && (i.designResolution = t.resolution), t.isAsset) && (t.images && t.images.png_xxxhd && '/0' != t.images.png_xxxhd.substr(- 2))) {
        var n = {
          index: e,
          name: t.name,
          url: t.images.png_xxxhd,
          orgUrl: t.images.orgUrl ? t.images.orgUrl : null,
          svg: t.images.svg ? t.images.svg : null,
          images: t.images || {
          },
          width: t.width || 0,
          height: t.height || 0,
          web_id: t.web_id
        };
        t.images.isNew && (n.svgUrl = t.images.svgUrl ? t.images.svgUrl : null, n.imageUrl = t.images.imageUrl ? t.images.imageUrl : null),
          i.sliceIndex.push(n)
      }
      t.strokeStyle && t.strokeStyle.strokeStyleContent && (t.strokeStyle.strokeStyleContent.color && i.setPsColor(t.strokeStyle.strokeStyleContent), t.strokeStyle.strokeStyleContent.gradient && t.strokeStyle.strokeStyleContent.gradient.colors && t.strokeStyle.strokeStyleContent.gradient.colors.forEach(function (t) {
        i.setPsColor(t)
      }));
      var o = !0,
        r = !1,
        s = void 0;
      try {
        for (var l, u = a[Symbol.iterator](); !(o = (l = u.next()).done); o = !0) {
          var d = l.value;
          if ('textInfo' == d) t[d] && i.setPsColor(t[d]);
          else if (('gradientFill' == d || 'frameFX' == d) && t.layerEffects && t.layerEffects[d]) if (t.layerEffects[d].gradient && t.layerEffects[d].gradient.colors) for (var g = 0; g < t.layerEffects[d].gradient.colors.length; g++) t.layerEffects[d].gradient.transparency && t.layerEffects[d].gradient.transparency[g] && (t.layerEffects[d].gradient.colors[g].opacity = {
            value: Number(t.layerEffects[d].gradient.transparency[g].opacity.value)
          }),
            i.setPsColor(t.layerEffects[d].gradient.colors[g]);
          else {
            t.layerEffects[d].gradient = {
              colors: [
                {
                  color: {
                    red: 215,
                    green: 215,
                    blue: 215,
                    transparent: 1
                  },
                  location: 0,
                  midpoint: 50,
                  type: 'userStop'
                },
                {
                  color: {
                    red: 255,
                    green: 255,
                    blue: 255,
                    transparent: 1
                  },
                  location: 4096,
                  midpoint: 50,
                  type: 'userStop'
                }
              ]
            };
            for (var p = 0; p < t.layerEffects[d].gradient.colors.length; p++) i.setPsColor(t.layerEffects[d].gradient.colors[p])
          } else t.layerEffects && t.layerEffects[d] && i.setPsColor(t.layerEffects[d])
        }
      } catch (t) {
        r = !0,
          s = t
      } finally {
        try {
          o || null == u.return || u.return()
        } finally {
          if (r) throw s
        }
      }
      var h = !0,
        f = !1,
        m = void 0;
      try {
        for (var I, w = c[Symbol.iterator](); !(h = (I = w.next()).done); h = !0) {
          var v = I.value;
          if ('gradientFillMulti' == v && t.layerEffects && t.layerEffects[v]) {
            var M = !0,
              b = !1,
              x = void 0;
            try {
              for (var y, A = t.layerEffects[v][Symbol.iterator](); !(M = (y = A.next()).done); M = !0) {
                var C = y.value;
                if (C.gradient && C.gradient.colors) for (var D = 0; D < C.gradient.colors.length; D++) i.setPsColor(C.gradient.colors[D]);
                else {
                  C.gradient = {
                    colors: [
                      {
                        color: {
                          red: 215,
                          green: 215,
                          blue: 215,
                          transparent: 1
                        },
                        location: 0,
                        midpoint: 50,
                        type: 'userStop'
                      },
                      {
                        color: {
                          red: 255,
                          green: 255,
                          blue: 255,
                          transparent: 1
                        },
                        location: 4096,
                        midpoint: 50,
                        type: 'userStop'
                      }
                    ]
                  };
                  for (var N = 0; N < C.gradient.colors.length; N++) i.setPsColor(C.gradient.colors[N])
                }
              }
            } catch (t) {
              b = !0,
                x = t
            } finally {
              try {
                M || null == A.return || A.return()
              } finally {
                if (b) throw x
              }
            }
          } else if (t.layerEffects && t.layerEffects[v]) {
            var _ = !0,
              j = !1,
              S = void 0;
            try {
              for (var T, k = t.layerEffects[v][Symbol.iterator](); !(_ = (T = k.next()).done); _ = !0) {
                var z = T.value;
                i.setPsColor(z)
              }
            } catch (t) {
              j = !0,
                S = t
            } finally {
              try {
                _ || null == k.return || k.return()
              } finally {
                if (j) throw S
              }
            }
          }
        }
      } catch (t) {
        f = !0,
          m = t
      } finally {
        try {
          h || null == w.return || w.return()
        } finally {
          if (f) throw m
        }
      }
      t.textInfo && t.textInfo.textStyleRange && t.textInfo.textStyleRange.length > 1 && t.textInfo.textStyleRange.forEach(function (t) {
        i.setPsColor(t.textStyle),
          null !== i.designResolution && t.textStyle.impliedFontSize && t.textStyle.impliedFontSize.value && (t.textStyle.impliedFontSize.value = Math.round(t.textStyle.impliedFontSize.value / 72 * i.designResolution))
      }),
        t.fill && t.fill.gradient && t.fill.gradient.colors.forEach(function (t) {
          i.setPsColor(t)
        }),
        t.fill && t.fill.color && i.setPsColor(t.fill)
    }), !e.sliceScale) {
      return
    }
    i.sliceScale = e.sliceScale
  },

  setPsColor(t) {
    var e,
      n,
      i;
      t.color ? (t.color.red > - 1 ? e = Math.round(t.color.red) : t.color.r > - 1 ? e = Math.round(t.color.r) : (e = 0, t.color.blue || t.color.green ? t.color.red = 0 : (t.color.b || t.color.g) && (t.color.r = 0)), t.color.green > - 1 ? n = Math.round(t.color.green) : t.color.g > - 1 ? n = Math.round(t.color.g) : (n = 0, t.color.blue || t.color.red ? t.color.green = 0 : (t.color.b || t.color.r) && (t.color.g = 0)), t.color.blue > - 1 ? i = Math.round(t.color.blue) : t.color.b > - 1 ? i = Math.round(t.color.b) : (i = 0, t.color.green || t.color.red ? t.color.b = 0 : (t.color.g || t.color.r) && (t.color.blue = 0))) : (t.color = {
      }, e = 0, n = 0, i = 0),
      t.opacity ? t.color.value = 'rgba('.concat(e, ',').concat(n, ',').concat(i, ',').concat(Math.round(t.opacity.value) / 100, ')') : t.color.value = 'rgba('.concat(e, ',').concat(n, ',').concat(i, ',1)')
  },

  _setDefaultUserDevice(t) {
    var e,
      n;
    switch (t.board ? e = t.board : t.info && t.info.length ? e = t.info[0] : t.array && t.array.length && t.array[0].frame && (e = t.array[0].frame), e.width) {
      case 375:
        n = 'iOS @1x';
        break;
      case 750:
        n = 'iOS @2x';
        break;
      case 1242:
        n = 'iOS @3x';
        break;
      case 320:
        n = 'Android mdpi';
        break;
      case 480:
        n = 'Android hdpi';
        break;
      case 720:
        n = 'Android xhdpi';
        break;
      case 1080:
        n = 'Android xxhdpi';
        break;
      case 1440:
        n = 'Android xxxhdpi';
        break;
      default:
        n = 'Web @1x'
    }
    return n
  },

  sortByHasImages() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [
    ];
    if (!I.a.getSet('sliceFirst')) return t;
    var e = [
    ],
      n = [
      ],
      i = this.type,
      o = !0,
      r = !1,
      a = void 0;
    try {
      for (var s, c = t[Symbol.iterator](); !(o = (s = c.next()).done); o = !0) {
        var l = s.value;
        l && l.isAsset && l.images && l.images.png_xxxhd || l.exportable && 'pl' == i || l.isAsset && 'ps' == i ? e.push(l) : n.push(l)
      }
    } catch (t) {
      r = !0,
        a = t
    } finally {
      try {
        o || null == c.return || c.return()
      } finally {
        if (r) throw a
      }
    }
    return n.concat(e)
  },

  layersFilter(t) {
    if ('pl' != this.type) return t = this.layersHandle(t);
    return t = (t = t.filter(function (t) {
      return function (t) {
        var e = [
          'name',
          'type',
          'top',
          'left',
          'height',
          'width',
          'sharedStyle',
          'x',
          'y',
          'symbolID',
          'isAutolayout'
        ],
          n = e.concat(['font']);
        if ('shape' === t.type || 'path' === t.type) {
          for (var i in t) if (!e.includes(i)) return !0;
          return !1
        }
        if ('text' === t.type) {
          for (var o in t) if (!n.includes(o)) return !0;
          return !1
        }
        return !('layer-group' === t.type && t.symbolID && !t.exportable && !t.hasOwnProperty('opacity') || (t = null, 0))
      }(t)
    })).filter(function (t) {
      return !t.type || (!(!t.image && !t.images) || 'symbol' !== t.type.toLowerCase())
    }),
      this.layersHandle(t)
  },

  layersHandle(t) {
    var e = 1;
    return t = t.map(function (t) {
      return t.web_id = e++ ,
        t
    }),
      'sketch' == this.type || 'sketch43' == this.type ? t = t.map(function (t) {
        return t.frame ? (t.left = Number(t.frame.x), t.top = Number(t.frame.y), t.width = Number(t.frame.width), t.height = Number(t.frame.height), t.x = Number(t.frame.x), t.y = Number(t.frame.y), t) : t
      }) : 'ps' != this.type && 'pl' != this.type || (t = t.map(function (t) {
        return t.x = Number(t.left),
          t.y = Number(t.top),
          t
      })),
      t
  }
}