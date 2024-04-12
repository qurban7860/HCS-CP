import { m } from 'framer-motion'
import { styled } from '@mui/material/styles'
import { MaterialDesignContent } from 'notistack'
import ASSET from 'config/asset-directory'

export const StyledSnackContent = styled(MaterialDesignContent)(({ theme }) => ({
  '&.notistack-MuiContent': {
    backgroundColor: theme.palette.howick.darkBlue,
    backgroundImage: `url(${ASSET.BG_STROKE_SNACK_LOGO})`,
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: 'center',
    backgroundPositionX: 'right',
    backgroundSize: '140%',
    backgroundOpacity: 0.2,
    backgroundAttachment: 'fixed',
    display: 'flex',
    flexDirection: 'row',
    boxShadow: 'none',
    objectFit: 'cover',
    justifyContent: 'space-between',
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.fontWeightBold
    // padding: theme.spacing(5, 4)
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.palette.error.dark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // fontSize: theme.typography.h4.fontSize,
    // fontWeight: theme.typography.fontWeightBold,
    padding: 0
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: theme.palette.howick.midBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // fontSize: theme.typography.h4.fontSize,
    // fontWeight: theme.typography.fontWeightBold,
    padding: 0
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: theme.palette.howick.orange,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.black,
    padding: 0
  }
}))

export const StyledSnackIconMDiv = styled(m.div)(({ theme, color }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: `${color}.main`,
  width: 30,
  height: 30
}))
