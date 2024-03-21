import { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { alpha, useTheme } from '@mui/material/styles'

import { Box, Divider, Dialog, Typography, Stack, MenuItem, Link } from '@mui/material'
// import { useAuthContext } from 'auth'
import { CustomAvatar } from 'component/avatar'
import { useSnackbar } from 'component/snackbar'
import { MenuPopover } from 'component/menu-popover'
import { IconButtonAnimate } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { DisplayDialog } from '../../../component/setting/display/display-dialog'
import { useIcon, ICON_NAME } from 'hook'
import { bgBlur } from 'theme/style'
import { themePreset } from 'theme'
import { TITLE } from 'constant'
import { OPTION } from './util'
import { mockUser } from '_mock'

export default function AccountPopover() {
  const navigate = useNavigate()
  // const { user, logout } = useAuthContext()
  const email = localStorage.getItem('email')
  const displayName = localStorage.getItem('name')
  const [openPopover, setOpenPopover] = useState(null)
  const [open, setOpen] = useState(false)
  const { Icon: WebIcon, iconSrc: refreshSrc } = useIcon(ICON_NAME.REFRESH)
  const { iconSrc: closeSrc } = useIcon(ICON_NAME.CLOSE)

  const { enqueueSnackbar } = useSnackbar()

  const { themeMode, themeLayout, themeStretch, themeContrast, themeDirection, themeColorPreset, onResetSetting } = useSettingContext()

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = () => {
    setOpenPopover(null)
  }

  const handleLogout = async () => {
    try {
      logout()
      handleClosePopover()
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Unable to logout', { variant: 'error' })
    }
  }

  const handleToggle = () => {
    setOpen(!open)
    handleClosePopover()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickItem = (path) => {
    handleClosePopover()
    navigate(path || setOpen(!open))
  }

  const notDefault =
    themeMode !== themePreset.themeMode ||
    themeLayout !== themePreset.themeLayout ||
    themeStretch !== themePreset.themeStretch ||
    themeContrast !== themePreset.themeContrast ||
    themeDirection !== themePreset.themeDirection ||
    themeColorPreset !== themePreset.themeColorPreset

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
            },
          }),
        }}
      >
        <CustomAvatar src={mockUser[0]?.photoURL} alt={mockUser[0]?.displayName} name={mockUser[0]?.displayName} />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{
          width: 200,
          p: 0,
          borderRadius: 0.4,
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {mockUser[0].displayName || displayName}
            {displayName}
          </Typography>
          <Typography variant="overline" sx={{ color: 'text.secondary' }} fontWeight="bold" noWrap>
            {mockUser[0]?.login || mockUser[0]?.email}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'solid' }} />
        <Stack sx={{ p: 1 }}>
          {OPTION.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              <Link underline="none" color="inherit" to={option.linkTo} component={RouterLink}>
                {option.label}
              </Link>
            </MenuItem>
          ))}
          <MenuItem
            onClick={() => {
              // handleToggle()
            }}
            onClose={handleClose}
          >
            <Typography variant="body2" noWrap>
              {TITLE.ORGANIZATION}
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleToggle()
            }}
            onClose={handleClose}
          >
            <Typography variant="body2" noWrap>
              {TITLE.DISPLAY_SETTING}
            </Typography>
          </MenuItem>
        </Stack>

        <Divider />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          {TITLE.LOGOUT}
        </MenuItem>
      </MenuPopover>
      <>
        {!open && <Dialog open={open} notDefault={notDefault} onToggle={handleToggle} />}
        <DisplayDialog open={open} handleClose={handleClose} onResetSetting={onResetSetting} />
      </>
    </>
  )
}
