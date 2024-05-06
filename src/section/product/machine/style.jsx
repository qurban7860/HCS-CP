import { styled } from '@mui/material/styles'
import { Divider, ListItemText, Chip } from '@mui/material'
import { KEY } from 'constant'
import { ASSET } from 'config'

export const StyledTopBorderDivider = styled(({ theme, mode, ...other }) => <Divider {...other} />)(({ theme, mode }) => ({
  height: 2,
  borderStyle: 'solid',
  borderColor: mode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.grey[400],
  borderWidth: 5
}))

export const StyledIconListItemText = styled(({ theme, inActive, ...other }) => <ListItemText {...other} />)(({ theme, inActive }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  color: !inActive ? theme.palette.error.main : theme.palette.burnIn.main
}))

export const StyledStatusChip = styled(({ theme, isActive, ...other }) => <Chip {...other} />)(({ theme, isActive }) => ({
  backgroundColor: isActive ? theme.palette.howick.burnIn : theme.palette.howick.error,
  color: isActive ? theme.palette.common.black : theme.palette.common.white,
  fontWeight: 'bold'
}))

export const CardOption = (mode) => {
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
