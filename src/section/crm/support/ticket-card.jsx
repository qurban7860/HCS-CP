import PropTypes from 'prop-types'
import { useSettingContext, ICON_NAME } from 'hook'
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledListItemText, GStyledSpanBox, GStyledSupportStatusFieldChip, GStyledSupportCard } from 'theme/style'
import { IconTooltip, SvgColor } from 'component'
import { GLOBAL } from 'config/global'
import { LABEL, TYPOGRAPHY, KEY, FLEX, SIZE } from 'constant'
import { normalizer } from 'util/format'

const TicketCard = ({ selectedCardId, value, handleCustomerTicketCard, t }) => {
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 const openInNewPage = jiraKey => {
  const url = GLOBAL.JIRA_URL + jiraKey
  window.open(url, KEY.BLANK)
 }

 return (
  <GStyledSupportCard onClick={event => handleCustomerTicketCard(event, t.key)} selectedCardId={selectedCardId} s={t} mode={themeMode}>
   <Grid item xs={10}>
    <Box height={80}>
     <GStyledListItemText
      primary={
       t && (
        <GStyledSpanBox>
         <Typography
          color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'}
          variant={TYPOGRAPHY.H5}
          sx={{
           opacity: selectedCardId === t.key ? 0.7 : 1
          }}>
          {value?.key}
         </Typography>
        </GStyledSpanBox>
       )
      }
      secondary={
       <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
        Assignee: {value?.assigneeName}
       </Typography>
      }
      pb={1}
     />
     <Box mt={2}>
      <GStyledSupportStatusFieldChip status={normalizer(value?.status)} mode={themeMode} label={<Typography variant={TYPOGRAPHY.OVERLINE2}>{value?.status}</Typography>} size={SIZE.SMALL} />
     </Box>
    </Box>
   </Grid>
   <Grid item xs={2} flex={1} justifyContent={FLEX.FLEX_END} alignContent={KEY.RIGHT}>
    <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
     <IconTooltip
      title={LABEL.VIEW_IN_JIRA}
      icon={ICON_NAME.JIRA}
      color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
      dimension={18}
      onClick={() => openInNewPage(t.key)}
     />
    </GStyledSpanBox>
   </Grid>
  </GStyledSupportCard>
 )
}

TicketCard.propTypes = {
 selectedCardId: PropTypes.any,
 value: PropTypes.any,
 handleContactCard: PropTypes.func,
 contact: PropTypes.any,
 handleCustomerTicketCard: PropTypes.func,
 t: PropTypes.any
}

export default TicketCard
