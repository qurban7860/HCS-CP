import palette from './palette'

const themePalette = palette('light')

export const preset = [
  // DEFAULT
  {
    name: 'default',
    ...themePalette.primary,
  },
  // BLUE
  {
    name: 'blue',
    lighter: '#D1E9FC',
    light: '#76B0F1',
    main: '#2065D1',
    dark: '#103996',
    darker: '#061B64',
    contrastText: '#FFFFFF',
  },
  // ORANGE
  {
    name: 'orange',
    lighter: '#FEF4D4',
    light: '#FED680',
    main: '#FFA200',
    dark: '#B66816',
    darker: '#793908',
    contrastText: themePalette.grey[800],
  },
]

export const defaultPreset = preset[0]
export const bluePreset = preset[3]
export const orangePreset = preset[4]

export const presetsOption = preset.map((color) => ({
  name: color.name,
  value: color.main,
}))

export function getPreset(key) {
  return {
    default: defaultPreset,
    blue: bluePreset,
    orange: orangePreset,
  }[key]
}
