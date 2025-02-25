import { memo } from 'react'
import { t } from 'i18next'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { setTicketCreateSuccessDialog } from 'store/slice'
import { useSettingContext, snack, Icon, ICON_NAME } from 'hook'
import { PATH_HOME, PATH_SECURITY, PATH_SUPPORT } from 'route/path'
import { useMediaQuery, Grid, Dialog, DialogContent, DialogTitle, DialogActions, Divider, Typography, Avatar } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledCloseButton, GStyledLoadingButton, GBackdropPropsOption } from 'theme/style'
import { ICON } from 'config/layout'
import { TYPOGRAPHY, FLEX, KEY, COLOR } from 'constant'

const TicketCreateSuccessDialog = () => {
 const { ticketCreateSuccessDialog } = useSelector(state => state.ticket)
 const { themeMode }                 = useSettingContext()
 const { id }                        = useParams()
 const theme                         = useTheme()
 const navigate                      = useNavigate()
 const isDesktop                     = useMediaQuery(theme.breakpoints.up('md'))

 const handleDialog = () => {
  dispatch(setTicketCreateSuccessDialog(false))
 }

 const handleCloseAndNavigateToList = () => {
  dispatch(setTicketCreateSuccessDialog(false))
  snack(t('responses.success.ticket_created'), { variant: COLOR.SUCCESS })
  navigate(PATH_SUPPORT.tickets.list)
 }

 const handleViewTicket = () => {
  dispatch(setTicketCreateSuccessDialog(false))
  snack(t('responses.success.ticket_created'), { variant: COLOR.SUCCESS })
  dispatch(setTicketCreateSuccessDialog(false))
  navigate(PATH_SUPPORT.tickets.view(id))
 }

 return (
  <Dialog disableEnforceFocus open={ticketCreateSuccessDialog} onClose={handleDialog} BackdropProps={GBackdropPropsOption(themeMode)}>
   <GStyledTopBorderDivider mode={themeMode} />
    <DialogTitle sx={{ ...(isDesktop && { minWidth: 500 }), width: '100%', boxSizing: 'border-box', padding: theme.spacing(2) }}>
        <Grid container gap={2}>

            <Grid container display={FLEX.FLEX} justifyContent={FLEX.CENTER}>
                <Avatar sx={{ bgcolor: theme.palette.howick.darkBlue, ...ICON.SIZE_SM }}>
                    <Icon icon={ICON_NAME.CHECK_CICLE_OUTLINE} sx={{ color: theme.palette.grey[200], ...ICON.SIZE_MD_2 }} />
                </Avatar>
            </Grid>
        </Grid>
    </DialogTitle>

   <Divider orientation={KEY.HORIZONTAL} flexItem />
   <DialogContent dividers sx={{ px: 3, py: 2 }}>

     <Grid container display={FLEX.FLEX} justifyContent={FLEX.CENTER}>
      <Typography variant={isDesktop ? TYPOGRAPHY.H4 : TYPOGRAPHY.H5}>{t('support_ticket_created.label').toUpperCase()} &nbsp;</Typography>
     </Grid>

     <Grid container display={FLEX.FLEX} justifyContent={FLEX.CENTER}>
      <Typography variant={isDesktop ? TYPOGRAPHY.BODY1 : TYPOGRAPHY.BODY2}>{t('support_ticket_created.description')} &nbsp;</Typography>
     </Grid>

   </DialogContent>
   <DialogActions>
     <Grid item sm={12}>
      <Grid container justifyContent={FLEX.FLEX_END}>
       <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
        <GStyledCloseButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleCloseAndNavigateToList}>
         {t('close.label').toUpperCase()}
        </GStyledCloseButton>
        <GStyledLoadingButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleViewTicket} mode={themeMode}>
         {t('view_ticket.label').toUpperCase()}
        </GStyledLoadingButton>
       </Grid>
      </Grid>
     </Grid>
   </DialogActions>
  </Dialog>
 )
}

export default memo(TicketCreateSuccessDialog)
