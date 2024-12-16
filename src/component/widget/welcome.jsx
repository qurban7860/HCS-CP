import { Fragment } from 'react'
import { t } from 'i18next'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useAuthContext } from 'auth/use-auth-context'
import { useSettingContext, Icon, ICON_NAME, useResponsive } from 'hook'
import { useTheme, useMediaQuery, Stack, Box, Grid, Card, Typography } from '@mui/material'
import { SkeletonViewFormField } from 'component'
import { GStyledWelcomeContainerDiv, GStyledWelcomeDescription, GStyledSpanBox, GStyledTopBorderDivider, GCardOption, GStyledNoPaddingChip } from 'theme/style'
import { KEY, TYPOGRAPHY } from 'constant'
import { ASSET } from 'config'
import { isCustomerAdmin } from 'util'

function Welcome({ action, img, customer, isCustomerLoading, customerOnlineUserIds, ...other }) {
 const { customerMachines, isLoading } = useSelector(state => state.machine)
 const { securityUserTotalCount } = useSelector(state => state.user)
 const { user } = useAuthContext()
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const isMobile = useResponsive('down', 'sm')

 const portalSyncedMachines = customerMachines?.filter(machine => machine?.portalKey)

 return (
  <GStyledWelcomeContainerDiv {...other}>
   <Stack
    flexGrow={1}
    sx={{
     textAlign: { xs: KEY.CENTER, md: KEY.LEFT },
     mb: { xs: 5, md: 10 },
     mt: { xs: 0, md: 5 }
    }}>
    <GStyledSpanBox gap={2} my={isMobile ? 0 : 2}>
     <img alt='logo' src={themeMode === KEY.DARK ? ASSET.HOWICK_PORTAL_DARK_2 : ASSET.HOWICK_PORTAL} width={900} style={{ pointerEvents: KEY.NONE }} />
    </GStyledSpanBox>
    <GStyledWelcomeDescription variant={isMobile ? TYPOGRAPHY.BODY1 : TYPOGRAPHY.SUBTITLE0} themeMode={themeMode}>
     {/* {description} */}
    </GStyledWelcomeDescription>
    {action && action}
    <Grid container my={2}>
     <Grid item xs={12} sm={4}>
      <Box m={2}>
       <Card {...GCardOption(themeMode)}>
        <GStyledTopBorderDivider mode={themeMode} />
        <GStyledSpanBox px={2}>
         <Icon icon={ICON_NAME.COMPANY} color={themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[400]} />
         {isCustomerLoading ? (
          () => <SkeletonViewFormField />
         ) : (
          <Typography variant={isDesktop ? TYPOGRAPHY.H3 : TYPOGRAPHY.H4} m={2}>
           {customer.name}
          </Typography>
         )}
        </GStyledSpanBox>
        <Box mb={2}>
         <GStyledSpanBox px={2}>
          {isLoading ? (
           () => <SkeletonViewFormField />
          ) : (
           <Fragment>
            <Icon
             icon={ICON_NAME.FRAMA}
             color={themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[400]}
             sx={{
              width: 15
             }}
            />
            <Typography variant={isDesktop ? TYPOGRAPHY.OVERLINE0 : TYPOGRAPHY.OVERLINE} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} mx={1}>
             {(customerMachines?.length > 1 ? t('machine.machines.label') : t('machine.label')) + ':'}
            </Typography>
            <Typography variant={isDesktop ? TYPOGRAPHY.BODY1 : TYPOGRAPHY.SUBTITLE2} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} mx={1}>
             {customerMachines?.length} {KEY.MACHINES}
            </Typography>
           </Fragment>
          )}
         </GStyledSpanBox>
         <GStyledSpanBox px={2}>
          {isLoading ? (
           () => <SkeletonViewFormField />
          ) : (
           <Fragment>
            <Icon
             icon={ICON_NAME.PORTAL_SYNC}
             color={themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[400]}
             sx={{
              width: 15
             }}
            />
            <Typography variant={isDesktop ? TYPOGRAPHY.OVERLINE0 : TYPOGRAPHY.OVERLINE} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} mx={1}>
             {t('portal_synced.label') + ':'}
            </Typography>
            <Typography variant={isDesktop ? TYPOGRAPHY.BODY1 : TYPOGRAPHY.SUBTITLE2} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} mx={1}>
             {portalSyncedMachines?.length} / {customerMachines?.length} {customerMachines?.length > 1 ? t('machine.machines.label') : t('machine.label')}
            </Typography>
           </Fragment>
          )}
         </GStyledSpanBox>
         {isCustomerAdmin(user) && (
          <GStyledSpanBox px={2}>
           {isLoading ? (
            () => <SkeletonViewFormField />
           ) : (
            <Fragment>
             <Icon icon={ICON_NAME.USERS} color={themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[400]} sx={{ width: 15 }} />
             <Typography variant={isDesktop ? TYPOGRAPHY.OVERLINE0 : TYPOGRAPHY.OVERLINE} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} mx={1}>
              {t(securityUserTotalCount > 1 ? 'user.users.label' : 'user.label') + ':'}
             </Typography>
             <Typography variant={isDesktop ? TYPOGRAPHY.BODY1 : TYPOGRAPHY.SUBTITLE2} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} mx={1}>
              {securityUserTotalCount}
             </Typography>
             <GStyledNoPaddingChip
              bgColor={theme.palette.burnIn.altDark}
              label={
               <GStyledSpanBox>
                {/* <Icon icon={ICON_NAME.ONLINE} sx={{ height: 10, width: 10 }} color={theme.palette.common.white} /> */}
                <Typography variant={TYPOGRAPHY.H6}>{customerOnlineUserIds?.length ? `${customerOnlineUserIds.length} Online` : '1 Online'}</Typography>
               </GStyledSpanBox>
              }
              size={'small'}
             />
            </Fragment>
           )}
          </GStyledSpanBox>
         )}
        </Box>
       </Card>
      </Box>
     </Grid>
    </Grid>
   </Stack>
   {img && img}
  </GStyledWelcomeContainerDiv>
 )
}

Welcome.propTypes = {
 img: PropTypes.node,
 action: PropTypes.node,
 isCustomerLoading: PropTypes.bool,
 title: PropTypes.string,
 description: PropTypes.string,
 customer: PropTypes.object,
 customerOnlineUserIds: PropTypes.any
}

export default Welcome
