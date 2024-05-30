import PropTypes from 'prop-types'
import { useIcon, ICON_NAME } from 'hook'
import { Button, alpha } from '@mui/material'
import { GStyledTooltip } from 'theme/style'
import { ICON } from 'config/layout'
import { VARIANT } from 'constant'

const { TOOLTIP } = ICON

export default function IconTooltip({
  onDelete,
  iconOnly = false,
  isActiveIcon = false,
  onClick,
  color,
  title,
  placement,
  icon,
  disabled,
  dimension = TOOLTIP,
  noHoverAction,
  cursor = false
}) {
  const { Icon, iconSrc } = useIcon(icon)

  const convertToAlpha = (color) => {
    return alpha(color, 0.5)
  }

  return (
    <>
      {disabled ? (
        <Button variant={VARIANT.FILLED} sx={{ cursor: 'default', color, borderColor: color, ':hover': { borderColor: convertToAlpha(color, 0.5) } }}>
          <GStyledTooltip title={title} placement={placement} disableFocusListener tooltipcolor={color} color={color}>
            <Icon color={color} sx={{ height: dimension, width: dimension }} icon={iconSrc} />
          </GStyledTooltip>
        </Button>
      ) : iconOnly ? (
        <GStyledTooltip title={title} placement={placement} disableFocusListener tooltipcolor={color} color={color} green={isActiveIcon}>
          <Icon
            color={color}
            sx={{
              height: dimension,
              width: dimension,
              margin: 0.5,
              cursor: cursor ? 'pointer' : 'arrow',
              ':hover': { color: noHoverAction ? color : convertToAlpha(color, 0.5), borderRadius: 1 }
            }}
            icon={iconSrc}
            onClick={onClick}
          />
        </GStyledTooltip>
      ) : (
        <Button
          onClick={onClick}
          variant={VARIANT.FILLED}
          sx={{
            cursor: onClick ? 'pointer' : 'default',
            color,
            borderColor: color,
            ':hover': { borderColor: convertToAlpha(color, 0.5) }
          }}>
          <GStyledTooltip title={title} placement={placement} disableFocusListener tooltipcolor={color} color={color}>
            <Icon color={color} sx={{ height: dimension, width: dimension }} icon={iconSrc} />
          </GStyledTooltip>
        </Button>
      )}
    </>
  )
}

IconTooltip.propTypes = {
  onDelete: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
  title: PropTypes.string,
  placement: PropTypes.string,
  icon: PropTypes.string,
  iconOnly: PropTypes.bool,
  isActiveIcon: PropTypes.bool,
  cursor: PropTypes.bool
}

IconTooltip.defaultProps = {
  placement: 'top',
  color: '#1976d2'
}
