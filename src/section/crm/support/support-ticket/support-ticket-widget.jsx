import { m } from 'framer-motion'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { useSelector } from 'react-redux'
import { Grid, Typography, IconButton, Divider } from '@mui/material'
import { FormHeader, HowickLoader } from 'component'
import { GStyledListItemText, GStyledSpanBox, GStyledSupportStatusFieldChip, GStyledScrollableHeightLockGrid } from 'theme/style'
import { normalizer } from 'util/format'
import { VARIANT, SIZE, KEY, FLEX } from 'constant'

const { TYPOGRAPHY } = VARIANT

const SupportTicketWidget = ({ value }) => {
 const { isLoading } = useSelector(state => state.count)
 const { themeMode } = useSettingContext()

 //  const openInNewPage = jiraKey => {
 //   const url = GLOBAL.JIRA_URL + jiraKey
 //   window.open(url, KEY.BLANK)
 //  }

 return (
  <Grid container mb={2}>
   <GStyledScrollableHeightLockGrid mode={themeMode} totalCount={value?.length}>
    <GStyledSpanBox>
     <FormHeader
      nodeLabel
      label={
       <GStyledSpanBox display={FLEX.FLEX} justifyContent={FLEX.SPACE_BETWEEN}>
        <Typography variant={TYPOGRAPHY.H6} color='common.white'>
         {value?.length > 1 ? t('active_support_ticket.active_support_tickets.label') : t('active_support_ticket.label')}
        </Typography>
        <Typography variant={TYPOGRAPHY.H5} color='common.white'>
         {value?.length}
        </Typography>
       </GStyledSpanBox>
      }
     />
    </GStyledSpanBox>
    <Grid
     container
     sx={{
      height: value?.length < 5 ? 'auto' : '400px',
      overflow: KEY.AUTO,
      scrollBehavior: 'smooth'
     }}>
     {value?.length > 0 ? (
      value?.map((tix, index) => (
       <Grid container key={index} spacing={4} p={2}>
        <Grid item xs={8} sm={8}>
         <GStyledListItemText
          primary={
           tix?.status === 'Open' && (
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
               {tix?.key}
              </Typography>
             </IconButton>
            </GStyledSpanBox>
           )
          }
          secondary={
           <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
            {tix?.machine}
           </Typography>
          }
         />
        </Grid>
        <Grid item xs={4} sm={4}>
         <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
          {/* disabled for now til the customer based token is done */}
          {/* <IconTooltip
            title={LABEL.VIEW_IN_JIRA}
            icon={ICON_NAME.JIRA}
            color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
            dimension={18}
            onClick={() => openInNewPage(tix?.key)}
           /> */}
          <GStyledSupportStatusFieldChip status={normalizer(tix?.status)} mode={themeMode} label={<Typography variant={TYPOGRAPHY.OVERLINE_MINI}>{tix?.status}</Typography>} size={SIZE.SMALL} />
         </GStyledSpanBox>
        </Grid>
        {index !== value?.length - 1 && <Divider variant='fullWidth' style={{ width: '100%', marginBottom: '10px' }} />}
       </Grid>
      ))
     ) : isLoading ? (
      <m.div>
       <HowickLoader mode={themeMode} height={200} />
      </m.div>
     ) : (
      <Grid container>
       <Grid item xs={12} sx={{ width: '350px' }}>
        <Grid container justifyContent={'space-between'}>
         <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.no'>
          <Trans i18nKey='no_found.label' values={{ value: 'active support ticket' }} />
         </Typography>
        </Grid>
       </Grid>
      </Grid>
     )}
    </Grid>
   </GStyledScrollableHeightLockGrid>
  </Grid>
 )
}

SupportTicketWidget.propTypes = {
 value: PropTypes.any,
 handleMachineDialog: PropTypes.func,
 handleMachineSiteDialog: PropTypes.func,
 ticketTotalCount: PropTypes.number
}

export default SupportTicketWidget
