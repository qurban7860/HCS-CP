import { Fragment, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useParams } from 'react-router-dom'
import { Grid, Typography, Box } from '@mui/material'
import { IconTooltip, PopoverCombo } from 'component'
import TabContainer from 'component/tab/TabContainer'
import { useTheme } from '@mui/material/styles'
import { Clock, ICON_NAME, useSettingContext, useUIMorph } from 'hook'
import { TABS } from 'section/product/machine'
import { GStyledHeaderCardContainer, GStyledTopBorderDivider, GStyledSpanBox, GStyledFieldGrid, GStyledTab } from 'theme/style'
import { KEY, LABEL, TYPOGRAPHY, FLEX, FLEX_DIR, DECOILER_TYPE_ARR } from 'constant'
import { NAV } from 'config/layout'
import { truncate } from 'util'
import { a11yProps } from 'util/a11y.js'
import 'swiper/css'
import { useAuthContext } from 'auth/use-auth-context'

const MachineNav = ({ machineData }) => {
    const { user } = useAuthContext()
    const [menuAnchor, setMenuAnchor] = useState(null)
    const { themeMode } = useSettingContext()
    const theme = useTheme()
    const { machineId } = useParams()
    const { isMobile } = useUIMorph()
    const menuOpen = Boolean(menuAnchor)
    const menuId = menuOpen ? 'machine-menu' : undefined

    const tabs = useMemo(() => {
        const allowedModules = user?.modules || []
        const userRoles = user?.roles || []
        const noFilterRoles = ['developer', 'superadmin']

        const shouldFilter = userRoles.some(r => !noFilterRoles.includes(r.name?.toLowerCase()))

        return TABS(machineId)
            .filter(tab => {
                if (!shouldFilter) return true
                return !tab.module || allowedModules.includes(tab.module)
            })
            .map(tab => ({
                ...tab,
                a11yProps: a11yProps(tab.id)
            }))
    }, [machineId, user])

    const toggleMenu = event => { setMenuAnchor(menuAnchor ? null : event.currentTarget) }

    const renderMachineStatusIcons = () => (
        <Grid container justifyContent={FLEX.FLEX_END} gap={isMobile ? 0.5 : 2} sx={{ flexWrap: 'wrap', alignItems: KEY.CENTER }}>
            <Clock city={machineData?.installationSiteCity} country={machineData?.installationSiteCountry} region={machineData?.installationSiteRegion} />
            {machineData?.isPortalSynced && (
                <IconTooltip title={t('portal_synced.label')} icon={ICON_NAME.PORTAL_SYNC} color={theme.palette.howick.bronze} tooltipColor={theme.palette.howick.bronze} dimension={isMobile ? 15 : 20} iconOnly />
            )}
            {DECOILER_TYPE_ARR.some(type => machineData?.machineModel?.includes(type)) ? (
                <IconTooltip
                    title={LABEL.DECOILER(machineData?.machineModel)}
                    icon={ICON_NAME.DECOILER_DEF}
                    color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]}
                    dimension={isMobile ? 15 : 20}
                    iconOnly
                />
            ) : machineData?.machineModel?.includes('3600') ? (
                <IconTooltip title={t('x_tenda.label')} icon={ICON_NAME.RIBBED} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} dimension={isMobile ? 15 : 20} iconOnly />
            ) : null}
            {machineData?.isActive ? (
                <IconTooltip
                    title={LABEL.ACTIVE}
                    icon={ICON_NAME.ACTIVE}
                    color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
                    tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
                    buttonColor={themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}
                    tooltipTextColor={themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}
                    dimension={isMobile ? 15 : 20}
                    iconOnly
                />
            ) : (
                <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} dimension={isMobile ? 15 : 20} iconOnly />
            )}
        </Grid>
    )

    return (
        <Fragment>
            <GStyledHeaderCardContainer height={NAV.H_NAV_DEFAULT}>
                <GStyledTopBorderDivider mode={themeMode} />
                <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN} px={isMobile ? 1 : 1.5}>
                    <Grid container flexDirection={FLEX_DIR.ROW} p={2}>
                        <Grid item xs={12} sm={8} display={FLEX.FLEX} alignItems={KEY.TOP}>
                            <GStyledSpanBox>
                                <GStyledFieldGrid my={1} mode={themeMode} isNoBg isMachineView>
                                    <Typography variant={isMobile ? TYPOGRAPHY.H3 : TYPOGRAPHY.H3}>{truncate(machineData?.serialNo, 5)}</Typography>
                                </GStyledFieldGrid>
                                &nbsp;
                                <Typography variant={isMobile ? TYPOGRAPHY.H5 : TYPOGRAPHY.H3} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.bronze}>
                                    {truncate(machineData?.machineModel, 35)}
                                </Typography>
                            </GStyledSpanBox>
                        </Grid>

                        <Grid item xs={12} sm={4} display={FLEX.FLEX} justifyContent={FLEX.FLEX_END}>
                            {isMobile && (
                                <PopoverCombo withBackButton id={menuId} open={menuOpen} anchorEl={menuAnchor} onClose={toggleMenu} toggleMenu={toggleMenu}>
                                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                                        <TabContainer tabs={tabs} orientation={KEY.VERTICAL} isNotAbsolute />
                                    </Box>
                                </PopoverCombo>
                            )}
                            {renderMachineStatusIcons()}
                        </Grid>
                    </Grid>

                    <Grid container px={2}>
                        <Grid item xs={12} sm={12}>
                            {!isMobile && <TabContainer tabs={tabs} />}
                        </Grid>
                    </Grid>
                </Grid>
            </GStyledHeaderCardContainer>
        </Fragment>
    )
}

MachineNav.propTypes = {
    machineData: PropTypes.object
}

export default MachineNav
