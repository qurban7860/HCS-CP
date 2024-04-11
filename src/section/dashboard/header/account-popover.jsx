import { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { alpha, useTheme } from '@mui/material/styles'
import { Box, Divider, Dialog, Typography, Stack, MenuItem, Link } from '@mui/material'
import { useAuthContext } from 'auth'
import { CustomAvatar } from 'component/avatar'
import { MenuPopover } from 'component/menu-popover'
import { IconButtonAnimate } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { DisplayDialog } from '../../../component/setting/display/display-dialog'
import { useSnackbar } from 'hook'
import { themePreset } from 'theme'
import { TITLE } from 'constant'
import { OPTION } from './util'
import { mockUser } from '_mock'

export default function AccountPopover() {
  const navigate = useNavigate()
  const { user, logout } = useAuthContext()
  // const { user } = useSelector((state) => state.auth)
  const email = localStorage.getItem('user')

  const [openPopover, setOpenPopover] = useState(null)
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { themeMode, themeLayout, themeStretch, themeContrast, themeDirection, themeColorPreset, onResetSetting } = useSettingContext()

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = () => {
    setOpenPopover(null)
  }

  const handleLogout = async () => {
    enqueueSnackbar('Logging out...')
    try {
      logout()
      enqueueSnackbar('Logged out')
      handleClosePopover()
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Unable to logout')
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
    console.log('USer:', user)
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
              position: 'absolute'
            }
          })
        }}>
        <CustomAvatar /**src={mockUser[0]?.photoURL}  */ alt={mockUser[0]?.name} name={user?.displayName} />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        sx={{
          width: 200,
          p: 0,
          borderRadius: 0.4
        }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName || 'User'}
          </Typography>
          <Typography variant="overline" sx={{ color: 'text.secondary' }} fontWeight="bold" noWrap>
            {user?.email}
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
            onClose={handleClose}>
            <Typography variant="body2" noWrap>
              {TITLE.ORGANIZATION}
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleToggle()
            }}
            onClose={handleClose}>
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
