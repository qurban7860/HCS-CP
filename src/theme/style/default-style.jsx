import { styled, alpha } from '@mui/material/styles'
import { Popover, Stack, Card, Chip, Container, TableRow, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { bgBlur } from 'theme/style'
import { RADIUS, ASSET } from 'config'
import { PATH_AUTH } from 'route/path'

// :components ____________________________________________________________________________________________

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: 'white',
  '&:hover': { backgroundColor: theme.palette.secondary.main },
}))

export const StyledLoadingScreenDiv = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 9998,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}))

export const StyledRoot = styled('div')(({ theme }) => ({
  '&:before': {
    ...bgBlur({
      color: theme.palette.primary.dark,
    }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: 'calc(100% - 50px)',
    position: 'absolute',
  },
}))

export const StyledInfo = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

export const StyledCustomAvatar = styled('div')(({ theme }) => ({
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'common.white',
  color: '#fff',
  fontSize: '4rem',
  ml: { xs: 3, md: 3 },
  mt: { xs: 1, md: 1 },
  width: { xs: 110, md: 110 },
  height: { xs: 110, md: 110 },
}))

export const HtmlTooltip = styled(({ className, ...props }, TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))

export const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme, tooltipcolor }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: tooltipcolor,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: '1rem',
    backgroundColor: tooltipcolor,
  },
}))

export const StyledTooltipSliding = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme, tooltipcolor }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: tooltipcolor,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: '1rem',
    color: tooltipcolor,
    backgroundColor: 'transparent',
  },
}))
export const StyledVersionChip = styled(Chip)(({ theme, pointer }) => ({
  margin: theme.spacing(0.2),
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.light, 0.25),
  },
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,

  // change mui chip padding top and bottom
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
}))

export const StyledStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'flex-end',
  flexDirection: 'row',
  '& > :not(style) + :not(style)': {
    marginLeft: theme.spacing(1),
  },
  // marginBottom: theme.spacing(-5),
  // marginRight: theme.spacing(3),
  '& .MuiButton-root': {
    minWidth: '32px',
    width: '32px',
    height: '32px',
    padding: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
}))

export const StyledPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    size: '100%',
    overflow: 'hidden',
    borderRadius: 0,
  },
  '& .MuiPopover-paper': {
    overflow: 'hidden',
  },
  '& .MuiPopover-paper .MuiList-root': {
    padding: '0px',
  },
  '& .MuiPopover-paper .MuiTypography-root': {
    fontSize: '1rem',
  },
  boxShadow: 'none',
  pointerEvents: 'none',
}))

export const StyledClockBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '2px',
  paddingLeft: '8px',
  paddingRight: '8px',
  border: `1px ${theme.palette.grey[500]} solid`,
}))

export const StyledBoxFlex = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const StyledBrandOverlayBox = styled(Box)(({ theme }) => ({
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
    mixBlendMode: 'color',
  },
}))

export const StyledTopPolygonDiv = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: -150,
  right: 150,
  width: 0,
  height: 0,
  borderTop: '200px solid transparent',
  borderRight: `200px solid ${theme.palette.success.main}`,
  borderBottom: '200px solid transparent',
  zIndex: 1,
  rotate: '-90deg',
}))

export const StyledBottomPolygonDiv = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: -150,
  left: 150,
  width: 0,
  height: 0,
  borderTop: '200px solid transparent',
  borderRight: `200px solid ${theme.palette.secondary.main}`,
  borderBottom: '200px solid transparent',
  zIndex: 1,
  rotate: '90deg',
}))

export const StylendLandingContainerBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100vh',
  flexDirection: 'column',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
}))

export const ButtonProps = {
  variant: 'contained',
  color: 'success',
  size: 'large',
  href: PATH_AUTH.login,
  fullWidth: true,
  sx: {
    cursor: 'pointer',
    ...RADIUS.BORDER,
  },
}

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

// @root - StyledTableRow -
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'white',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#f8f8f8',
  },
}))

// @root - GeneralAppPage - dashboard

export const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundImage: `url(${ASSET.BG_LOGO})`,
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: 'center',
  backgroundPositionX: 'left',
  backgroundSize: '100%',
  backgroundBlendMode: 'multiply',
  backgroundOpacity: 0.9,
  backgroundAttachment: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 0,
  color: 'text.primary',
  paddingRight: 24,
  paddingLeft: 24,
}))

export const StyledGlobalCard = styled(Card)(({ theme }) => ({
  paddingRight: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundImage: ` url(../../assets/illustrations/world.svg)`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top right',
  backgroundSize: 'auto 90%',
}))

/**
 * @styled components from minimal layout
 */

export const StyledBg = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  position: 'absolute',
  transform: 'scaleX(-1)',
}))

export const StyledCardContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  height: 160,
  position: 'relative',
}))

// @root - MachineEditForm - spacing
export const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

/**
 * @options components props --------------------------------------------------------------------------------------------
 */

// @root CustomerListTableToolbar
export const options = {
  spacing: 2,
  alignItems: 'center',
  direction: { xs: 'column', md: 'row' },
  sx: { px: 2.5, py: 3 },
}
