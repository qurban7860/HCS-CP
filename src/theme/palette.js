import { alpha, useTheme } from '@mui/material/styles'
import { KEY } from 'constant'

const BRAND = {
 background: '#63738114',
 title     : '#F2EED8'
}

const BASE = {
 white: '#F2EED8',
 black: '#0E0E10'
}

const GREY = {
 0  : BASE.white,
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
 lighter     : '#0940B2',
 light       : '#0940B2',
 main        : '#0940B2',
 dark        : '#10079F',
 darker      : '#10079F',
 contrastText: BASE.white
}

const SECONDARY = {
 lighter     : '#FFEA00',
 light       : '#FFD700',
 main        : '#FFA200',
 dark        : '#FFA200',
 darker      : '#FFA200',
 contrastText: BASE.white
}

const INFO = {
 lighter     : '#51BFE2',
 light       : '#00A5DB',
 main        : '#0084C9',
 dark        : '#01466F',
 darker      : '#001824',
 contrastText: BASE.white
}

const SUCCESS = {
 lighter     : '#897A69',
 light       : '#0940B2',
 main        : '#10079F',
 dark        : '#10079F',
 darker      : '#FFA200',
 contrastText: BASE.white
}

const WARNING = {
 lighter     : '#FFF5CC',
 light       : '#FFD666',
 main        : '#FFAB00',
 dark        : '#B76E00',
 darker      : '#7A4100',
 contrastText: GREY[800]
}

const ERROR = {
 lighter     : '#FFE9D5',
 light       : '#FFAC82',
 main        : '#DA4848',
 dark        : '#B71D18',
 darker      : '#7A0916',
 contrastText: BASE.white
}

const HOWICKBLUE = {
 lighter     : '#8BC9FF',
 light       : '#0084C9',
 main        : '#0940B2',
 dark        : '#10079F',
 darker      : '#062B74',
 contrastText: BASE.white
}

const HOWICKORANGE = {
 lighter     : '#FFE183',
 light       : '#FFC309',
 main        : '#FFA200',
 dark        : '#FF9100',
 darker      : '#FF7100',
 contrastText: BASE.black
}

const HOWICKBRONZE = {
 lighter     : '#B8B2AB',
 light       : '#9D9286',
 main        : '#897A69',
 dark        : '#75634D',
 darker      : '#5B4C3C',
 contrastText: BASE.white
}

const HOWICKBURNIN = {
 lighter     : '#F2FAC2',
 light       : '#E9F799',
 main        : '#D1ED18',
 dark        : '#B4C300',
 darker      : '#8A8400',
 alt         : '#18ED34',
 altDark     : '#32C600',
 contrastText: BASE.black
}

const HOWICK = {
 lightGray: '#F4F4F4',
 darkGray : '#DFDFDF',
 darkBlue : '#10079F',
 midBlue  : '#0940B2',
 blue     : '#0084C9',
 orange   : '#FFA200',
 bronze   : '#897A69',
 white    : '#FFF',
 error    : '#DA4848',
 burnIn   : '#D1ED18'
}

const ACTION = {
 hover             : alpha(GREY[500], 0.08),
 selected          : alpha(GREY[500], 0.16),
 disabled          : alpha(GREY[500], 0.48),
 disabledText      : alpha(GREY[600], 0.46),
 disabledBackground: alpha(GREY[300], 1),
 focus             : alpha(GREY[500], 0.24),
 hoverOpacity      : 0.08,
 disabledOpacity   : 0.4
}

const TABLE = {
 header  : GREY[400],
 row     : GREY[700],
 cellOdd : GREY[200],
 cellEven: '#EDEDED'
}

const COMMON = {
 common    : BASE,
 primary   : PRIMARY,
 secondary : SECONDARY,
 info      : INFO,
 success   : SUCCESS,
 warning   : WARNING,
 error     : ERROR,
 howick    : HOWICK,
 grey      : GREY,
 bronze    : HOWICKBRONZE,
 blue      : HOWICKBLUE,
 orange    : HOWICKORANGE,
 burnIn    : HOWICKBURNIN,
 divider   : alpha(GREY[500], 0.24),
 action    : ACTION,
 table     : TABLE,
 background: BRAND.background
}

const BACKGROUND = {
 paper  : GREY[100],
 default: '#F8F9FA',
 neutral: GREY[500]
}

export default function palette(themeMode) {
 const light = {
  ...COMMON,
  mode: KEY.LIGHT,
  text: {
   primary  : GREY[800],
   secondary: GREY[600],
   disabled : GREY[500],
   no       : GREY[800]
  },
  background: BACKGROUND,
// HPS-1672
//   howick: HOWICK,
  action: {
   ...COMMON.action,
   // hover: GREY[200],
   active: GREY[600]
  }
 }

 const dark = {
  ...COMMON,
  mode: KEY.DARK,
  text: {
   primary  : BASE.white,
   secondary: GREY[500],
   disabled : GREY[200],
   no       : GREY[500]
  },
  background: {
   paper  : GREY[900],
   default: GREY[900],
   neutral: alpha(GREY[500], 0.16)
  },
  action: {
   ...COMMON.action,
   active: GREY[500]
  }
 }

 return themeMode === KEY.LIGHT ? light : dark
}

export const { theme } = useTheme
