import { Fragment, useState, useEffect, useLayoutEffect } from 'react'
import { t } from 'i18next'
import _ from 'lodash'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useAuthContext } from 'auth/use-auth-context'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { getCustomer, setChangePasswordDialog, resetCustomer } from 'store/slice'
import { useSettingContext, snack, Icon, ICON_NAME, useResponsive } from 'hook'
import { PATH_AUTH, PATH_SECURITY } from 'route/path'
import { Box, Divider, Dialog, Typography, Stack, MenuItem, Link } from '@mui/material'
import { CustomAvatar, MenuPopover, IconButtonAnimate, ChangePasswordDialog, DisplayDialog } from 'component'
import { themePreset } from 'theme'
import { RADIUS } from 'config/layout'
import { TYPOGRAPHY } from 'constant'
import { isCustomerAdmin, isSuperAdmin } from 'util'
import { OPTION } from './util'
import LanguagePopover from './language-popover'

export default function AccountPopover() {
    const { user, logout } = useAuthContext()
    const { customer } = useSelector(state => state.customer)
    const navigate = useNavigate()
    const customerId = user?.customer
    const isMobile = useResponsive('down', 'sm')

    const [openPopover, setOpenPopover] = useState(null)
    const [open, setOpen] = useState(false)
    const { themeMode, themeLayout, themeStretch, themeContrast, themeDirection, themeColorPreset, onResetSetting } = useSettingContext()

    useEffect(() => {
        const debounce = _.debounce(() => {
            dispatch(getCustomer(customerId))
        }, 300)
        debounce()
        return () => debounce.cancel()
    }, [dispatch])

    useLayoutEffect(() => {
        dispatch(resetCustomer())
    }, [dispatch])

    const handleOpenPopover = event => {
        setOpenPopover(event.currentTarget)
    }

    const handleClosePopover = () => {
        setOpenPopover(null)
    }

    const handleChangePassword = () => {
        dispatch(setChangePasswordDialog(true))
    }

    const handleLogout = async () => {
        try {
            logout()
            snack(t('responses.success.logged_out'), { variant: 'success' })
            handleClosePopover()
        } catch (error) {
            console.error(error)
            snack(t('responses.error.unable_logout'), { variant: 'error' })
        }
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
                            borderRadius: RADIUS.CHIP.borderRadius,
                            position: 'absolute'
                        }
                    })
                }}>
                <CustomAvatar /**src={mockUser[0]?.photoURL}  */ typography={TYPOGRAPHY.H4} alt={'display name'} name={customer?.name} />
            </IconButtonAnimate>

            <MenuPopover
                open={openPopover}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                sx={{ width: 200, p: 0, ...RADIUS.BORDER }}>
                <Box sx={{ my: 1.5, px: 2.5, overflowX: 'hidden', mr: 1.5 }}>
                    <Typography variant={TYPOGRAPHY.SUBTITLE2} noWrap>
                        {customer?.name || 'Organization'}
                    </Typography>
                    <Typography variant={isMobile ? TYPOGRAPHY.CAPTION : TYPOGRAPHY.OVERLINE} sx={{ color: 'text.secondary' }} fontWeight='bold' noWrap>
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
                    <MenuItem onClick={handleChangePassword}>{t('change_password.label')}</MenuItem>
                    {isCustomerAdmin(user) || isSuperAdmin(user) && (
                        <Fragment>
                            <Divider />
                            <MenuItem onClick={() => handleClickItem(PATH_AUTH.userInvite)}>
                                <Link underline='none' color='inherit' component={RouterLink}>
                                    {t('invite_user.label')}
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={() => handleClickItem(PATH_SECURITY.users.list)}>
                                <Link underline='none' color='inherit' component={RouterLink}>
                                    {t('users_list.label')}
                                </Link>
                            </MenuItem>
                        </Fragment>
                    )}
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
                    {/* disable for the meantime */}
                    {/* <LanguagePopover /> */}
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
            <ChangePasswordDialog />
        </Fragment>
    )
}
