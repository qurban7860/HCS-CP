import PropTypes from 'prop-types'
import { useIcon, ICON_NAME } from 'hook'
import { Button, alpha } from '@mui/material'
import { GStyledTooltip } from 'theme/style'
import { ICON } from 'config/layout'

const { TOOLTIP } = ICON

export default function IconTooltip({ onDelete, onClick, color, title, placement, icon, disabled, dimension = TOOLTIP }) {
  const { Icon, iconSrc } = useIcon(icon)

  const convertToAlpha = (color) => {
    return alpha(color, 0.5)
  }

  return (
    <>
      {disabled ? (
        <Button variant="filled" sx={{ cursor: 'default', color, borderColor: color, ':hover': { borderColor: convertToAlpha(color, 0.5) } }}>
          <GStyledTooltip title={title} placement={placement} disableFocusListener tooltipcolor={color} color={color}>
            <Icon color={color} sx={{ height: dimension, width: dimension }} icon={iconSrc} />
          </GStyledTooltip>
        </Button>
      ) : (
        <Button
          onClick={onClick}
          variant="filled"
          sx={{ cursor: onClick ? 'pointer' : 'default', color, borderColor: color, ':hover': { borderColor: convertToAlpha(color, 0.5) } }}>
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
  icon: PropTypes.string
}

IconTooltip.defaultProps = {
  placement: 'top',
  color: '#1976d2'
}
