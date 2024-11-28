import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { m } from 'framer-motion'
import { useIcon, Icon, ICON_NAME, useSettingContext } from 'hook'
import { useSelector } from 'react-redux'
import { Grid, Typography, IconButton, Divider, Box, Card } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'
import { GStyledListItemText, GStyledSpanBox, GStyledTooltip, GStyledTopBorderDivider, GStyledScrollableHeightLockGrid, GCardNoHeightOption } from 'theme/style'
import { FormHeader, SkeletonViewFormField, IconTooltip, GridViewTitle } from 'component'
import { PATH_MACHINE } from 'route/path'
import { VARIANT, SIZE, LABEL, KEY, DECOILER_TYPE_ARR, FLEX } from 'constant'
import { truncate } from 'util'

const { TYPOGRAPHY } = VARIANT

const MachineConnectionListCard = ({ value, handleConnectionDialog, handleConnectionNewTab, machineTotalCount }) => {
 const [loading, setLoading] = useState(false)
 const { customerMachines } = useSelector(state => state.machine)
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 const { Icon: LocIcon, iconSrc } = useIcon(ICON_NAME.DECOILER_DEF)

 return (
  <Box>
   <Card {...GCardNoHeightOption(themeMode)}>
    <Grid item lg={12} sm={12} bgcolor='background.default'>
     <GStyledTopBorderDivider mode={themeMode} />
     <Grid container spacing={2} px={1.5}>
      <GridViewTitle title={value?.machineConnection?.length > 1 ? t('connected_machine.connected_machines.label') : t('connected_machine.label')} />
      <Grid
       container
       sx={{
        height: value?.machineConnection?.length < 5 ? 'auto' : '400px',
        overflow: KEY.AUTO,
        scrollBehavior: 'smooth'
       }}>
       <Grid container p={2}>
        {value?.machineConnection?.length > 0 ? (
         value?.machineConnection?.map((mach, index) => (
          <Fragment key={index}>
           <Grid item xs={8}>
            <GStyledListItemText
             primary={
              mach && (
               <GStyledSpanBox>
                <IconButton
                 onClick={e => handleConnectionDialog(e, mach._id)}
                 size={SIZE.MEDIUM}
                 color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
                 aria-label='view'
                 target={KEY.BLANK}
                 sx={{
                  padding: 0,
                  borderRadius: 2,
                  m: 0
                 }}>
                 <Typography color={'grey.600'} variant={TYPOGRAPHY.H3}>
                  {mach?.connectedMachine?.serialNo}
                 </Typography>
                </IconButton>
                {DECOILER_TYPE_ARR.some(type => mach?.connectedMachine?.name?.includes(type)) && (
                 <GStyledTooltip title={LABEL.DECOILER_DEF} disableFocusListener placement={KEY.TOP} tooltipcolor={theme.palette.grey[500]} color={theme.palette.grey[500]}>
                  <Icon icon={ICON_NAME.DECOILER_DEF} color={theme.palette.grey[500]} sx={{ height: 15 }} />
                 </GStyledTooltip>
                )}
               </GStyledSpanBox>
              )
             }
             secondary={
              <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
               {truncate(mach?.connectedMachine?.name, 35)}
              </Typography>
             }
            />
           </Grid>
           <Grid item xs={4} flex={1} justifyContent={KEY.FLEX_END} alignContent={KEY.RIGHT}>
            <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
             {mach?.portalKey && (
              <IconTooltip title={t('portal_synced.label')} icon={ICON_NAME.PORTAL_SYNC} dimension={18} color={theme.palette.howick.bronze} tooltipColor={theme.palette.howick.bronze} iconOnly />
             )}
             <IconTooltip
              title={LABEL.SITE_VIEW(mach?.serialNo)}
              icon={ICON_NAME.MAP_MARKER}
              dimension={18}
              onClick={e => handleConnectionNewTab(e, mach._id)}
              color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
              tooltipColor={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
              iconOnly
              cursor
             />
             <IconTooltip
              title={LABEL.NAVIGATE_TO(mach?.serialNo)}
              icon={ICON_NAME.OPEN_IN_NEW}
              dimension={18}
              onClick={() => window.open(PATH_MACHINE.machines.view(mach?._id), KEY.BLANK)}
              color={theme.palette.grey[500]}
              tooltipColor={theme.palette.grey[500]}
              iconOnly
              cursor
             />
             {mach?.isActive ? (
              <IconTooltip
               title={LABEL.ACTIVE}
               icon={ICON_NAME.ACTIVE}
               color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
               tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
               dimension={18}
               px={0}
               isActiveIcon
               iconOnly
              />
             ) : (
              <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} dimension={18} iconOnly />
             )}
            </GStyledSpanBox>
           </Grid>
           {index !== value?.machineConnection?.length - 1 && <Divider variant='fullWidth' style={{ width: '100%', marginBottom: '10px' }} />}
          </Fragment>
         ))
        ) : value?.parentConnection?.length > 0 ? (
         value?.parentConnection?.map((mach, index) => (
          <Fragment key={index}>
           <Grid item xs={8}>
            <GStyledListItemText
             primary={
              mach && (
               <GStyledSpanBox>
                <IconButton
                 onClick={e => handleConnectionDialog(e, mach.machine._id)}
                 size={SIZE.MEDIUM}
                 color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
                 aria-label='view'
                 target={KEY.BLANK}
                 sx={{
                  padding: 0.5,
                  borderRadius: 2,
                  m: 0
                 }}>
                 <Typography variant={value?.parentConnection?.length > 1 ? TYPOGRAPHY.H4 : TYPOGRAPHY.H3}>{mach?.machine?.serialNo}</Typography>
                </IconButton>

                <GStyledTooltip title={LABEL.PARENT} disableFocusListener placement={KEY.TOP} tooltipcolor={theme.palette.grey[500]} color={theme.palette.grey[500]}>
                 <Icon icon={ICON_NAME.PARENT} color={theme.palette.grey[500]} sx={{ height: 15 }} />
                </GStyledTooltip>
               </GStyledSpanBox>
              )
             }
            />
           </Grid>
           <Grid item xs={4} flex={1} justifyContent={KEY.CENTER} alignContent={KEY.CENTER}>
            <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
             <IconTooltip
              title={LABEL.SITE_VIEW(mach?.machine?.serialNo)}
              icon={ICON_NAME.MAP_MARKER}
              dimension={18}
              //   onClick={e => handleMachineSiteDialog(e, mach.machine._id)}
              color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
              iconOnly
              cursor
             />
             <IconTooltip
              title={LABEL.NAVIGATE_TO(mach?.machine?.serialNo)}
              icon={ICON_NAME.OPEN_IN_NEW}
              onClick={() => window.open(PATH_MACHINE.machines.view(mach?.machine?._id), KEY.BLANK)}
              color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]}
              dimension={18}
              iconOnly
              cursor
             />
             {value?.isActive ? (
              <IconTooltip
               title={LABEL.ACTIVE}
               icon={ICON_NAME.ACTIVE}
               color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
               dimension={18}
               px={0}
               isActiveIcon
               iconOnly
              />
             ) : (
              <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} dimension={20} iconOnly />
             )}
            </GStyledSpanBox>
           </Grid>
          </Fragment>
         ))
        ) : loading ? (
         <m.div>
          <SkeletonViewFormField />
         </m.div>
        ) : (
         <Typography variant={TYPOGRAPHY.OVERLINE1} color='grey.300'>
          <Trans i18nKey='no_found.label' values={{ value: 'Connected Machine' }} />
         </Typography>
        )}
       </Grid>
      </Grid>
     </Grid>
    </Grid>
   </Card>
  </Box>
 )
}

MachineConnectionListCard.propTypes = {
 value: PropTypes.object,
 handleConnectionDialog: PropTypes.func,
 handleConnectionNewTab: PropTypes.func,
 machineTotalCount: PropTypes.number
}

export default MachineConnectionListCard
