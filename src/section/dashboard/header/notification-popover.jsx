import PropTypes from 'prop-types'
import { t } from 'i18next'
import { noCase } from 'change-case'
import { useState, memo, Fragment } from 'react'
import { useWebSocketContext } from 'auth/use-websocket-context'
import { Box, Badge, Avatar, Typography, ListItemText, ListItemAvatar, ListItemButton, Tooltip, IconButton, Grid } from '@mui/material'
import { fDateTime, fToNow } from 'util'
import { Iconify } from 'component/iconify'
import { MenuPopover } from 'component/menu-popover'
import { IconButtonAnimate } from 'component/animate'

function NotificationPopover() {
  const [openPopover, setOpenPopover] = useState(null)
  const [totalUnRead, setTotalUnRead] = useState(0)
  const { notifications, sendJsonMessage } = useWebSocketContext()
  const handleOpenPopover = event => {
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = () => {
    setOpenPopover(null)
  }

  const handleMarkAs = notification => {
    if (notification?._id) {
      // setOpenPopover(null);
      sendJsonMessage({ eventName: 'markAs', _id: notification?._id, status: true })
      // navigate(
      //   PATH_MACHINE.machines.settings.serviceRecordConfigs.view(notification?.extraInfo?._id)
      // )
    } else {
      sendJsonMessage({ eventName: 'markAs', status: true })
    }
  }

  return (
    <Fragment>
      <IconButtonAnimate color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color='error'>
          <Iconify icon={openPopover ? 'mdi:bell-ring' : 'mdi:bell'} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='subtitle1'>{t('notifications.label')}</Typography>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              {t('notifications.no_notif')}
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=' Mark all as read'>
              <IconButton color='primary' onClick={() => handleMarkAs()}>
                <Iconify icon='eva:done-all-fill' />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        {/*
        TODO: Implement notification list
        {notifications && notifications?.length > 0 && (
          <>
            <Divider sx={{ borderStyle: 'solid' }} />
            <Scrollbar key="scrollbar" sx={{ maxHeight: 300 }}>
              <List key={notifications?.length} disablePadding>
                {notifications.map((notification) => (
                  <NotificationItem
                    handleMarkAs={handleMarkAs}
                    key={notification?._id}
                    notification={notification}
                  />
                ))}
              </List>
            </Scrollbar>
            <Divider sx={{ borderStyle: 'solid' }} />
            {!notifications && 'Loading...' ? '' : <Box sx={{ p: 1 }}>{` `}</Box>}
          </>
        )} */}
      </MenuPopover>
    </Fragment>
  )
}

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    extraInfo: PropTypes.object,
    readBy: PropTypes.array,
    receivers: PropTypes.array,
    createdAt: PropTypes.string
  }),
  handleMarkAs: PropTypes.func
}

function NotificationItem({ notification, handleMarkAs }) {
  const { title, icon, color } = renderNotification(notification)
  const userId = localStorage.getItem('userId')

  return (
    <ListItemButton
      sx={{
        py: 1.0,
        px: 1.5,
        pb: 0.5,
        borderBottom: '1px solid #919eab3d',
        ...(!notification?.readBy?.includes(userId) && {
          bgcolor: 'action.selected'
        })
      }}
      onClick={() => handleMarkAs(notification)}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.primary' }}>
          <Iconify icon={icon} color={color} width={30} />
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        disableTypography
        primary={title}
        secondary={
          <Grid container direction='row' sx={{ typography: 'caption', color: 'text.disabled' }}>
            <Grid item display='flex' columnGap={0.5} mt={0.5}>
              <Iconify icon='eva:clock-fill' width={16} />
              <Typography variant='caption'>{fToNow(fDateTime(notification.createdAt))}</Typography>
            </Grid>

            {/* <Grid item lg={4}>
              <Typography variant="caption" align='right' alignSelf='flex-end' >Clear</Typography>
            </Grid> */}
            {/* <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} /> */}
          </Grid>
        }
      />
    </ListItemButton>
  )
}

function renderNotification(notification) {
  const rendered = { title: '', icon: '', color: '' }
  const { extraInfo } = notification || {}

  const title = (
    <Typography variant='subtitle2'>
      {notification?.title}
      <Typography component='span' variant='body2' sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification?.description || '')}
      </Typography>
    </Typography>
  )

  rendered.title = title

  if (notification.type === 'SERVICE-GLOBAL') {
    const { status } = extraInfo
  }

  return rendered
}

export default memo(NotificationPopover)
