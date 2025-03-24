import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { Box, Grid, Typography, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledListItemText, GStyledSpanBox, GStyledSupportListCard, GStyledSupportStatusFieldChip } from 'theme/style'
import { TYPOGRAPHY, KEY, FLEX, SIZE } from 'constant'
import { normalizer } from 'util/format'
import { truncate } from 'util'

const TicketCard = ({ selectedCardId, handleSelected, handleTicketCard, handleTicketInNewTabCard, ticket, isMachinePage }) => {
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 return (
  <GStyledSupportListCard onClick={event => handleSelected(event, ticket?.key)} selectedCardId={selectedCardId} value={ticket} mode={themeMode}>
   <Grid item xs={9}>
    <Box height={isMachinePage ? 60 : 80}>
     <GStyledListItemText
      primary={
       ticket && (
        <GStyledSpanBox>
         <Link
          typography={TYPOGRAPHY.H5}
          onClick={event => handleTicketCard(event, ticket?.machineSerialNo, ticket?.key)}
          sx={{ color: themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.howick.orange, cursor: 'pointer' }}>
          {ticket?.key}
         </Link>
         &nbsp;
         {/*
          disabled for now; enable once Jira auth is refactored to take customer based token #1629
         <IconTooltip
          title={t('view_jira.view_jira_in_new_tab.label')}
          icon={ICON_NAME.JIRA}
          color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
          dimension={18}
          onClick={() => handleTicketInNewTabCard(ticket?.key)}
         /> */}
        </GStyledSpanBox>
       )
      }
      secondary={
       !isMachinePage && (
        <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
         {ticket?.machineSerialNo}
        </Typography>
       )
      }
     />
     <Typography variant={TYPOGRAPHY.CAPTION} color='text.secondary'>
      {truncate(ticket?.issue, 40)}
     </Typography>
    </Box>
   </Grid>
   <Grid item xs={3} flex={1} justifyContent={FLEX.FLEX_END} alignContent={KEY.RIGHT}>
    <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
     <GStyledSupportStatusFieldChip status={normalizer(ticket?.status)} mode={themeMode} label={<Typography variant={TYPOGRAPHY.OVERLINE_MINI}>{ticket?.status}</Typography>} size={SIZE.SMALL} />
    </GStyledSpanBox>
   </Grid>
  </GStyledSupportListCard>
 )
}

TicketCard.propTypes = {
 selectedCardId: PropTypes.string,
 value: PropTypes.any,
 contact: PropTypes.any,
 ticket: PropTypes.any,
 isMachinePage: PropTypes.bool,
 handleSelected: PropTypes.func,
 handleTicketCard: PropTypes.func,
 handleTicketInNewTabCard: PropTypes.func
}

export default TicketCard
