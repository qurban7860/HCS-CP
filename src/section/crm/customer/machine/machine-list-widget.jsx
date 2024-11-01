import { Fragment, useState } from 'react'
import { m } from 'framer-motion'
import PropTypes from 'prop-types'
import { useIcon, ICON_NAME, useSettingContext } from 'hook'
import { useSelector } from 'react-redux'
import { Grid, Typography, IconButton, Divider } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'
import { GStyledListItemText, GStyledSpanBox, GStyledTooltip } from 'theme/style'
import { FormHeader, SkeletonViewFormField, IconTooltip } from 'component'
import { PATH_MACHINE } from 'route/path'
import { VARIANT, SIZE, LABEL, KEY, DECOILER_TYPE_ARR, FLEX } from 'constant'

const { TYPOGRAPHY } = VARIANT

const MachineListWidget = ({ value, handleMachineDialog, handleMachineSiteDialog }) => {
 const [loading, setLoading] = useState(false)
 const { customerMachines } = useSelector(state => state.machine)
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 const { Icon: LocIcon, iconSrc } = useIcon(ICON_NAME.DECOILER_DEF)

 const sxProp =
  customerMachines?.length < 5
   ? {}
   : {
      position: 'relative',
      '&::after': {
       content: '""',
       position: 'absolute',
       bottom: 0,
       left: 0,
       width: '100%',
       height: '30px',
       backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.1), ${alpha(theme.palette.grey[500], 0.5)})`
      }
     }

 return (
  <Grid container mb={2}>
   <Grid
    item
    lg={12}
    sm={12}
    mb={2}
    bgcolor='background.paper'
    // TODO:if value?.machines?.length is more than 5, dont add the sx prop

    sx={sxProp}>
    <GStyledSpanBox>
     <FormHeader label={LABEL.MACHINE(value?.machines?.length)} />
    </GStyledSpanBox>
    <Grid
     container
     sx={{
      height: value?.machines.length > 5 ? '600px' : 'auto',
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
                borderRadius: 2,
                m: 0
               }}>
               <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'} variant={TYPOGRAPHY.H4}>
                {mach?.serialNo}
               </Typography>
              </IconButton>
              {DECOILER_TYPE_ARR.some(type => mach?.machineModel?.name?.includes(type)) && (
               <GStyledTooltip title={LABEL.DECOILER_DEF} disableFocusListener placement={KEY.TOP} tooltipcolor={theme.palette.grey[500]} color={theme.palette.grey[500]}>
                <LocIcon icon={iconSrc} color={theme.palette.grey[500]} sx={{ height: 15 }} />
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
           <IconTooltip
            title={LABEL.SITE_VIEW(mach?.serialNo)}
            icon={ICON_NAME.MAP_MARKER}
            dimension={18}
            onClick={e => handleMachineSiteDialog(e, mach._id)}
            color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
            iconOnly
            cursor
           />
           <IconTooltip
            title={LABEL.NAVIGATE_TO(mach?.serialNo)}
            icon={ICON_NAME.OPEN_IN_NEW}
            dimension={18}
            onClick={() => window.open(PATH_MACHINE.machines.view(mach?._id), KEY.BLANK)}
            color={theme.palette.grey[500]}
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
         {index !== customerMachines.length - 1 && <Divider variant='fullWidth' style={{ width: '100%', marginBottom: '10px' }} />}
        </Fragment>
       ))
      ) : loading ? (
       <m.div>
        <SkeletonViewFormField />
       </m.div>
      ) : (
       <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.no'>
        {LABEL.NO_MACHINE_FOUND}
       </Typography>
      )}
     </Grid>
    </Grid>
   </Grid>
  </Grid>
 )
}

MachineListWidget.propTypes = {
 value: PropTypes.object,
 handleMachineDialog: PropTypes.func,
 handleMachineSiteDialog: PropTypes.func
}

export default MachineListWidget
