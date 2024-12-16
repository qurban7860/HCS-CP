import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { useTheme } from '@mui/material/styles'
import { StyledBadgeStatus } from './style'

BadgeStatus.propTypes = {
 sx: PropTypes.object,
 size: PropTypes.oneOf(['small', 'medium', 'large']),
 status: PropTypes.oneOf(['away', 'busy', 'unread', 'online', 'offline', 'invisible'])
}

function BadgeStatus({ size = 'medium', status = 'offline', sx }) {
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 return <StyledBadgeStatus mode={themeMode} ownerState={{ status, size }} sx={sx} theme={theme} />
}

export default BadgeStatus
