import { Fragment, useState } from 'react'
import { m } from 'framer-motion'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import PropTypes from 'prop-types'
import { useIcon, ICON_NAME, useSettingContext } from 'hook'
import { useSelector } from 'react-redux'
import { Grid, Typography, IconButton, Divider } from '@mui/material'
import { FormHeader, SkeletonViewFormField, IconTooltip } from 'component'
import { useTheme, alpha } from '@mui/material/styles'
import { GStyledListItemText, GStyledSpanBox, GStyledSupportStatusFieldChip, GStyledScrollableHeightLockGrid } from 'theme/style'
import { useTicketsDefaultValues } from 'section/support'
import { normalizer } from 'util/format'
import { GLOBAL } from 'config'
import { VARIANT, SIZE, LABEL, KEY, FLEX, SUPPORT_STATUS } from 'constant'

const { TYPOGRAPHY } = VARIANT

const SupportTicketWidget = ({ value, handleMachineDialog, handleMachineSiteDialog }) => {
 const { customerTickets, isLoading } = useSelector(state => state.customerTicket)
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 const COMPLETED_STATUSES = [SUPPORT_STATUS.CLOSED, SUPPORT_STATUS.RESOLVED, SUPPORT_STATUS.CANCELLED, SUPPORT_STATUS.COMPLETED]

 const defaultValues = useTicketsDefaultValues(customerTickets?.issues || [])
 const openTickets = defaultValues?.filter(ticket => !COMPLETED_STATUSES.includes(normalizer(ticket?.fields?.status?.name)))

 const openInNewPage = jiraKey => {
  const url = GLOBAL.JIRA_URL + jiraKey
  window.open(url, KEY.BLANK)
 }

 return (
  <Grid container mb={2}>
   <GStyledScrollableHeightLockGrid mode={themeMode} totalCount={openTickets?.length}>
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
      ) : isLoading ? (
       <m.div>
        <SkeletonViewFormField />
       </m.div>
      ) : (
       <Grid container>
        <Grid item xs={12} sx={{ width: '350px' }}>
         <Grid container justifyContent={'space-between'}>
          <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.no'>
           <Trans i18nKey='no_found.label' values={{ value: 'Active Support Ticket' }} />
          </Typography>
         </Grid>
        </Grid>
       </Grid>
      )}
     </Grid>
    </Grid>
   </GStyledScrollableHeightLockGrid>
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
