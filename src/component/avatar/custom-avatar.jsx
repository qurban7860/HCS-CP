/* eslint-disable react/display-name */
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { useMediaQuery, Badge, Avatar, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { TYPOGRAPHY } from 'constant'

const getCharAtName = name => name && name.charAt(0).toUpperCase()
const getCharAtSecondName = name => name && name.split(' ')[1]?.charAt(0).toUpperCase()

const getColorByName = name => {
 if (['A', 'N', 'H', 'L', 'Q'].includes(getCharAtName(name))) return 'success'
 if (['F', 'G', 'T', 'I', 'J'].includes(getCharAtName(name))) return 'blue'
 if (['K', 'D', 'Y', 'B', 'O'].includes(getCharAtName(name))) return 'orange'
 if (['P', 'E', 'R', 'S', 'U'].includes(getCharAtName(name))) return 'bronze'
 if (['V', 'W', 'X', 'M', 'Z'].includes(getCharAtName(name))) return 'burnIn'
 return 'default'
}

const CustomAvatar = forwardRef(({ color, name = '', justName, BadgeProps, children, typography = TYPOGRAPHY.H3, extension, inTableList = false, sx, ...other }, ref) => {
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const charAtName = getCharAtSecondName(name) ? getCharAtName(name) + getCharAtSecondName(name) : getCharAtName(name)

 const colorByName = getColorByName(name)
 const colr = color || colorByName

 const renderContent =
  colr === 'default' ? (
   <Avatar
    ref={ref}
    sx={{
     color: theme.palette[colr]?.contrastText,
     backgroundColor: theme.palette.primary.light,
     fontWeight: theme.typography.fontWeightBold,
     ...sx
    }}
    {...other}>
    {justName ? <Typography variant={TYPOGRAPHY.H0}>{name && charAtName}</Typography> : <Typography variant={typography}>{name && charAtName}</Typography>}
    {extension}
    {children}
   </Avatar>
  ) : inTableList ? (
   <Avatar
    ref={ref}
    sx={{
     color: theme.palette[colr]?.contrastText,
     backgroundColor: theme.palette[colr]?.main,
     fontWeight: theme.typography.fontWeightBold,
     width: isDesktop ? 24 : 20,
     height: isDesktop ? 24 : 20,
     ...sx
    }}
    {...other}>
    {justName ? <Typography variant={TYPOGRAPHY.H0}>{name && charAtName}</Typography> : <Typography variant={typography}>{name && charAtName}</Typography>}
    {children}
   </Avatar>
  ) : (
   <Avatar
    ref={ref}
    sx={{
     color: theme.palette[colr]?.contrastText,
     backgroundColor: theme.palette[colr]?.main,
     fontWeight: theme.typography.fontWeightBold,
     ...sx
    }}
    {...other}>
    {justName ? <Typography variant={TYPOGRAPHY.H0}>{name && charAtName}</Typography> : <Typography variant={typography}>{name && charAtName}</Typography>}
    {children}
   </Avatar>
  )

 return BadgeProps ? (
  <Badge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} {...BadgeProps}>
   {renderContent}
  </Badge>
 ) : (
  renderContent
 )
})

CustomAvatar.propTypes = {
 sx: PropTypes.object,
 name: PropTypes.string,
 justName: PropTypes.bool,
 extension: PropTypes.string,
 children: PropTypes.node,
 BadgeProps: PropTypes.object,
 typography: PropTypes.string,
 inTableList: PropTypes.bool,
 isOnline: PropTypes.bool,
 onlineUsers: PropTypes.any,
 userId: PropTypes.string,
 color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'])
}

export default CustomAvatar
