import { Fragment, useState } from 'react'
import { m } from 'framer-motion'
import { t } from 'i18next'
import PropTypes from 'prop-types'
import { useIcon, ICON_NAME, useSettingContext } from 'hook'
import { useSelector } from 'react-redux'
import { Grid, Typography, IconButton, Divider } from '@mui/material'
import { FormHeader, SkeletonViewFormField, IconTooltip } from 'component'
import { useTheme, alpha } from '@mui/material/styles'
import { GStyledListItemText, GStyledSpanBox, GStyledTooltip, GStyledSupportStatusFieldChip } from 'theme/style'
import { useTicketsDefaultValues } from 'section/support'
import { normalizer } from 'util/format'
import { GLOBAL } from 'config'
import { VARIANT, SIZE, LABEL, KEY, DECOILER_TYPE_ARR, FLEX, SUPPORT_STATUS } from 'constant'

const { TYPOGRAPHY } = VARIANT

const SupportTicketWidget = ({ value, handleMachineDialog, handleMachineSiteDialog }) => {
 const [loading, setLoading] = useState(false)
 const { customerTickets, initial, isLoading, customerTicketRowsPerPage, customerTicketPage, customerTicketTotal } = useSelector(state => state.customerTicket)
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 const COMPLETED_STATUSES = [SUPPORT_STATUS.CLOSED, SUPPORT_STATUS.RESOLVED, SUPPORT_STATUS.CANCELLED, SUPPORT_STATUS.COMPLETED]

 const defaultValues = useTicketsDefaultValues(customerTickets?.issues || [])
 const openTickets = defaultValues?.filter(ticket => !COMPLETED_STATUSES.includes(normalizer(ticket?.fields?.status?.name)))
 const sxProp =
  openTickets?.length < 5
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
       borderRadius: '0 0 2px 2px',
       backgroundImage:
        themeMode === KEY.LIGHT
         ? `linear-gradient(to bottom, rgba(255,255,255,0.1), ${alpha(theme.palette.grey[500], 0.5)})`
         : `linear-gradient(to bottom, rgba(0,0,0,0.1), ${alpha(theme.palette.grey[700], 0.5)})`
      }
     }

 const openInNewPage = jiraKey => {
  const url = GLOBAL.JIRA_URL + jiraKey
  window.open(url, KEY.BLANK)
 }

 return (
  <Grid container mb={2}>
   <Grid item mb={2} bgcolor='background.paper' borderRadius={2} sx={sxProp}>
    <GStyledSpanBox>
     <FormHeader label={openTickets?.length > 1 ? t('active_support_ticket.active_support_tickets.label') : t('active_support_ticket.label')} />
    </GStyledSpanBox>
    <Grid
     container
     sx={{
      height: openTickets?.length < 5 ? 'auto' : '400px',
      overflow: KEY.AUTO,
      scrollBehavior: 'smooth'
     }}>
     <Grid container p={2}>
      {openTickets?.length > 0 ? (
       openTickets?.map((mach, index) => (
        <Fragment key={index}>
         <Grid item xs={8}>
          <GStyledListItemText
           primary={
            mach?.fields?.status?.name === 'Open' && (
             <GStyledSpanBox>
              <IconButton
               // onClick={e => handleMachineDialog(e, mach._id)}
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
                {mach?.key}
               </Typography>
              </IconButton>
             </GStyledSpanBox>
            )
           }
           secondary={
            <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
             {mach?.fields?.customfield_10069}
            </Typography>
           }
          />
         </Grid>
         <Grid item xs={4} flex={1} justifyContent={KEY.FLEX_END} alignContent={KEY.RIGHT}>
          <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
           <IconTooltip
            title={LABEL.VIEW_IN_JIRA}
            icon={ICON_NAME.JIRA}
            color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
            dimension={18}
            onClick={() => openInNewPage(mach?.key)}
           />
           <GStyledSupportStatusFieldChip
            status={normalizer(mach?.fields?.status.name)}
            mode={themeMode}
            label={<Typography variant={TYPOGRAPHY.OVERLINE2}>{mach?.fields?.status.name}</Typography>}
            size={SIZE.SMALL}
           />
          </GStyledSpanBox>
         </Grid>
         {index !== openTickets?.length - 1 && <Divider variant='fullWidth' style={{ width: '100%', marginBottom: '10px' }} />}
        </Fragment>
       ))
      ) : loading ? (
       <m.div>
        <SkeletonViewFormField />
       </m.div>
      ) : (
       <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.no'>
        {'No active tickets found'}
       </Typography>
      )}
     </Grid>
    </Grid>
   </Grid>
  </Grid>
 )
}

SupportTicketWidget.propTypes = {
 value: PropTypes.object,
 handleMachineDialog: PropTypes.func,
 handleMachineSiteDialog: PropTypes.func,
 ticketTotalCount: PropTypes.number
}

export default SupportTicketWidget
