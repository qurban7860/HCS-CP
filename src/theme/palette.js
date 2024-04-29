import { alpha } from '@mui/material/styles'

const BRAND = {
  background: '#63738114',
  title: '#FFF'
}

const GREY = {
  0: '#F2EED8',
  100: '#F4F4F4',
  200: '#E9ECEF',
  300: '#DFDFDF',
  400: '#D4D4D4',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24'
}

const PRIMARY = {
  lighter: '#0940B2',
  light: '#0940B2',
  main: '#0940B2',
  dark: '#10079F',
  darker: '#10079F',
  contrastText: '#fff'
}

const SECONDARY = {
  lighter: '#FFEA00',
  light: '#FFD700',
  main: '#FFA200',
  dark: '#FFA200',
  darker: '#FFA200',
  contrastText: '#fff'
}

const INFO = {
  lighter: '#51BFE2',
  light: '#00A5DB',
  main: '#0084C9',
  dark: '#01466F',
  darker: '#001824',
  contrastText: '#fff'
}

const SUCCESS = {
  lighter: '#897A69',
  light: '#0940B2',
  main: '#10079F',
  dark: '#10079F',
  darker: '#FFA200',
  contrastText: '#fff'
}

const WARNING = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: GREY[800]
}

const ERROR = {
  lighter: '#FFE9D5',
  light: '#FFAC82',
  main: '#DA4848',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#fff'
}

const HOWICKBLUE = {
  light: '#0084C9',
  main: '#0940B2',
  dark: '#10079F'
}

const HOWICKORANGE = {
  main: '#FFA200'
}

const HOWICKBRONZE = {
  lighter: '#B8AEA3',
  light: '#A39586',
  main: '#897A69',
  dark: '#5E5244',
  darker: '#473D31'
}

const HOWICKBURNIN = {
  lighter: '#F2FAC2',
  light: '#E9F799',
  main: '#D1ED18',
  dark: '#B4C300',
  darker: '#8A8400',
  alt: '#18ED34',
  altDark: '#32C600',
  contrastText: '#000'
}

const HOWICK = {
  lightGray: '#F4F4F4',
  darkGray: '#DFDFDF',
  darkBlue: '#10079F',
  midBlue: '#0940B2',
  blue: '#0084C9',
  orange: '#FFA200',
  bronze: '#897A69',
  white: '#FFF',
  error: '#DA4848',
  burnIn: '#D1ED18'
}
const ACTION = {
  hover: alpha(GREY[500], 0.08),
  selected: alpha(GREY[500], 0.16),
  disabled: alpha(GREY[100], 1),
  disabledBackground: alpha(GREY[700], 0.4),
  focus: alpha(GREY[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.78
}

const TABLE = {
  header: GREY[400],
  row: GREY[700],
  cellOdd: GREY[200],
  cellEven: '#EDEDED'
}

const COMMON = {
  common: { black: '#000', white: '#F2EED8' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  howick: HOWICK,
  grey: GREY,
  bronze: HOWICKBRONZE,
  blue: HOWICKBLUE,
  orange: HOWICKORANGE,
  burnIn: HOWICKBURNIN,
  divider: alpha(GREY[500], 0.24),
  action: ACTION,
  table: TABLE,
  background: BRAND.background
}

export default function palette(themeMode) {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600]
      // disabled: GREY[0]
    },
    background: { paper: GREY[200], default: GREY[400], neutral: GREY[500] },
    action: {
      ...COMMON.action,
      active: GREY[600]
    }
  }

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: GREY[100],
      secondary: GREY[500],
      disabled: GREY[200]
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.16)
    },
    action: {
      ...COMMON.action,
      active: GREY[500]
    }
  }

  return themeMode === 'light' ? light : dark
}
