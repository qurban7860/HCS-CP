import PropTypes from 'prop-types'
import { IconButton } from '@mui/material'
import { useResponsive } from 'hook'
import { NAV } from 'global'
import { Iconify } from 'component/iconify'
import { useSettingsContext } from 'component/setting'

NavToggleButton.propTypes = {
  sx: PropTypes.object,
}

export default function NavToggleButton({ sx, ...other }) {
  const { themeLayout, onToggleLayout } = useSettingsContext()

  const isDesktop = useResponsive('up', 'lg')

  if (!isDesktop) {
    return null
  }

  return (
    <IconButton
      size="small"
      onClick={onToggleLayout}
      sx={{
        p: 0.5,
        top: 32,
        // transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1) !important',
        position: 'fixed',
        left: NAV.W_DASHBOARD - 12,
        bgcolor: 'background.default',
        zIndex: (theme) => theme.zIndex.appBar + 1,
        border: (theme) => `solid 1px ${theme.palette.divider}`,
        '&:hover': {
          bgcolor: 'background.default',
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify
        width={16}
        icon={themeLayout === 'vertical' ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'}
      />
    </IconButton>
  )
}
