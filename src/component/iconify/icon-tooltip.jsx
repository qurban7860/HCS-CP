import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useIcon, useSettingContext } from 'hook'
import { Button, alpha, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTooltip } from 'theme/style'
import { ICON, RADIUS } from 'config/layout'
import { KEY, LABEL, VARIANT } from 'constant'

const { TOOLTIP } = ICON

export default function IconTooltip({
 onDelete,
 iconOnly = false,
 isActiveIcon = false,
 onClick,
 color = '#1976D2',
 textColor,
 buttonColor,
 tooltipColor,
 tooltipTextColor,
 variant,
 title,
 placement = 'top',
 size = "medium",
 icon,
 disabled,
 dimension = TOOLTIP,
 noHoverAction,
 cursor = false,
 noTitle,
 alongTab,
 ...others
}) {
 const { Icon, iconSrc } = useIcon(icon)
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const disabledColor = themeMode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[700]
 const disabledHoverColor = themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[700]

 const convertToAlpha = color => {
  return alpha(color, 0.5)
 }

 return (
  <Fragment>
   {disabled && !iconOnly ? (
    <Button variant={VARIANT.FILLED} sx={{ cursor: 'default', color, borderColor: disabledColor, ':hover': { borderColor: convertToAlpha(color, 0.5) } }}>
     <GStyledTooltip title={title} placement={placement} disableFocusListener tooltipcolor={disabledColor} color={theme.palette.grey[400]}>
      <Icon color={disabledColor} sx={{ height: dimension, width: dimension, ':hover': { color: disabledHoverColor } }} icon={iconSrc} />
     </GStyledTooltip>
    </Button>
   ) : iconOnly && !disabled ? (
    <GStyledTooltip title={title} placement={placement} disableFocusListener tooltipcolor={tooltipColor} color={color} tooltipTextColor={tooltipTextColor} green={isActiveIcon}>
     <Icon
      color={color}
      sx={{
       height: dimension,
       width: dimension,
       margin: 0.5,
       cursor: cursor ? 'pointer' : 'arrow',
       ':hover': { color: noHoverAction ? color : convertToAlpha(color, 0.5), borderRadius: RADIUS.CHIP.borderRadius }
      }}
      icon={iconSrc}
      onClick={onClick}
     />
    </GStyledTooltip>
   ) : iconOnly && disabled ? (
    <GStyledTooltip title={title || LABEL.NO_PROVIDED} placement={placement} disableFocusListener tooltipcolor={disabledColor} color={disabledColor} green={isActiveIcon} disabled={disabled}>
     <Icon
      color={disabledColor}
      sx={{
       height: dimension,
       width: dimension,
       margin: 0.5,
       cursor: cursor ? 'pointer' : 'arrow'
      }}
      icon={iconSrc}
      disabled={disabled}
     />
    </GStyledTooltip>
   ) : alongTab ? (
    <GStyledTooltip title={title} placement={placement} disableFocusListener tooltipcolor={color} color={color} green={isActiveIcon}>
     <IconButton
      sx={{
       color: 'red',
       borderColor: 'red',
       ':hover': { borderColor: convertToAlpha(color, 0.5) }
      }}>
      <Icon
       color={color}
       sx={{
        height: dimension,
        width: dimension,
        margin: 0.5,
        cursor: cursor ? 'pointer' : 'arrow',
        ':hover': { color: noHoverAction ? color : convertToAlpha(color, 0.5), borderRadius: RADIUS.CHIP.borderRadius }
       }}
       icon={iconSrc}
       onClick={onClick}
      />
     </IconButton>
    </GStyledTooltip>
   ) : (
     <GStyledTooltip title={title} placement={placement} disableFocusListener tooltipcolor={tooltipColor} color={textColor}>
      <Button
        onClick={onClick}
        variant={variant}
        size={size}
        disabled={disabled}
        sx={{
          cursor: onClick ? 'pointer' : 'default',
          color: textColor,
          backgroundColor: buttonColor,
          ':hover': { backgroundColor: theme.palette.howick.midBlue }
        }}
        {...others}
      >
        <Icon color={color} sx={{ height: dimension, width: dimension }} icon={iconSrc} />
      </Button>
     </GStyledTooltip>
   )}
  </Fragment>
 )
}

IconTooltip.propTypes = {
 onDelete        : PropTypes.bool,
 disabled        : PropTypes.bool,
 onClick         : PropTypes.func,
 color           : PropTypes.string,
 title           : PropTypes.any,
 textColor       : PropTypes.string,
 tooltipColor    : PropTypes.string,
 tooltipTextColor: PropTypes.string,
 buttonColor     : PropTypes.string,
 placement       : PropTypes.string,
 variant         : PropTypes.string,
 icon            : PropTypes.string,
 iconOnly        : PropTypes.bool,
 isActiveIcon    : PropTypes.bool,
 cursor          : PropTypes.bool,
 alongTab        : PropTypes.bool,
 dimension       : PropTypes.number,
 noHoverAction   : PropTypes.bool,
 noTitle         : PropTypes.bool,
 iconFlexi       : PropTypes.bool,
 iconRaw         : PropTypes.string,
 size            : PropTypes.string
}
