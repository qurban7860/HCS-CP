import { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useAuthContext } from 'auth'
import { t } from 'i18next'
import { getCustomer } from 'store/slice'
import { dispatch } from 'store'
import { useSettingContext, DisplayDialog, snack, Icon, ICON_NAME } from 'hook'
import { Box, Divider, Dialog, Typography, Stack, MenuItem, Link } from '@mui/material'
import { CustomAvatar, MenuPopover, IconButtonAnimate } from 'component'
import { themePreset } from 'theme'
import { SNACK, COLOR, TYPOGRAPHY } from 'constant'
import { OPTION } from './util'
import LanguagePopover from './language-popover'
import { useSelector } from 'react-redux'

export default function AccountPopover() {
 const { user, logout } = useAuthContext()
 const { customer } = useSelector(state => state.customer)
 const navigate = useNavigate()

 const [openPopover, setOpenPopover] = useState(null)
 const [openLang, setOpenLang] = useState(false)
 const [open, setOpen] = useState(false)
 const { themeMode, themeLayout, themeStretch, themeContrast, themeDirection, themeColorPreset, onResetSetting } = useSettingContext()

 const handleOpenPopover = event => {
  setOpenPopover(event.currentTarget)
 }

 const handleClosePopover = () => {
  setOpenPopover(null)
 }

 useEffect(() => {
  if (user) {
   dispatch(getCustomer(user.customer))
  }
 }, [])

 const handleLogout = async () => {
  try {
   logout()
   snack(SNACK.LOGGED_OUT)
   handleClosePopover()
  } catch (error) {
   console.error(error)
   snack(SNACK.ERROR.UNABLE_LOGOUT, { variant: COLOR.ERROR })
  }
 }

 const handleLang = () => {
  setOpenLang(!openLang)
 }

 const handleCloseLang = () => {
  setOpenLang(false)
 }

 const handleToggle = () => {
  setOpen(!open)
  handleClosePopover()
 }

 const handleClose = () => {
  setOpen(false)
 }

 const handleClickItem = path => {
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
  <Fragment>
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
    <CustomAvatar /**src={mockUser[0]?.photoURL}  */ alt={'display name'} name={user?.displayName} />
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
     <Typography variant={TYPOGRAPHY.SUBTITLE2} noWrap>
      {customer?.name || 'User'}
     </Typography>
     <Typography variant='overline' sx={{ color: 'text.secondary' }} fontWeight='bold' noWrap>
      {user?.email}
     </Typography>
    </Box>
    <Divider sx={{ borderStyle: 'solid' }} />
    <Stack sx={{ p: 1 }}>
     {OPTION(user).map(option => (
      <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
       <Link underline='none' color='inherit' to={option.linkTo} component={RouterLink}>
        {option.label}
       </Link>
      </MenuItem>
     ))}
     <Divider />
     <MenuItem
      onClick={() => {
       handleToggle()
      }}
      onClose={handleClose}>
      <Typography variant={TYPOGRAPHY.BODY2} noWrap>
       {t('display_settings.label')}
      </Typography>
     </MenuItem>
     <LanguagePopover />
    </Stack>
    <Divider />

    <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
     <Icon icon={ICON_NAME.LOGOUT} />
     <Typography variant={TYPOGRAPHY.BODY2} noWrap>
      {t('logout.label')}
     </Typography>
    </MenuItem>
   </MenuPopover>
   <Fragment>
    {!open && <Dialog open={open} notDefault={notDefault} onToggle={handleToggle} />}
    <DisplayDialog open={open} handleClose={handleClose} onResetSetting={onResetSetting} />
   </Fragment>
  </Fragment>
 )
}
