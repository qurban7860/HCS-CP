import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { alpha, useTheme } from '@mui/material/styles'
import {
  Box,
  Divider,
  Drawer,
  Typography,
  Stack,
  Tooltip,
  MenuItem,
  IconButton,
} from '@mui/material'
import { NAV } from 'config'
import { useAuthContext } from 'auth'
import { CustomAvatar } from 'component/avatar'
import { useSnackbar } from 'component/snackbar'
import { MenuPopover } from 'component/menu-popover'
import { IconButtonAnimate } from 'component/animate'
import {
  Block,
  ModeOption,
  ContrastOption,
  DirectionOption,
  StretchOption,
  ColorPresetOption,
  FullScreenOption,
  LayoutOption,
  SettingDrawer,
} from 'component/setting'
import { bgBlur } from 'theme/style'
import { useSettingContext } from 'component/setting'
import { themePreset } from 'theme'
import { Iconify } from 'component/iconify'
import { Scrollbar } from 'component/scrollbar'
import { TITLE } from 'constant'
import { OPTION } from './util'

const SPACING = 2.5

export default function AccountPopover() {
  const theme = useTheme()
  const navigate = useNavigate()
  // const { user, logout } = useAuthContext()
  const email = localStorage.getItem('email')
  const displayName = localStorage.getItem('name')
  const { enqueueSnackbar } = useSnackbar()
  const [openPopover, setOpenPopover] = useState(null)

  const {
    themeMode,
    themeLayout,
    themeStretch,
    themeContrast,
    themeDirection,
    themeColorPreset,
    onResetSetting,
  } = useSettingContext()

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
      enqueueSnackbar('Unable to logout!', { variant: 'error' })
    }
  }

  const [open, setOpen] = useState(false)

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
        {/* <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} /> */}
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {/* {user?.displayName || displayName} */}
            {displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {/* {user?.login || email} */}
            {'EMAIL'}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'solid' }} />
        <Stack sx={{ p: 1 }}>
          {OPTION.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
          <MenuItem
            onClick={() => {
              handleToggle()
              // SettingsDrawer()
            }}
            onClose={handleClose}
          >
            <Typography variant="body2" noWrap>
              {TITLE.CUSTOMIZE}
            </Typography>
          </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: 'solid' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          {TITLE.LOGOUT}
        </MenuItem>
      </MenuPopover>
      <>
        {!open && <Drawer open={open} notDefault={notDefault} onToggle={handleToggle} />}
        <Drawer
          anchor="left"
          open={open}
          onClose={handleClose}
          BackdropProps={{ invisible: true }}
          PaperProps={{
            sx: {
              ...bgBlur({ color: theme.palette.background.default, opacity: 0.9 }),
              width: NAV.W_BASE,
              boxShadow: `-24px 12px 40px 0 ${alpha(
                theme.palette.mode === 'light'
                  ? theme.palette.grey[500]
                  : theme.palette.common.black,
                0.16
              )}`,
              ...(open && { '&:after': { position: 'relative', zIndex: 9999 } }),
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ py: 2, pr: 1, pl: SPACING }}
          >
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              {TITLE.SETTINGS}
            </Typography>

            <Tooltip title="Reset">
              <Box sx={{ position: 'relative' }}>
                <IconButton onClick={onResetSetting}>
                  <Iconify icon="ic:round-refresh" />
                </IconButton>
              </Box>
            </Tooltip>

            <IconButton onClick={handleClose}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Stack>

          <Divider sx={{ borderStyle: 'solid' }} />

          <Scrollbar sx={{ p: SPACING, pb: 0 }}>
            <Block title={TITLE.MODE}>
              <ModeOption />
            </Block>

            <Block title={TITLE.CONTRAST}>
              <ContrastOption />
            </Block>

            <Block title={TITLE.DIRECTION}>
              <DirectionOption />
            </Block>

            <Block title={TITLE.LAYOUT}>
              <LayoutOption />
            </Block>

            <Block title={TITLE.STRETCH.label} tooltip={TITLE.STRETCH.tooltip}>
              <StretchOption />
            </Block>

            <Block title={TITLE.PRESETS}>
              <ColorPresetOption />
            </Block>
          </Scrollbar>

          <Box sx={{ p: SPACING, pt: 0 }}>
            <FullScreenOption />
          </Box>
        </Drawer>
      </>
    </>
  )
}
