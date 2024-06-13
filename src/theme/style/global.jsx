import { m } from 'framer-motion'
import { styled, alpha } from '@mui/material/styles'
import { Popover, ListItemText, Card, Chip, Grid, Divider, Container, Skeleton, Box, Typography, IconButton } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { bgBlur } from 'theme/style'
import { RADIUS, ASSET } from 'config'
import { PATH_AUTH } from 'route/path'
import { KEY } from 'constant'
import { SvgColor } from 'component/svg-color'

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
  backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[900],
  width: '100%',
  height: '100vh'
}))

export const GStyledContactCard = styled(({ theme, selectedCardId, c, mode, ...other }) => <Card {...other} />)(
  ({ theme, selectedCardId, c, mode }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    marginLeft: selectedCardId === c._id ? theme.spacing(2) : theme.spacing(0),
    width: '100%',
    cursor: 'pointer',
    borderRight: selectedCardId === c._id && `5px solid ${mode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange}`,
    backgroundColor:
      selectedCardId === c._id
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
  })
)

// :components ____________________________________________________________________________________________

export const GStyledSpanBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
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

// :form top border divider
export const GStyledTopBorderDivider = styled(({ theme, mode, ...other }) => <Divider {...other} />)(({ theme, mode }) => ({
  height: 2,
  borderStyle: 'solid',
  borderImage:
    mode === KEY.LIGHT
      ? `linear-gradient(to right, ${theme.palette.howick.darkBlue}, ${theme.palette.howick.blue}) 1` // Replace with your actual hex values
      : `linear-gradient(to right,  ${theme.palette.grey[500]},  ${theme.palette.grey[800]}) 1`, // Replace with your actual hex values
  borderWidth: 5
}))

export const GStyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: 'white',
  '&:hover': { backgroundColor: theme.palette.secondary.main }
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

export const GStyledTooltip = styled(({ className, mode, green, disabled, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme, mode, tooltipcolor, green, disabled }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: disabled ? theme.palette.action.disabled : tooltipcolor
  },
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: '1rem',
    backgroundColor: disabled ? theme.palette.action.disabled : tooltipcolor,
    color:
      mode === KEY.LIGHT
        ? theme.palette.common.black
        : green && mode !== KEY.LIGHT
        ? theme.palette.burnIn.contrastText
        : disabled
        ? theme.palette.action.disabledText
        : theme.palette.common.white
  }
}))

export const GStyledTooltipSliding = styled(({ className, ...props }) => <Tooltip {...props} arrow classes={{ popper: className }} />)(
  ({ theme, tooltipcolor }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: tooltipcolor
    },
    [`& .${tooltipClasses.tooltip}`]: {
      fontSize: '1rem',
      color: tooltipcolor,
      backgroundColor: 'transparent'
    }
  })
)

export const GStyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'filled' && prop !== 'hasChildren' && prop !== 'shape'
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

export const GStyledBrandOverlayBox = styled(Box)(({ theme, themeMode }) => ({
  width: 100,
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black,
    mixBlendMode: themeMode === KEY.LIGHT ? 'color' : 'color-dodge'
  }
}))

export const GStyledTopPolygonDiv = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: -150,
  right: 150,
  width: 0,
  height: 0,
  borderTop: '200px solid transparent',
  borderRight: `200px solid ${theme.palette.success.main}`,
  borderBottom: '200px solid transparent',
  zIndex: 1,
  rotate: '-90deg'
}))

export const GStyledBottomPolygonDiv = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: -150,
  left: 150,
  width: 0,
  height: 0,
  borderTop: '200px solid transparent',
  borderRight: `200px solid ${theme.palette.secondary.main}`,
  borderBottom: '200px solid transparent',
  zIndex: 1,
  rotate: '90deg'
}))

export const StylendLandingContainerBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100vh',
  flexDirection: 'column',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative'
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
  backgroundPositionY: 'center',
  backgroundSize: '150%'
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

export const GCardOption = (mode) => {
  return {
    height: '100vh',
    margin: 2,
    margintop: 10,
    paddingtop: 2,

    sx: {
      backgroundColor: mode === KEY.LIGHT ? 'background.paper' : 'background.default',
      backgroundImage: `url(${mode === KEY.LIGHT ? ASSET.BG_STROKE_GREY_LOGO : ASSET.BG_STROKE_BRONZE_LOGO})`,
      backgroundSize: 'cover',
      backgroundSize: '150%'
    }
  }
}

export const GStickyHeaderCardOption = (mode) => {
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
