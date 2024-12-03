import PropTypes from 'prop-types'
import { t as trans } from 'i18next'
import { useSettingContext, ICON_NAME } from 'hook'
import { useMediaQuery, Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledSupportCard, GStyledListItemText, GStyledSpanBox, GStyledSupportStatusFieldChip } from 'theme/style'
import { IconTooltip } from 'component'
import { GLOBAL } from 'config/global'
import { LABEL, TYPOGRAPHY, KEY, FLEX, SIZE } from 'constant'
import { normalizer } from 'util/format'

const TicketCard = ({ selectedCardId, value, handleMachineTicketCard, t }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

 const openInNewPage = jiraKey => {
  const url = GLOBAL.JIRA_URL + jiraKey
  window.open(url, KEY.BLANK)
 }

 return (
  <GStyledSupportCard onClick={event => handleMachineTicketCard(event, t.key)} selectedCardId={selectedCardId} s={t} mode={themeMode}>
   <Grid item xs={10}>
    <Box height={90}>
     <GStyledListItemText
      primary={
       t && (
        <GStyledSpanBox>
         <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'} variant={isDesktop ? TYPOGRAPHY.H5 : TYPOGRAPHY.H6} sx={{ opacity: selectedCardId === t.key ? 0.7 : 1 }}>
          {value?.key}
         </Typography>
        </GStyledSpanBox>
       )
      }
      secondary={
       <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
        {trans('assignee.label')}: {value?.assigneeName}
       </Typography>
      }
      pb={1}
     />
     <Box mt={2}>
      <GStyledSupportStatusFieldChip
       status={normalizer(value?.status)}
       mode={themeMode}
       label={<Typography variant={isDesktop ? TYPOGRAPHY.OVERLINE2 : TYPOGRAPHY.OVERLINE_MINI}>{value?.status}</Typography>}
       size={SIZE.SMALL}
      />
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
 handleMachineTicketCard: PropTypes.func,
 contact: PropTypes.any,
 t: PropTypes.any
}

export default TicketCard
