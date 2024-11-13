import { color, m } from 'framer-motion'
import { styled, alpha } from '@mui/material/styles'
import { Popover, ListItemText, Card, Chip, Grid, Divider, Container, Skeleton, Box, Typography, IconButton, Tab, Tabs, TablePagination } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { bgBlur } from 'theme/style'
import { RADIUS, ASSET } from 'config'
import { PATH_AUTH } from 'route/path'
import { KEY, SUPPORT_STATUS } from 'constant'
import { SvgColor } from 'component/svg-color'
import { normalizer } from 'util'

// :branding __________________________________________________________________________________________________
// dashboard - welcome
export const GStyledWelcomeTitle = styled(({ themeMode, ...other }) => <Typography {...other} />)(({ theme, themeMode }) => {
 return {
  color: themeMode === KEY.LIGHT ? theme.palette.success.main : theme.palette.common.white,
  fontWeight: theme.typography.fontWeightBold
 }
})

export const GStyledWelcomeDescription = styled(({ themeMode, ...other }) => <Typography {...other} />)(({ theme, themeMode }) => {
 return {
  color: themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.common.white
 }
})
export const GStyledWelcomeContainerDiv = styled('div')(({ theme }) => ({
 height: '100vh',
 display: 'flex',
 overflow: 'hidden',
 position: 'relative',
 flexDirection: 'column',
 [theme.breakpoints.up('md')]: {
  flexDirection: 'row'
 }
}))

export const LogoGrayProps = {
 width: '50%',
 height: '60vh',
 margin: 'auto',
 filter: 'grayscale(100%) opacity(30%)',
 pointerEvents: 'none'
}

export const GStyledFallbackWrapperGrid = styled(Grid)(({ theme }) => ({
 width: 900,
 height: '100vh',
 margin: 'auto',
 textAlign: 'center',
 paddingTop: theme.spacing(10)
}))

export const GStyledBgMain = styled(({ mode, theme, ...other }) => <main {...other} />)(({ theme, mode }) => ({
 display: 'flex',
 backgroundColor: mode === KEY.LIGHT ? theme.palette.background.default : theme.palette.grey[900],
 width: '100%',
 height: '100vh'
}))

export const GStyledContactCard = styled(({ theme, selectedCardId, c, mode, ...other }) => <Card {...other} />)(({ theme, selectedCardId, c, mode }) => ({
 display: 'flex',
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 padding: theme.spacing(1),
 marginBottom: theme.spacing(2),
 marginLeft: selectedCardId === c._id || selectedCardId === c.key ? theme.spacing(2) : theme.spacing(0),
 width: '100%',
 cursor: 'pointer',
 borderRight: selectedCardId === c._id || selectedCardId === c.key ? `9px solid ${mode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange}` : '',
 backgroundColor:
  selectedCardId === c._id || selectedCardId === c.key
   ? mode === KEY.LIGHT
     ? theme.palette.grey[300]
     : theme.palette.howick.darkGrey
   : mode === KEY.LIGHT
   ? theme.palette.grey[200]
   : theme.palette.grey[800],
 '&:hover': {
  backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.howick.darkGrey,
  marginLeft: theme.spacing(2)
 },
 transition: 'ease-in-out 0.2s'
}))

export const GStyledSupportCard = styled(({ theme, selectedCardId, s, mode, ...other }) => <Card {...other} />)(({ theme, selectedCardId, s, mode }) => ({
 display: 'flex',
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 padding: theme.spacing(1),
 marginBottom: theme.spacing(2),
 marginLeft: selectedCardId === s.key ? theme.spacing(2) : theme.spacing(0),
 width: '100%',
 cursor: 'pointer',
 borderRight: selectedCardId === s.key ? `9px solid ${mode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange}` : '',
 backgroundColor: selectedCardId === s.key ? (mode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.howick.darkGrey) : mode === KEY.LIGHT ? theme.palette.grey[200] : theme.palette.grey[800],
 '&:hover': {
  backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.howick.darkGrey,
  marginLeft: theme.spacing(2)
 },
 transition: 'ease-in-out 0.2s'
}))

export const GStyledSiteCard = styled(({ theme, selectedCardId, s, mode, ...other }) => <Card {...other} />)(({ theme, selectedCardId, s, mode }) => ({
 display: 'flex',
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 padding: theme.spacing(1),
 marginBottom: selectedCardId === s._id ? theme.spacing(2) : theme.spacing(0),
 width: '300px',
 cursor: 'pointer',
 borderBottom: selectedCardId === s._id && `9px solid ${mode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange}`,
 backgroundColor: selectedCardId === s._id ? (mode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.howick.darkGrey) : mode === KEY.LIGHT ? theme.palette.grey[200] : theme.palette.grey[800],
 '&:hover': {
  backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.howick.darkGrey,
  marginBottom: theme.spacing(2)
 },
 transition: 'ease-in-out 0.2s'
}))

// :components ____________________________________________________________________________________________

export const GStyledSpanBox = styled(Box)(({ theme }) => ({
 display: 'flex',
 alignItems: 'center'
}))

export const GStyledMachineTitleSpanBox = styled(Box)(({ theme }) => ({
 display: 'flex',
 alignItems: 'center',
 my: 'auto',
 justifyContent: 'flex-start'
}))

export const GStyledCenterBox = styled(Box)(({ theme }) => ({
 display: 'flex',
 justifyContent: 'center',
 alignItems: 'center'
}))

export const GStyledFlexEndBox = styled(Box)(({ theme }) => ({
 display: 'flex',
 alignItems: 'flex-end',
 flexDirection: 'column-reverse'
}))

export const GStyledListItemText = styled(ListItemText)(({ theme }) => ({
 '& .MuiListItemText-primary': {
  fontSize: '1.5rem',
  fontWeight: 'bold'
 }
}))

export const GStyledScrollContainerGrid = styled(Box)(({ theme }) => ({
 overflow: 'auto',
 height: '100%'
}))

export const GStyledTableChip = styled(({ theme, ...other }) => <Chip {...other} />)(({ theme, mode }) => ({
 margin: theme.spacing(0.2),
 // border: `1px solid ${mode === KEY.LIGHT ? theme.palette.grey[100] : theme.palette.grey[700]}`,
 // backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.howick.midBlue,
 borderRadius: 2,
 height: '24px',
 overflow: 'hidden',
 textOverflow: 'ellipsis',
 whiteSpace: 'nowrap'
}))

export const GStyledTablePaginationCustom = styled(TablePagination)(({ theme, mode, page, data, rowsPerPage }) => ({
 '.MuiTablePagination-toolbar': {
  backgroundColor: mode === KEY.LIGHT ? theme.palette.background.default : theme.palette.grey[800],
  height: '5px',
  width: '!important 200px',
  '& .MuiTablePagination-actions': {
   '& .MuiIconButton-root': {
    '&:first-of-type': {
     color: page <= 0 ? (mode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[700]) : mode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.howick.orange
    },
    '&:nth-of-type(2)': {
     color: page <= 0 ? (mode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[700]) : mode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.howick.orange
    },
    '&:nth-of-type(3)': {
     color:
      page === Math.ceil((typeof data === 'number' ? data : data?.length ?? 0) / rowsPerPage) - 1
       ? mode === KEY.LIGHT
         ? theme.palette.grey[300]
         : theme.palette.grey[700]
       : mode === KEY.LIGHT
       ? theme.palette.grey[800]
       : theme.palette.howick.orange
    },
    '&:last-of-type': {
     color:
      page === Math.ceil((typeof data === 'number' ? data : data?.length ?? 0) / rowsPerPage) - 1
       ? mode === KEY.LIGHT
         ? theme.palette.grey[300]
         : theme.palette.grey[700]
       : mode === KEY.LIGHT
       ? theme.palette.grey[800]
       : theme.palette.howick.orange
    }
   }
  }
 }
}))

// :form top border divider
export const GStyledTopBorderDivider = styled(({ theme, mode, ...other }) => <Divider {...other} />)(({ theme, mode }) => ({
 height: 2,
 borderStyle: 'solid',
 borderImage:
  mode === KEY.LIGHT
   ? `linear-gradient(to right, ${theme.palette.howick.darkBlue}, ${theme.palette.howick.blue}) 1`
   : `linear-gradient(to right,  ${theme.palette.grey[500]},  ${theme.palette.grey[800]}) 1`,
 borderWidth: 5
}))

export const GStyledLoadingButton = styled(({ theme, isLoading, ...other }) => <LoadingButton {...other} />)(({ theme, isLoading, mode }) => ({
 backgroundColor: mode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange,
 color: mode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black,
 '&:hover': { backgroundColor: KEY.LIGHT ? theme.palette.howick.orange : theme.palette.howick.darkBlue }
 //  '&.MuiButton-root.Mui-disabled': {
 //   backgroundColor: theme.palette.grey[200],
 //   color: theme.palette.grey[600],
 //   opacity: 0.5
 //  }
}))

export const GStyledLoadingScreenDiv = styled('div')(({ theme }) => ({
 right: 0,
 bottom: 0,
 zIndex: 9998,
 width: '100%',
 height: '100%',
 position: 'fixed',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 backgroundColor: 'transparent'
}))

export const GStyledRoot = styled('div')(({ theme }) => ({
 '&:before': {
  ...bgBlur({
   color: theme.palette.primary.dark
  }),
  top: 0,
  zIndex: 9,
  content: "''",
  width: '100%',
  height: 'calc(100% - 50px)',
  position: 'absolute'
 }
}))

export const GStyledInfo = styled('div')(({ theme }) => ({
 left: 0,
 right: 0,
 zIndex: 99,
 position: 'absolute',
 [theme.breakpoints.up('md')]: {
  display: 'flex'
 }
}))

export const GStyledCustomAvatar = styled('div')(({ theme }) => ({
 borderWidth: 2,
 borderStyle: 'solid',
 borderColor: 'common.white',
 color: '#fff',
 fontSize: '4rem',
 ml: { xs: 3, md: 3 },
 mt: { xs: 1, md: 1 },
 width: { xs: 110, md: 110 },
 height: { xs: 110, md: 110 }
}))

export const GStyledTooltip = styled(({ className, mode, green, disabled, ...props }) => <Tooltip {...props} arrow classes={{ popper: className }} />)(
 ({ theme, mode, tooltipcolor, green, disabled }) => ({
  [`& .${tooltipClasses.arrow}`]: {
   color: disabled ? theme.palette.action.disabled : tooltipcolor
  },
  [`& .${tooltipClasses.tooltip}`]: {
   fontSize: '1rem',
   backgroundColor: disabled ? theme.palette.action.disabled : tooltipcolor,
   color: mode === KEY.LIGHT ? theme.palette.common.black : green && mode !== KEY.LIGHT ? theme.palette.burnIn.contrastText : disabled ? theme.palette.action.disabledText : theme.palette.common.white
  }
 })
)

export const GStyledTabs = styled(({ theme, mode, ...other }) => <Tabs {...other} />)(({ theme, mode }) => ({
 '& .MuiTabs-root': {
  padding: 0,
  marginLeft: 2
 },
 '& .MuiTabs-indicator': {
  display: 'flex',
  justifyContent: 'center'
 },
 '&:hover': {
  color: '#40a9ff',
  opacity: 1
 }
}))

export const GStyledTabBox = styled(Box)(({ theme }) => ({
 borderBottom: `${theme.spacing(0.05)} solid`,
 borderColor: alpha(theme.palette.grey[500], 0.5)
}))

export const GStyledScrollChipBox = styled(({ theme, mode, ...other }) => <Box {...other} />)(({ theme, mode }) => ({
 display: 'flex',
 alignItems: 'center',
 overflowX: 'auto',
 maxHeight: 40,
 whiteSpace: 'nowrap',
 '&::-webkit-scrollbar': {
  height: '6px'
 },
 '&::-webkit-scrollbar-thumb': {
  backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[900]
 },
 border: `1px solid ${mode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[900]}`,
 padding: '4px'
}))

export const GStyledSupportStatusFieldChip = styled(({ theme, status, ...other }) => <Chip {...other} />)(({ theme, status, mode }) => ({
 margin: theme.spacing(0.2),
 borderRadius: theme.spacing(0.4),
 color: status === SUPPORT_STATUS.OPEN || status === SUPPORT_STATUS.UNDER_REVIEW ? theme.palette.common.black : theme.palette.common.white,
 backgroundColor:
  status === SUPPORT_STATUS.OPEN || status === SUPPORT_STATUS.UNDER_REVIEW
   ? theme.palette.grey[400]
   : status === SUPPORT_STATUS.WAITING_FOR_CUSTOMER || status === SUPPORT_STATUS.UNDER_INVESTIGATION || status === SUPPORT_STATUS.PENDING
   ? theme.palette.howick.midBlue
   : status === SUPPORT_STATUS.IN_PROGRESS
   ? theme.palette.howick.orange
   : status === SUPPORT_STATUS.WAITING_FOR_SUPPORT
   ? theme.palette.grey[500]
   : status === SUPPORT_STATUS.CANCELLED || status === SUPPORT_STATUS.CLOSED
   ? theme.palette.error.main
   : status === SUPPORT_STATUS.RESOLVED || status === SUPPORT_STATUS.COMPLETED
   ? theme.palette.burnIn.altDark
   : theme.palette.howick.lightGray
}))

export const GStyledFieldGrid = styled(({ theme, mode, isMachineView, isNoBg, ...other }) => <Grid {...other} />)(({ theme, mode, isMachineView, isNoBg }) => ({
 overflowWrap: 'break-word',
 backgroundColor:
  mode === KEY.LIGHT && !isMachineView && !isNoBg
   ? theme.palette.grey[300]
   : (isMachineView || isNoBg) && mode === KEY.LIGHT
   ? 'transparent'
   : (isMachineView || isNoBg) && mode === KEY.DARK
   ? theme.palette.grey[900]
   : theme.palette.grey[800],
 padding: '0.5rem 1rem',
 height: '5rem',
 border: !isMachineView ? 'none' : `1px solid ${mode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[700]}`,
 borderRadius: isMachineView && theme.spacing(1)
}))

export const GStyledFieldChip = styled(({ theme, ...other }) => <Chip {...other} />)(({ theme, mode }) => ({
 margin: theme.spacing(0.2),
 borderRadius: theme.spacing(0.4),
 // border: `1px solid ${mode === KEY.LIGHT ? theme.palette.grey[100] : theme.palette.grey[700]}`,
 backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[700]
}))

export const GStyledMachineChip = styled(({ theme, ...other }) => <Chip {...other} />)(({ theme, mode }) => ({
 margin: theme.spacing(0.2),
 borderRadius: theme.spacing(0.4),
 // border: `1px solid ${mode === KEY.LIGHT ? theme.palette.grey[100] : theme.palette.grey[700]}`,
 color: mode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black,
 backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[300]
}))

export const GStyledTab = styled(({ theme, mode, ...other }) => <Tab {...other} />)(({ theme, mode }) => ({
 '&.Mui-selected': {
  color: mode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange,
  fontWeight: 'bold'
 },
 '&.Mui-focusVisible': {
  backgroundColor: 'howick.darkBlue'
 },
 paddingRight: theme.spacing(2),
 paddingLeft: theme.spacing(2)
}))

export const GStyledTooltipSliding = styled(({ className, ...props }) => <Tooltip {...props} arrow classes={{ popper: className }} />)(({ theme, tooltipcolor }) => ({
 [`& .${tooltipClasses.arrow}`]: {
  color: tooltipcolor
 },
 [`& .${tooltipClasses.tooltip}`]: {
  fontSize: '1rem',
  color: tooltipcolor,
  backgroundColor: 'transparent'
 }
}))

export const GStyledIconButton = styled(IconButton, {
 shouldForwardProp: prop => prop !== 'filled' && prop !== 'hasChildren' && prop !== 'shape'
})(({ filled, shape, hasChildren, theme }) => ({
 color: 'inherit',
 transition: theme.transitions.create('all', {
  duration: theme.transitions.duration.shorter
 }),
 ...(shape === 'rounded' && {
  borderRadius: Number(theme.shape.borderRadius) * 1.5
 }),
 ...(!filled && {
  opacity: 0.48,
  '&:hover': {
   opacity: 1
  }
 }),
 ...(filled && {
  color: alpha(theme.palette.common.white, 0.8),
  backgroundColor: alpha(theme.palette.grey[900], 0.48),
  '&:hover': {
   color: theme.palette.common.white,
   backgroundColor: theme.palette.grey[900]
  }
 }),
 ...(hasChildren && {
  zIndex: 9,
  top: '50%',
  position: 'absolute',
  marginTop: theme.spacing(-2.5)
 })
}))

export const GStyledPopover = styled(Popover)(({ theme }) => ({
 '& .MuiPaper-root': {
  backgroundColor: 'transparent',
  boxShadow: 'none',
  size: '100%',
  overflow: 'hidden',
  borderRadius: 0
 },
 '& .MuiPopover-paper': {
  overflow: 'hidden'
 },
 '& .MuiPopover-paper .MuiList-root': {
  padding: '0px'
 },
 '& .MuiPopover-paper .MuiTypography-root': {
  fontSize: '1rem'
 },
 boxShadow: 'none',
 pointerEvents: 'none'
}))

// :landing __________________________________________________________________________________________________

export const GStyledBrandOverlayBox = styled(({ themeMode, isMobile, ...other }) => <Box {...other} />)(({ theme, themeMode, isMobile }) => ({
 width: isMobile ? 50 : 100,
 margin: theme.spacing(1),
 marginRight: theme.spacing(1),
 marginLeft: theme.spacing(1),
 position: 'relative',
 '&:after': {
  content: '""',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  // backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black,
  mixBlendMode: themeMode === KEY.LIGHT ? 'color' : 'color-dodge'
 },
 transition: 'transform 0.3s ease-in-out',
 [theme.breakpoints.down('sm')]: {
  margin: theme.spacing(1)
 }
}))

// export const GStyledTopPolygonDiv = styled('div')(({ theme }) => ({
//  position: 'absolute',
//  top: -150,
//  right: 150,
//  width: 0,
//  height: 0,
//  borderTop: '200px solid transparent',
//  borderRight: `200px solid ${theme.palette.success.main}`,
//  borderBottom: '200px solid transparent',
//  zIndex: 1,
//  rotate: '-90deg'
// }))

export const GStyledTopPolygonDiv = styled(({ themeMode, isMobile, isMd, ...other }) => <div {...other} />)(({ theme, themeMode, isMobile, isTablet, isMd }) => {
 return {
  display: isMd || isTablet ? 'none' : 'block',
  position: 'absolute',
  top: isMobile || isTablet ? -500 : -550,
  right: isMobile ? 150 : 500,
  width: 0,
  height: 0,
  borderTop: '800px solid transparent',
  borderRight: `200px solid ${theme.palette.grey[300]}`,
  borderBottom: '400px solid transparent',
  zIndex: 0,
  rotate: '-90deg'
 }
})

// export const GStyledBottomPolygonDiv = styled('div')(({ theme }) => ({
//  position: 'absolute',
//  bottom: -150,
//  left: 150,
//  width: 0,
//  height: 0,
//  borderTop: '200px solid transparent',
//  borderRight: `200px solid ${theme.palette.secondary.main}`,
//  borderBottom: '200px solid transparent',
//  zIndex: 1,
//  rotate: '90deg'
// }))

export const GStyledBottomPolygonDiv = styled(({ themeMode, isMobile, isMd, ...other }) => <div {...other} />)(({ theme, themeMode, isMobile, isTablet, isMd }) => {
 return {
  display: isMd || isTablet ? 'none' : 'block',
  position: 'absolute',
  bottom: isMobile || isTablet ? -500 : -550,
  left: isMobile ? 150 : 500,
  width: 0,
  height: 0,
  borderTop: '800px solid transparent',
  borderRight: `200px solid ${theme.palette.grey[300]}`,
  borderBottom: '400px solid transparent',
  zIndex: 0,
  rotate: '90deg'
 }
})

export const StylendLandingContainerBox = styled(Box)(({ theme, isTablet }) => ({
 backgroundColor: theme.palette.background.default,
 backgroundImage: `url(${ASSET.BG_STROKE_GREY_LOGO})`,
 backgroundSize: 'cover',
 backgroundPositionY: 'center',
 //  backgroundSize: isMobile ? '250%' : '150%',
 //  backgroundBlendMode: 'screen',
 backgroundOpacity: 0.2,
 //  backgroundColor: alpha(theme.palette.background.default, 0.8),
 display: 'flex',
 height: '100%',
 flexDirection: 'column',
 alignItems: 'center',
 justifyContent: 'center',
 position: 'relative',
 overflow: 'hidden',
 padding: theme.spacing(2),
 [theme.breakpoints.up('md')]: {
  padding: theme.spacing(4)
 },
 [theme.breakpoints.up('md')]: {
  flexDirection: 'row'
 }
}))

export const ButtonProps = {
 variant: 'contained',
 color: 'success',
 size: 'large',
 href: PATH_AUTH.login,
 fullWidth: true,
 sx: {
  cursor: 'pointer',
  ...RADIUS.BORDER
 }
}

// :popover __________________________________________________________________________________________________
/**
// for future use
// export const StyledNZMadeContainerDiv = styled('div')(({ theme }) => ({
//   position: 'absolute',
//   top: 50,
//   left: 150,
//   width: 100,
//   height: 100,
//   // add an image here
//   backgroundImage: `url(${ASSET.NZ_MADE})`, // replace YourImageUrl with the URL or path of your image
//   backgroundSize: 'cover',
//   zIndex: 1,
//   opacity: 0.5,
//   // rotate: '90deg',
// }))


 * @table :components ____________________________________________________________________________________________
 */

// @root - GeneralAppPage - dashboard
export const GGStyledContainerSvg = styled(({ themeMode, ...other }) => <SvgColor icon={ASSET.BG_LOGO} {...other} />)(({ theme, themeMode }) => {
 return {
  color: themeMode === KEY.LIGHT ? theme.palette.success.main : theme.palette.common.white
 }
})

// export const GStyledBGBox = styled(({ themeMode, ...other }) => <Box {...other} />)(({ theme, themeMode }) => ({
//   backgroundImage: themeMode === KEY.LIGHT ? `url(${ASSET.BG_LOGO})` : `url(${ASSET.BG_DARK_LOGO})`,
//   backgroundRepeat: 'no-repeat',
//   backgroundPositionY: 'center',
//   backgroundPositionX: 'right',
//   backgroundSize: '100%',
//   backgroundBlendMode: 'multiply',
//   backgroundOpacity: 0.9,
//   backgroundAttachment: 'fixed',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center'
// }))

export const GStyledContainer = styled(({ themeMode, ...other }) => <Container {...other} />)(({ theme, themeMode }) => ({
 flexDirection: 'column',
 justifyContent: 'center',
 color: 'text.primary',
 paddingRight: 24,
 paddingLeft: 24
}))

export const GStyledGlobalCard = styled(Card)(({ theme }) => ({
 paddingRight: theme.spacing(3),
 paddingLeft: theme.spacing(3),
 marginBottom: theme.spacing(3),
 backgroundImage: ` url(../../assets/illustrations/world.svg)`,
 backgroundRepeat: 'no-repeat',
 backgroundPosition: 'top right',
 backgroundSize: 'auto 90%'
}))

/**
 * @styled components from minimal layout
 */

export const GStyledCardContainer = styled(Card)(({ theme }) => ({
 marginBottom: theme.spacing(3),
 height: 160,
 position: 'relative'
}))

export const GStyledTableSkeleton = styled(({ theme, themeMode, ...other }) => <Skeleton {...other} />)(({ theme, themeMode }) => ({
 backgroundColor: themeMode === KEY.LIGHT ? theme.palette.grey[100] : theme.palette.grey[800]
}))

// @product - machines - machines-section
export const GStyledTableHeaderBox = styled(Box)(({ theme }) => ({
 backgroundImage: `url(${ASSET.BG_STROKE_LOGO})`,
 backgroundSize: 'cover',
 backgroundPositionY: 'center'
 //  backgroundSize: '150%'
}))

export const GStyledSiteMapBox = styled(Box)(({ theme }) => ({
 justifyContent: 'center',
 margin: 'auto',
 alignItems: 'center',
 overflow: 'hidden'
}))

export const GStyledHeaderCardContainer = styled(Card)(({ theme }) => ({
 marginBottom: theme.spacing(1),
 height: 160,
 position: 'sticky',
 top: '60px',
 zIndex: 2
}))

/**
 * @options components props --------------------------------------------------------------------------------------------
 */

// @root CustomerListTableToolbar
export const options = {
 spacing: 2,
 alignItems: 'center',
 direction: { xs: 'column', md: 'row' },
 sx: { px: 2.5, py: 3 }
}

export const motionRelativeBoxOption = {
 component: m.div,
 sx: {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
 }
}

export const iconPropsOption = {
 color: 'howick.orange',
 sx: {
  height: 40,
  width: 40,
  position: 'absolute',
  bottom: 250,
  right: 200
  // transform: 'rotate(10deg)'
 }
}

export const GCardOption = mode => {
 return {
  height: '100vh',
  margin: 2,
  margintop: 10,
  paddingtop: 2,

  sx: {
   backgroundColor: mode === KEY.LIGHT ? 'background.paper' : 'background.default',
   backgroundImage: `url(${mode === KEY.LIGHT ? ASSET.BG_STROKE_GREY_LOGO : ASSET.BG_STROKE_BRONZE_LOGO})`,
   backgroundSize: 'cover'
   //  backgroundSize: '150%'
  }
 }
}

export const GStickyHeaderCardOption = mode => {
 return {
  margin: 2,
  margintop: 10,
  paddingtop: 2,

  sx: {
   // backgroundColor: mode === KEY.LIGHT ? 'background.paper' : 'background.default',
   // backgroundImage: `url(${mode === KEY.LIGHT ? ASSET.BG_STROKE_GREY_LOGO : ASSET.BG_STROKE_BRONZE_LOGO})`,
   // backgroundSize: 'cover',
   // backgroundSize: '150%',
   height: '160px',
   position: 'sticky',
   top: '60px',
   zIndex: '2'
  }
 }
}

/**
 * Returns the styles for the GTabContainerOption component.
 *
 * @param {Object} theme - The theme object.
 * @param {Object} tabsClasses - The classes object for the tabs.
 * @param {string} currentTab - The currently selected tab value.
 * @param {Function} setCurrentTab - The function to set the current tab value.
 * @returns {Object} - The styles object for the GTabContainerOption component.
 */
export const GTabContainerOption = (theme, tabsClasses, currentTab, setCurrentTab, ...other) => {
 return {
  value: currentTab,
  onChange: (event, newValue) => setCurrentTab(newValue),
  sx: {
   [`& .${tabsClasses.scrollButtons}`]: {
    '&.Mui-disabled': { opacity: 0.3 }
   },
   width: 1,
   bottom: 0,
   zIndex: 9,
   display: 'flex',
   position: 'absolute',
   backgroundColor: theme.palette.background.paper,
   '& .MuiTabs-scrollButtons': {
    width: 20,
    '&:hover': {
     backgroundColor: theme.palette.howick.darkBlue
    }
   },
   '& .MuiButtonBase-root': {
    marginRight: '0px !important'
   },
   '& .MuiIconButton-root': {
    mr: '5px  !important'
   },
   '& .Mui-selected': {
    pr: 1
   }
  },
  ...other
 }
}
