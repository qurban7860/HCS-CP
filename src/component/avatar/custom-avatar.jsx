import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { Badge, Avatar, Typography } from '@mui/material'
import { TYPOGRAPHY } from 'constant'

const getCharAtName = (name) => name && name.charAt(0).toUpperCase()
const getCharAtSecondName = (name) => name && name.split(' ')[1]?.charAt(0).toUpperCase()

const getColorByName = (name) => {
  if (['A', 'N', 'H', 'L', 'Q'].includes(getCharAtName(name))) return 'primary'
  if (['F', 'G', 'T', 'I', 'J'].includes(getCharAtName(name))) return 'info'
  if (['K', 'D', 'Y', 'B', 'O'].includes(getCharAtName(name))) return 'success'
  if (['P', 'E', 'R', 'S', 'U'].includes(getCharAtName(name))) return 'warning'
  if (['V', 'W', 'X', 'M', 'Z'].includes(getCharAtName(name))) return 'error'
  return 'default'
}

const CustomAvatar = forwardRef(({ color, name = '', justName, BadgeProps, children, extension, sx, ...other }, ref) => {
  const theme = useTheme()

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
        {justName ? <Typography variant={TYPOGRAPHY.H0}>{name && charAtName}</Typography> : name && charAtName}

        {extension}
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
        {justName ? <Typography variant={TYPOGRAPHY.H0}>{name && charAtName}</Typography> : name && charAtName}
        {children}
      </Avatar>
    )

  return BadgeProps ? (
    <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} {...BadgeProps}>
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
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'])
}

export default CustomAvatar
