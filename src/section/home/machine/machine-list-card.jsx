import { Fragment } from 'react'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { m } from 'framer-motion'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { Grid, Typography, IconButton, Divider, Box, Card } from '@mui/material'
import { IconTooltip, GridViewTitle, HowickLoader } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledListItemText, GStyledSpanBox, GStyledTooltip, GStyledTopBorderDivider, GCardNoHeightOption } from 'theme/style'
import { PATH_MACHINE } from 'route/path'
import { RADIUS } from 'config/layout'
import { TYPOGRAPHY, SIZE, LABEL, KEY, DECOILER_TYPE_ARR, FLEX } from 'constant'

const MachineListCard = ({ handleMachineDialog, machineTotalCount }) => {
 const { customerMachines, isLoading } = useSelector(state => state.machine)
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 return (
  <Box>
   <Card {...GCardNoHeightOption(themeMode)}>
    <Grid item lg={12} sm={12} bgcolor='background.paper'>
     <GStyledTopBorderDivider mode={themeMode} />
     <Grid container spacing={2} px={1.5}>
      <GridViewTitle title={machineTotalCount > 1 ? t('machine.machines.label') : t('machine.label')} />
      <Grid
       container
       sx={{
        height: machineTotalCount < 5 ? 'auto' : '400px',
        overflow: KEY.AUTO,
        scrollBehavior: 'smooth'
       }}>
       <Grid container p={2}>
        {customerMachines.length > 0 ? (
         customerMachines.map((mach, index) => (
          <Fragment key={index}>
           <Grid item xs={8}>
            <GStyledListItemText
             primary={
              mach && (
               <GStyledSpanBox>
                <IconButton
                 onClick={e => handleMachineDialog(e, mach._id)}
                 size={SIZE.MEDIUM}
                 color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
                 aria-label='view'
                 target={KEY.BLANK}
                 sx={{
                  padding: 0,
                  borderRadius: RADIUS.BORDER.borderRadius,
                  m: 0
                 }}>
                 <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'} variant={TYPOGRAPHY.H4}>
                  {mach?.serialNo}
                 </Typography>
                </IconButton>
                {DECOILER_TYPE_ARR.some(type => mach?.machineModel?.name?.includes(type)) && (
                 <GStyledTooltip title={LABEL.DECOILER_DEF} disableFocusListener placement={KEY.TOP} tooltipcolor={theme.palette.grey[500]} color={theme.palette.grey[500]}>
                  <Icon icon={ICON_NAME.DECOILER_DEF} color={theme.palette.grey[500]} sx={{ height: 15 }} />
                 </GStyledTooltip>
                )}
               </GStyledSpanBox>
              )
             }
             secondary={
              <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
               {mach?.machineModel?.name}
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
           {index !== customerMachines.length - 1 && <Divider variant='fullWidth' style={{ width: '100%', marginBottom: '10px' }} />}
          </Fragment>
         ))
        ) : isLoading ? (
         <m.div>
          <HowickLoader mode={themeMode} height={200} />
         </m.div>
        ) : (
         <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.no'>
          <Trans i18nKey='no_found.label' values={{ value: 'machine' }} />
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

MachineListCard.propTypes = {
 value: PropTypes.object,
 handleMachineDialog: PropTypes.func,
 handleMachineSiteDialog: PropTypes.func,
 machineTotalCount: PropTypes.number
}

export default MachineListCard
