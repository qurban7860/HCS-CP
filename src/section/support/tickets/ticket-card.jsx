import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSettingContext, ICON_NAME } from 'hook'
import { Box, Grid, Typography, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledListItemText, GStyledSpanBox, GStyledSupportListCard, GStyledSupportStatusFieldChip } from 'theme/style'
import { IconTooltip } from 'component'
import { TYPOGRAPHY, KEY, FLEX, SIZE } from 'constant'
import { normalizer } from 'util/format'
import { truncate } from 'util'

const TicketCard = ({ selectedCardId, handleSelected, handleTicketCard, handleTicketInNewTabCard, ticket }) => {
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 return (
  <GStyledSupportListCard onClick={event => handleSelected(event, ticket?.key)} selectedCardId={selectedCardId} value={ticket} mode={themeMode}>
   <Grid item xs={9}>
    <Box height={70}>
     <GStyledListItemText
      primary={
       ticket && (
        <GStyledSpanBox>
         <Link
          onClick={event => handleTicketCard(event, ticket?.machineSerialNo, ticket?.key)}
          sx={{ color: themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange, cursor: 'pointer' }}>
          <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'} variant={TYPOGRAPHY.H4} sx={{ opacity: selectedCardId === ticket?.id ? 0.7 : 1 }}>
           {ticket?.key}
          </Typography>
         </Link>
         &nbsp;
         <IconTooltip
          title={t('view_jira_in_new_tab.label')}
          icon={ICON_NAME.JIRA}
          color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
          dimension={18}
          onClick={() => handleTicketInNewTabCard(ticket?.key)}
         />
        </GStyledSpanBox>
       )
      }
      secondary={
       <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
        {ticket?.machineSerialNo}
       </Typography>
      }
     />
     <Typography variant={TYPOGRAPHY.CAPTION} color='text.secondary'>
      {truncate(ticket?.issue, 40)}
     </Typography>
    </Box>
   </Grid>
   <Grid item xs={3} flex={1} justifyContent={FLEX.FLEX_END} alignContent={KEY.RIGHT}>
    <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
     <GStyledSupportStatusFieldChip status={normalizer(ticket?.status)} mode={themeMode} label={<Typography variant={TYPOGRAPHY.CAPTION}>{ticket?.status}</Typography>} size={SIZE.SMALL} />
    </GStyledSpanBox>
   </Grid>
  </GStyledSupportListCard>
 )
}

TicketCard.propTypes = {
 selectedCardId: PropTypes.number,
 value: PropTypes.any,
 contact: PropTypes.any,
 ticket: PropTypes.any,
 handleSelected: PropTypes.func,
 handleTicketCard: PropTypes.func,
 handleTicketInNewTabCard: PropTypes.func
}

export default TicketCard
