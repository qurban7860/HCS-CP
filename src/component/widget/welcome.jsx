import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useSettingContext, Icon, ICON_NAME } from 'hook'
import { useTheme, Stack, Box, Grid, Card, Typography } from '@mui/material'
import { SkeletonViewFormField } from 'component'
import { GStyledWelcomeContainerDiv, GStyledWelcomeDescription, GStyledSpanBox, GStyledTopBorderDivider, GCardOption } from 'theme/style'
import { KEY, TYPOGRAPHY } from 'constant'
import { ASSET } from 'config'
import { t } from 'i18next'

function Welcome({ title, description, action, img, customer, ...other }) {
 const { customerMachines, isLoading } = useSelector(state => state.machine)
 const { themeMode } = useSettingContext()
 const theme = useTheme()

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
    <GStyledSpanBox gap={2} my={2}>
     <img alt='logo' src={themeMode === KEY.DARK ? ASSET.HOWICK_PORTAL_DARK_2 : ASSET.HOWICK_PORTAL} width={900} style={{ pointerEvents: KEY.NONE }} />
    </GStyledSpanBox>
    <GStyledWelcomeDescription variant={TYPOGRAPHY.SUBTITLE0} themeMode={themeMode}>
     {description}
    </GStyledWelcomeDescription>
    {action && action}
    <Grid container my={2}>
     <Grid item xs={12} sm={4}>
      <Box m={2}>
       <Card {...GCardOption(themeMode)}>
        <GStyledTopBorderDivider mode={themeMode} />
        <GStyledSpanBox px={2}>
         <Icon icon={ICON_NAME.COMPANY} color={themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[400]} />
         <Typography variant={TYPOGRAPHY.H3} m={2}>
          {customer?.name}
         </Typography>
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
            <Typography variant={TYPOGRAPHY.OVERLINE0} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} mx={1}>
             {(customerMachines?.length > 1 ? t('machine.machines.label') : t('machine.label')) + ':'}
            </Typography>
            <Typography variant={TYPOGRAPHY.BODY1} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} mx={1}>
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
            <Typography variant={TYPOGRAPHY.OVERLINE0} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} mx={1}>
             {t('portal_synced.label') + ':'}
            </Typography>
            <Typography variant={TYPOGRAPHY.BODY1} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} mx={1}>
             {portalSyncedMachines?.length} / {customerMachines?.length} {customerMachines?.length > 1 ? t('machine.machines.label') : t('machine.label')}
            </Typography>
           </Fragment>
          )}
         </GStyledSpanBox>
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
 title: PropTypes.string,
 description: PropTypes.string,
 customer: PropTypes.object
}

export default Welcome
