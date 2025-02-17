import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { getHistories, resetHistories } from 'store/slice'
import { Box, Typography, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { GridViewTitle, CustomAvatar } from 'component'
import { TYPOGRAPHY } from 'constant'

const TicketHistory = ({ currentUser }) => {
 const { histories } = useSelector(state => state.history)
 const dispatch      = useDispatch()
 const { id }        = useParams()

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
   <GridViewTitle title={t('attachment.attachments.label')} />
   <Box>
    {histories.length > 0 ? (
     <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {histories.map((history, index) => (
       <Fragment key={history._id}>
        {index > 0 && <Divider component='li' />}
        <ListItem alignItems='flex-start' sx={{ padding: '8px 0' }}>
         <ListItemAvatar>
          <CustomAvatar src={currentUser?.photoURL} alt={currentUser?.displayName} name={currentUser?.displayName || history?.createdBy?.name || 'Unknown User'} sx={{ mt: -1 }} />
         </ListItemAvatar>
         <ListItemText
          primary={
           <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='subtitle2' sx={{ mr: 1 }}>
             {currentUser?.displayName || history?.createdBy?.name || 'Unknown User'}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }} title={dayjs(history.createdAt).format('MMMM D, YYYY [at] h:mm A')}>
             {dayjs().diff(dayjs(history.createdAt), 'day') < 1 ? dayjs(history.createdAt).fromNow() : dayjs(history.createdAt).format('MMMM D, YYYY [at] h:mm A')}
            </Typography>
           </Box>
          }
          secondary={
           <Fragment>
            {(history?.previousStatus?._id || history?.newStatus?._id) && (
             <Typography variant={TYPOGRAPHY.BODY1}>
              Status:
              <span
               style={{
                backgroundColor: getLightBackgroundColor(history.previousStatus?.color),
                color: history.previousStatus?.color || 'black',
                padding: '2px 6px',
                borderRadius: '4px',
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
                borderRadius: '4px'
               }}>
               {history.newStatus?.name || 'None'}
              </span>
             </Typography>
            )}
            {(history?.previousPriority?._id || history?.newPriority?._id) && (
             <Typography variant='body1'>
              Priority:
              <span
               style={{
                backgroundColor: getLightBackgroundColor(history.previousPriority?.color),
                color: history.previousPriority?.color || 'black',
                padding: '2px 6px',
                borderRadius: '4px',
                marginLeft: '4px'
               }}>
               {history.previousPriority?.name || 'None'}
              </span>
              →
              <span
               style={{
                backgroundColor: getLightBackgroundColor(history.newPriority?.color),
                color: history.newPriority?.color || 'black',
                padding: '2px 6px',
                borderRadius: '4px'
               }}>
               {history.newPriority?.name || 'None'}
              </span>
             </Typography>
            )}
            {(history?.previousReporter?._id || history?.newReporter?._id) && (
             <Typography variant='body1' color='textSecondary'>
              Reporter: {history.previousReporter?.firstName} {history.previousReporter?.lastName || 'None'} → {history.newReporter?.firstName} {history.newReporter?.lastName || 'None'}
             </Typography>
            )}
            {(history?.previousAssignee?._id || history?.newAssignee?._id) && (
             <Typography variant='body1' color='textSecondary'>
              Assignee: {history.previousAssignee?.firstName} {history.previousAssignee?.lastName || 'None'} → {history.newAssignee?.firstName} {history.newAssignee?.lastName || 'None'}
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
