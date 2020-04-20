const fontWeightList = [
  {
    name: 'black',
    num: 900,
    realName: 'Black'
  },
  {
    name: 'heavy',
    num: 800,
    realName: 'Heavy'
  },
  {
    name: 'extrabold',
    num: 800,
    realName: 'Extra-bold'
  },
  {
    name: 'ultrabold',
    num: 800,
    realName: 'Ultra Bold'
  },
  {
    name: 'bold',
    num: 700,
    realName: 'Bold'
  },
  {
    name: 'semibold',
    num: 600,
    realName: 'Semi-Bold'
  },
  {
    name: 'demibold',
    num: 600,
    realName: 'Demi-Bold'
  },
  {
    name: 'medium',
    num: 500,
    realName: 'Medium'
  },
  {
    name: 'regular',
    num: 400,
    realName: 'Regular'
  },
  {
    name: 'normal',
    num: 400,
    realName: 'Normal'
  },
  {
    name: 'light',
    num: 300,
    realName: 'Light'
  },
  {
    name: 'hairline',
    num: 100,
    realName: 'Hairline'
  },
  {
    name: 'thin',
    num: 100,
    realName: 'Thin'
  },
  {
    name: 'ultralight',
    num: 200,
    realName: 'Ultra-Light'
  },
  {
    name: 'extralight',
    num: 200,
    realName: 'Extra-Light'
  }
]

const psLayerEffectsDefault = {
  solidFill: {
    color: {
      red: 129,
      green: 129,
      blue: 129
    },
    enabled: !0,
    opacity: {
      units: 'percentUnit',
      value: 100
    }
  },
  frameFX: {
    enabled: !0,
    color: {
      red: 0,
      green: 0,
      blue: 0
    },
    opacity: {
      units: 'percentUnit',
      value: 100
    },
    size: 1
  },
  dropShadow: {
    blur: 7,
    chokeMatte: 0,
    color: {
      red: 0,
      green: 0,
      blue: 0
    },
    distance: 3,
    localLightingAngle: {
      units: 'angleUnit',
      value: 90
    },
    opacity: {
      units: 'percentUnit',
      value: 35
    }
  }
}

module.exports = {
  fontWeightList,
  psLayerEffectsDefault
}