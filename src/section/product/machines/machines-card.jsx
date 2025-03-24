import { memo } from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import { useSettingContext, ICON_NAME } from 'hook'
import { Box, Grid, Typography, Link } from '@mui/material'
import { IconTooltip } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledListItemText, GStyledSpanBox, GStyledCard } from 'theme/style'
import { LABEL, TYPOGRAPHY, KEY, FLEX, DECOILER_TYPE_ARR } from 'constant'

const MachinesCard = ({ selectedCardId, handleSelected, handleMachineCard, handleMachineInNewTabCard, machine }) => {
 const theme = useTheme()
 const { themeMode } = useSettingContext()
 return (
  <GStyledCard onClick={event => handleSelected(event, machine?._id)} selectedCardId={selectedCardId} value={machine} mode={themeMode}>
   <Grid item xs={10}>
    <Box height={50}>
     <GStyledListItemText
      primary={
       machine && (
        <GStyledSpanBox>
         <Link
          onClick={event => handleMachineCard(event, machine._id)}
          sx={{
           color: themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange,
           cursor: 'pointer'
          }}>
          <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'} variant={TYPOGRAPHY.H4} sx={{ opacity: selectedCardId === machine._id ? 0.7 : 1 }}>
           {machine?.serialNo}
          </Typography>
         </Link>
         &nbsp;
         <IconTooltip
          onClick={event => handleMachineInNewTabCard(event, machine._id)}
          title={<Trans i18nKey='open_in_new_tab.label' values={{ value: 'Machine' }} />}
          color={theme.palette.grey[500]}
          icon={ICON_NAME.OPEN_IN_NEW}
          placement={KEY.RIGHT}
          dimension={15}
          px={0}
          iconOnly
         />
        </GStyledSpanBox>
       )
      }
      secondary={
       <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
        {machine?.machineModel?.name}
       </Typography>
      }
     />
    </Box>
   </Grid>
   <Grid item xs={2} flex={1} justifyContent={FLEX.FLEX_END} alignContent={KEY.RIGHT}>
    <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
     {DECOILER_TYPE_ARR.some(type => machine?.machineModel?.name?.includes(type)) ? (
      <IconTooltip title={LABEL.DECOILER(machine?.machineModel?.name)} icon={ICON_NAME.DECOILER_DEF} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} iconOnly />
     ) : (
      <IconTooltip title={machine?.machineModel?.name} icon={ICON_NAME.FRAMA} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} iconOnly />
     )}
     {machine?.isActive ? (
      <IconTooltip
       title={LABEL.ACTIVE}
       icon={ICON_NAME.ACTIVE}
       color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
       tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
       buttonColor={themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}
       tooltipTextColor={themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}
       iconOnly
      />
     ) : (
      <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} iconOnly />
     )}
    </GStyledSpanBox>
   </Grid>
  </GStyledCard>
 )
}

MachinesCard.propTypes = {
 selectedCardId: PropTypes.string,
 value: PropTypes.any,
 contact: PropTypes.any,
 machine: PropTypes.any,
 handleSelected: PropTypes.func,
 handleMachineCard: PropTypes.func,
 handleMachineInNewTabCard: PropTypes.func
}

export default memo(MachinesCard)
