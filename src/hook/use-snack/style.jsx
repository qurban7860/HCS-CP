import { m } from 'framer-motion'
import { styled } from '@mui/material/styles'
import { MaterialDesignContent } from 'notistack'

export const StyledSnackContent = styled(MaterialDesignContent)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  '&.notistack-MuiContent': {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    boxShadow: 'none',
    objectFit: 'cover',
    justifyContent: 'space-between',
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.grey[800],
    // padding horizontal
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    // padding vertical
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0)
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.common.white
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: theme.palette.howick.midBlue,
    color: theme.palette.common.white
  },
  '&.notistack-MuiContent-success': {
    // backgroundColor: theme.palette.howick.midBlue,
    flexDirection: 'row'
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: theme.palette.howick.orange,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.black
  }
}))

export const StyledSnackIconMDiv = styled(m.div)(({ theme, color }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30
}))
