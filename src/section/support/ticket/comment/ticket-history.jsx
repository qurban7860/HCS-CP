import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { getHistories } from 'store/slice'
import { useTheme, Box, Typography, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { CustomAvatar, CommentListItem } from 'component'
import { GLOBAL } from 'config/global'
import { TYPOGRAPHY, KEY } from 'constant'

const TicketHistory = ({ currentUser }) => {
 const { histories }     = useSelector(state => state.history)
 const { securityUsers } = useSelector(state => state.user)
 const { themeMode }     = useSettingContext()
 const theme             = useTheme()
 const dispatch          = useDispatch()
 const { id }            = useParams()

const isCommenterNotHowickAgent = (_commenterId) => securityUsers?.some((_user) => _user?._id === _commenterId)
const _textColor = themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.orange
const _iconColor = themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.burnIn.main


 useEffect(() => {
  if (id) {
   dispatch(getHistories(id))
  }
 }, [id, dispatch])

 const getLightBackgroundColor = color => {
  if (!color) return 'rgba(0, 0, 0, 0.1)'
  const div = document.createElement('div')
  div.style.color = color
  document.body.appendChild(div)
  const computedColor = window.getComputedStyle(div).color
  document.body.removeChild(div)

  const rgb = computedColor.match(/\d+/g)
  if (!rgb) return 'rgba(0, 0, 0, 0.1)'

  const [r, g, b] = rgb.map(Number)
  return `rgba(${r + (255 - r) * 0.7}, ${g + (255 - g) * 0.7}, ${b + (255 - b) * 0.7}, 1)`
 }

 return (
  <Fragment>
   <Box>
    {histories.length > 0 ? (
     <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {histories.map((history, index) => (
       <Fragment key={history._id}>
        {index > 0 && <Divider component='li' />}
        <ListItem alignItems='flex-start' sx={{ padding: '8px 0' }}>
         <ListItemAvatar>
          <CustomAvatar src={currentUser?.photoURL} alt={history?.updatedBy?.name} name={history?.updatedBy?.name ||GLOBAL.USER_DEFAULT} sx={{ mt: -1 }} />
         </ListItemAvatar>
         <CommentListItem
            truncatedName={history?.updatedBy?.name || GLOBAL.USER_DEFAULT}
            icon={!isCommenterNotHowickAgent(history?.createdBy?._id) && <Icon icon={ICON_NAME.HOWICK_LOGO} color={_iconColor} sx={{ width: 10, height: 10 }} />}
            format={dayjs(history?.updatedAt).format('MMMM D, YYYY [at] h:mm A')}
            date= {dayjs().diff(dayjs(history.createdAt), 'day') < 1 ? dayjs(history?.createdAt).fromNow() : dayjs(history.createdAt).format('MMMM D, YYYY [at] h:mm A')}
            secondary={
           <Fragment>
            {(history?.previousStatus?._id || history?.newStatus?._id) && (
             <Typography variant={TYPOGRAPHY.SUBTITLE1}>
                {t('status.label')}:
              <span
               style={{
                backgroundColor: getLightBackgroundColor(history.previousStatus?.color),
                color: history.previousStatus?.color || 'black',
                padding: '2px 6px',
                marginLeft: '4px'
               }}>
               {history.previousStatus?.name || 'None'}
              </span>
              →
              <span
               style={{
                backgroundColor: getLightBackgroundColor(history.newStatus?.color),
                color: history.newStatus?.color || 'black',
                padding: '2px 6px',
               }}>
               {history.newStatus?.name || 'None'}
              </span>
             </Typography>
            )}
            {(history?.previousPriority?._id || history?.newPriority?._id) && (
             <Typography variant={TYPOGRAPHY.SUBTITLE1}>
             {t('priority.label')}:
              <span
               style={{
                backgroundColor: getLightBackgroundColor(history.previousPriority?.color),
                color: history.previousPriority?.color || 'black',
                padding: '2px 6px',
                marginLeft: '4px'
               }}>
               {history.previousPriority?.name || 'None'}
              </span>
              <Icon icon={ICON_NAME.ARROW_RIGHT} sx={{ width: 10, height: 10, marginX: 1 }} />
              <span
               style={{
                backgroundColor: getLightBackgroundColor(history.newPriority?.color),
                color: history.newPriority?.color || 'black',
                padding: '2px 6px',
               }}>
               {history.newPriority?.name || 'None'}
              </span>
             </Typography>
            )}
            {(history?.previousReporter?._id || history?.newReporter?._id) && (
             <Typography variant={TYPOGRAPHY.SUBTITLE1} color='textSecondary'>
              {t('reporter.label')}: {history.previousReporter?.firstName} {history.previousReporter?.lastName || 'None'} → {history.newReporter?.firstName} {history.newReporter?.lastName || 'None'}
             </Typography>
            )}
            {(history?.previousAssignee?._id || history?.newAssignee?._id) && (
             <Typography variant={TYPOGRAPHY.SUBTITLE1} color='textSecondary'>
             {t('assignee.label')}: {history.previousAssignee?.firstName} {history.previousAssignee?.lastName || 'None'} → {history.newAssignee?.firstName} {history.newAssignee?.lastName || 'None'}
             </Typography>
            )}
           </Fragment>
          }
         />
        </ListItem>
       </Fragment>
      ))}
     </List>
    ) : (
     <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.secondary' align='center' sx={{ mt: 2 }}>
      <Trans i18nKey='no_found.label' values={{ value: 'Ticket History' }} />
     </Typography>
    )}
   </Box>
  </Fragment>
 )
}

TicketHistory.propTypes = {
 currentUser: PropTypes.object.isRequired
}

export default TicketHistory