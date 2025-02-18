import { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useParams } from 'react-router-dom'
import { useAuthContext } from 'auth'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, ICON_NAME, snack, useSettingContext } from 'hook'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { yupResolver } from '@hookform/resolvers/yup'
import { TicketCommentSchema } from 'schema'
import { LoadingButton } from '@mui/lab'
import { getSecurityUsers } from 'store/slice'
import { addComment, deleteComment, getComments, resetComments, updateComment } from 'store/slice'
import { useTheme, Paper, Button, List, ListItem, ListItemAvatar, Divider, Box, Stack, Typography, TextField } from '@mui/material'
import { FormProvider, RHFTextField, GridViewTitle, CustomAvatar, ConfirmDialog, CommentListItem } from 'component'
import { GStyledDefLoadingButton } from 'theme/style'
import { delay } from 'util'
import { RADIUS } from 'config/layout'
import { KEY, SIZE, TYPOGRAPHY } from 'constant'
import TicketHistory from './ticket-history'

dayjs.extend(relativeTime)

const TAG = 'Comment'
const TAB_TYPE = {
       comment: TAG,
       history: 'History'
 }

const TicketComment = ({ currentUser }) => {
 const [editingCommentId, setEditingCommentId]   = useState(null)
 const [editValue, setEditValue]                 = useState('')
 const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
 const [commentToDelete, setCommentToDelete]     = useState(null)
 const [activeTab, setActiveTab]                 = useState(TAB_TYPE.comment)
 const { error, comments, isLoading }            = useSelector(state => state.comment)
 const { securityUsers }                         = useSelector(state => state.user)
 const { user, userId }                          = useAuthContext()
 const { id }                                    = useParams()
 const theme                                     = useTheme()
 const dispatch                                  = useDispatch()
 const { themeMode }                             = useSettingContext()

 const _textColor = themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.orange
 const _iconColor = themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.burnIn.main

const isCommenterNotHowickAgent = (_commenterId) => securityUsers?.some((_user) => _user?._id === _commenterId)

 const handleTabChange = tab => {
  setActiveTab(tab)
 }

 useEffect(() => {
  let controller
  if (id) {
   dispatch(getComments(id))
  }
  return () => {
   if (controller) {
    controller.abort()
   }
   dispatch(resetComments())
  }
 }, [dispatch, id])

 const methods = useForm({
  resolver: yupResolver(TicketCommentSchema),
  defaultValues: { comment   : '', isInternal: false }
 })

 useEffect(()=>{
  if (!securityUsers?.length) {
    dispatch(getSecurityUsers(user.customer, null))
  }
},[dispatch, securityUsers?.length])


 const { reset, handleSubmit, watch, formState: { isSubmitting } } = methods
 const commentValue = watch('comment')

 const onSubmit = async data => {
  dispatch(addComment(id, data.comment || '', data.isInternal))
  reset()
  if (error) {
    snack(error, { variant: 'error' })
  } else {
    snack(t('responses.messages.crud_default.added', { value: TAG }), { variant: 'success' })
  }
 }

 const handleSaveEdit = async cID => {
  dispatch(updateComment(id, cID, { comment: editValue }))
  setEditingCommentId(null)
  setEditValue('')
  await delay(500)
  if (error) {
    snack(error, { variant: 'error' })
  } else {
    snack(t('responses.messages.crud_default.updated', { value: TAG }), { variant: 'success' })
  }
 }

 const handleConfirmDelete = async () => {
   dispatch(deleteComment(id, commentToDelete?._id, { isArchived: true }))
   await delay(500)
  if (error) {
    snack(error, { variant: 'error' })
    setOpenConfirmDelete(false)
  } else {
    setOpenConfirmDelete(false)
    setCommentToDelete(null)
    snack(t('responses.messages.crud_default.deleted', { value: TAG }), { variant: 'success' })
  }
 }

 const handleEditClick = comment => {
  setEditingCommentId(comment?._id)
  setEditValue(comment?.comment)
 }

 const handleCancelEdit = () => {
  setEditingCommentId(null)
  setEditValue('')

 }

 const handleDeleteClick = comment => {
  setCommentToDelete(comment)
  setOpenConfirmDelete(true)
 }

 return (
  <Fragment>
   <Paper sx={{ width: '100%', p: 2 }}>
    <Box sx={{ ml: 1, mb: 1.5 }}>
     <LoadingButton
      value={TAB_TYPE.comment}
      onClick={() => handleTabChange(TAB_TYPE.comment)}
      variant={activeTab === TAB_TYPE.comment ? 'contained' : 'text'}
      color='primary'
      size='small'
      sx={{ width: 'fit-content', mr: 2, color: activeTab === TAB_TYPE.comment ? theme.palette.common.white : (themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.orange )}}>
       {t('comment.comments.label')}
     </LoadingButton>
     <LoadingButton value={TAB_TYPE.history} onClick={() => handleTabChange(TAB_TYPE.history)} variant={activeTab === TAB_TYPE.history ? 'contained' : 'text'} size='small' sx={{  width: 'fit-content', color: activeTab === TAB_TYPE.history ? theme.palette.common.white : (themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.orange ) }}>
      {t('history.label')}
     </LoadingButton>
    </Box>
    {activeTab === TAB_TYPE.comment  && (
     <Fragment>
      <Box sx={{ py: 2 }}>
       <GridViewTitle title={t('notes_comments.label')} />
       <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction='row' spacing={2}>
         <CustomAvatar src={currentUser?.photoURL} alt={currentUser?.displayName} name={currentUser?.displayName} sx={{ borderRadius: RADIUS.BORDER.borderRadius }} />
         <Stack sx={{ width: '100%' }}>
          <RHFTextField
           name='comment'
           placeholder={t('add_a_comment.label')}
           multiline
           rows={2}
           inputProps={{ maxLength: 300 }}
           helperText={`${commentValue?.length || 0}/300 characters`}
           FormHelperTextProps={{ sx: { textAlign: 'right' } }}
          />
          {!!commentValue?.trim() && (
           <Stack spacing={1} direction='row' sx={{ mt: 2 }}>
            <LoadingButton type='submit' disabled={isLoading} loading={isSubmitting} variant='contained' color='primary' size='small' sx={{ width: 'fit-content' }}>
             {t('save.label')}
            </LoadingButton>
            <Button type='button' variant='text' size='small' sx={{ width: 'fit-content' }} onClick={() => reset()}>
              {t('cancel.label')}
            </Button>
           </Stack>
          )}
         </Stack>
        </Stack>
       </FormProvider>

       <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 300, overflow: 'auto', mt: 1.5 }}>
        {comments.map((item, index) => (
         <Fragment key={index}>
          {index > 0 && <Divider component='li' />}
          <ListItem alignItems='flex-start' sx={{ padding: '8px 0' }}>
           <ListItemAvatar>
            <CustomAvatar alt={item?.createdBy?.name} name={item?.createdBy?.name} sx={{ borderRadius: RADIUS.BORDER.borderRadius }} />
           </ListItemAvatar>
           <CommentListItem
            truncatedName={item?.createdBy?.name}
            icon={!isCommenterNotHowickAgent(item?.createdBy?._id) && <Icon icon={ICON_NAME.HOWICK_LOGO} color={_iconColor} sx={{ width: 10, height: 10 }} />}
            format={dayjs(item.createdAt).format('MMMM D, YYYY [at] h:mm A')}
            date= {dayjs().diff(dayjs(item.createdAt), 'day') < 1 ? dayjs(item.createdAt).fromNow() : dayjs(item.createdAt).format('MMMM D, YYYY [at] h:mm A')}
            secondary={
            <Box>
              {editingCommentId === item._id ? (
               <FormProvider methods={methods} key={item._id}>
                <Stack spacing={2}>
                 <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  inputProps={{ maxLength: 300 }}
                  helperText={`${editValue?.length}/300 characters`}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                 />
                 <Stack direction='row' spacing={1}>
                  <LoadingButton
                   type={KEY.SUBMIT}
                   onClick={() => handleSaveEdit(item._id)}
                   disabled={!editValue.trim()}
                   loading={isLoading}
                   variant='contained'
                   color='primary'
                   size={SIZE.SMALL}
                   sx={{ width: 'fit-content' }}>
                     {t('update.label')}
                  </LoadingButton>
                  <Button variant='text' size='small' sx={{ width: 'fit-content' }} onClick={handleCancelEdit}>
                   {t('cancel.label')}
                  </Button>
                 </Stack>
                </Stack>
               </FormProvider>
              ) : (
               <Fragment>
                <Typography component='span' variant={TYPOGRAPHY.BODY2} color='text.primary'>
                 {item.comment}
                 {item.updatedAt !== item.createdAt && (
                  <Typography component='span' variant={TYPOGRAPHY.CAPTION} sx={{ color: 'text.secondary', ml: 1 }}>
                    {t('edited.audit')}
                  </Typography>
                 )}
                </Typography>
                {item?.createdBy?._id === currentUser?.userId && (
                 <Stack direction='row' spacing={1} sx={{ mt: 1 }}>
                  <Button size='small' onClick={() => handleEditClick(item)} sx={{ minWidth: 'unset', px: 1, color: _textColor }}>
                   <Typography variant={TYPOGRAPHY.CAPTION}>
                   {t('edit.label')}
                   </Typography>
                  </Button>
                  <Button size={SIZE.SMALL} color='error' onClick={() => handleDeleteClick(item)} sx={{ minWidth: 'unset', px: 1 }}>
                    <Typography variant={TYPOGRAPHY.CAPTION}>
                    {t('delete.label')}
                    </Typography>
                  </Button>
                 </Stack>
                )}
               </Fragment>
              )}
             </Box>
             }
           />
          </ListItem>
         </Fragment>
        ))}
       </List>
      </Box>
     </Fragment>
    )}

    {activeTab === TAB_TYPE.history && <TicketHistory currentUser={{ ...user, userId }} />}
   </Paper>

   <ConfirmDialog
    open={openConfirmDelete}
    onClose={() => setOpenConfirmDelete(false)}
    title={t('delete_comment.label')}
    content={t('delete_comment.description')}
    action={
     <GStyledDefLoadingButton bgColor={theme.palette.error.main} textColor={theme.palette.common.white} onClick={handleConfirmDelete}>
      {t('delete.label').toUpperCase()}
     </GStyledDefLoadingButton>
    }
   />
  </Fragment>
 )
}

TicketComment.propTypes = {
 currentUser: PropTypes.object.isRequired
}

export default TicketComment
