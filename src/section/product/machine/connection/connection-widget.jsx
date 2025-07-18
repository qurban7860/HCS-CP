import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Icon, ICON_NAME } from 'hook'
import { dispatch } from 'store'
import { getMachineSiteDialogData, getSite, setMachineDialog, setMachineSiteDialog, resetMachineSiteDialogData } from 'store/slice'
import { Grid, Typography, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTooltip } from 'theme/style'
import { useSettingContext } from 'hook'
import { FormHeader, IconTooltip } from 'component'
import { PATH_MACHINE } from 'route/path'
import { GStyledListItemText, GStyledSpanBox } from 'theme/style'
import { RADIUS } from 'config/layout'
import { TYPOGRAPHY, SIZE, LABEL, KEY, FLEX } from 'constant'
import { truncate } from 'util/truncate'

const MachineConnectionWidget = ({ value, handleConnectedMachineDialog }) => {
 const { customer } = useSelector(state => state.customer)
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 useEffect(() => {
  dispatch(setMachineDialog(false))
 }, [dispatch])

 const handleMachineSiteDialog = (event, machineId) => {
  event.preventDefault()
  dispatch(resetMachineSiteDialogData())
  dispatch(getMachineSiteDialogData(machineId))
  dispatch(getSite(customer?._id, customer?.mainSite?._id))
  dispatch(setMachineSiteDialog(true))
 }

 return (
  <Grid container mb={2}>
   <Grid item lg={12} sm={12} mb={2} bgcolor='background.paper'>
    <FormHeader label={LABEL.CONNECTED_MACHINE(value?.machineConnection)} />
    <Grid container p={2}>
     {value?.machineConnection?.length > 0 ? (
      value?.machineConnection?.map((mach, index) => (
       <Fragment key={index}>
        <Grid item xs={8}>
         <GStyledListItemText
          primary={
           mach &&
           mach.connectedMachine &&
           mach.connectedMachine.name && (
            <GStyledSpanBox>
             <IconButton
              onClick={e => handleConnectedMachineDialog(e, mach.connectedMachine._id)}
              size={SIZE.MEDIUM}
              color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
              aria-label='view'
              target={KEY.BLANK}
              sx={{
               padding: 0.5,
               borderRadius: RADIUS.BORDER.borderRadius,
               m: 0
              }}>
              <Typography color={themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.common.white} variant={value?.machineConnection?.length > 1 ? TYPOGRAPHY.H4 : TYPOGRAPHY.H3}>
               {truncate(mach?.connectedMachine?.serialNo, 35)}
              </Typography>
             </IconButton>
             <GStyledTooltip title={LABEL.DECOILER_DEF} disableFocusListener placement={KEY.TOP} tooltipcolor={theme.palette.grey[500]} color={theme.palette.grey[500]}>
              <Icon icon={ICON_NAME.DECOILER_DEF} color={theme.palette.grey[500]} sx={{ height: 15 }} />
             </GStyledTooltip>
            </GStyledSpanBox>
           )
          }
         />
        </Grid>
        <Grid item xs={4} flex={1} justifyContent={KEY.CENTER} alignContent={KEY.CENTER}>
         <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
          <IconTooltip
           title={LABEL.SITE_VIEW(mach?.connectedMachine?.serialNo)}
           icon={ICON_NAME.MAP_MARKER}
           dimension={18}
           onClick={e => handleMachineSiteDialog(e, mach.connectedMachine._id)}
           color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
           iconOnly
           cursor
          />
          <IconTooltip
           title={LABEL.NAVIGATE_TO(mach?.connectedMachine?.serialNo)}
           icon={ICON_NAME.OPEN_IN_NEW}
           dimension={18}
           onClick={() => window.open(PATH_MACHINE.machines.view(mach?.connectedMachine?._id), KEY.BLANK)}
           color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.lightGray}
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
           <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} dimension={18} iconOnly />
          )}
         </GStyledSpanBox>
        </Grid>
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
              onClick={e => handleConnectedMachineDialog(e, mach.machine._id)}
              size={SIZE.MEDIUM}
              color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
              aria-label='view'
              target={KEY.BLANK}
              sx={{
               padding: 0.5,
               borderRadius: RADIUS.BORDER.borderRadius,
               m: 0
              }}>
              <Typography color={themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.common.white} variant={value?.parentConnection?.length > 1 ? TYPOGRAPHY.H4 : TYPOGRAPHY.H3}>
               {mach?.machine?.serialNo}
              </Typography>
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
           onClick={e => handleMachineSiteDialog(e, mach.machine._id)}
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
     ) : (
      <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.no'>
       <Trans i18nKey='no_found.label' values={{ value: 'connected machine' }} />
      </Typography>
     )}
    </Grid>
   </Grid>
  </Grid>
 )
}

MachineConnectionWidget.propTypes = {
 value: PropTypes.object,
 handleConnectedMachineDialog: PropTypes.func,
 handleMachineSiteDialog: PropTypes.func
}

export default MachineConnectionWidget
