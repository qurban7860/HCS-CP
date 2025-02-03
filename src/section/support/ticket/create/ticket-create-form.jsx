import { Fragment, useEffect, useState, useCallback, useRef } from 'react'
import _ from 'lodash'
import debounce from 'lodash.debounce'
import { t } from 'i18next'
import { enc, MD5, lib } from 'crypto-js';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from 'auth/use-auth-context'
import { snack, useResponsive, useSettingContext } from 'hook'
import { dispatch } from 'store'
import { useForm } from 'react-hook-form'
import {
 addAndInviteSecurityUser,
 addContactFromUserInvite,
 getCustomer,
 getSecurityUsers,
 getActiveContacts,
 getTicketSettings,
 getCustomerMachines,
 deleteFile,
 resetTicketSettings,
 resetCustomerMachines
} from 'store/slice'
import { PATH_DASHBOARD } from 'route/path'
import { TicketSchema } from 'schema'
import { useTicketCreateDefaultValues } from 'section/support'
import { useTheme, Grid, Box, Checkbox, Typography, FormControlLabel, Card } from '@mui/material'
import { RHFRequiredTextFieldWrapper, RHFUpload,  UserInviteSuccessDialog, ConfirmDialog, GridViewTitle } from 'component'
import FormProvider, { RHFTextField, RHFAutocomplete, RHFPhoneInput, RHFCheckbox } from 'component/hook-form'
import { GStyledLoadingButton, GStyledDefLoadingButton, GStyledSpanBox, GStyledFieldChip, GCardOption, GStyledTopBorderDivider } from 'theme/style'
import { REGEX, LOCAL_STORAGE_KEY, KEY, LABEL, SIZE, COLOR, TYPOGRAPHY, FLEX_DIR, FLEX } from 'constant'
import { delay, getCountryCode, roleCoverUp, deepEqual } from 'util'
/**
 * Creating a new ticket form
 * @returns {JSX.Element}
 */
function TicketCreateForm() {
 const [isFormComplete, setIsFormComplete]       = useState(false)
 const [isSuccessState, setIsSuccessState]       = useState(false)
 const [isConfirming, setIsConfirming]           = useState(false)
 const [addAsContact, setAddAsContact]           = useState(false)
 const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
 const { customer, activeContacts, securityUserTotalCount, customerMachines, userInviteDialog, ticketSettings } = useSelector(
  state => ({
   customer              : state.customer.customer,
   activeContacts        : state.contact.activeContacts,
   securityUserTotalCount: state.user.securityUserTotalCount,
   userInviteDialog      : state.user.userInviteDialog,
   customerMachines      : state.machine.customerMachines,
   customerRoles         : state.role.customerRoles,
   ticketSettings        : state.ticket.ticketSettings
  }),
  _.isEqual
 )

 const { user }         = useAuthContext()
 const { themeMode }    = useSettingContext()
 const theme            = useTheme()
 const navigate         = useNavigate()
 const regEx            = new RegExp(REGEX.ERROR_CODE)
 const isMobile         = useResponsive('down', 'sm')
 const fetchCustomerRef = useRef(false)

 const fetchCustomer = useCallback(() => {
  if (user?.customer) {
   dispatch(getCustomer(user.customer))
  }
 }, [user?.customer, dispatch])

  useEffect(() => {
   if (!user?.customer || fetchCustomerRef.current) return
   fetchCustomerRef.current = true
   const timer = setTimeout(() => {
    fetchCustomer()
   }, 300)
   return () => clearTimeout(timer)
  }, [user?.customer, fetchCustomer])

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (user.customer && securityUserTotalCount) dispatch(getSecurityUsers(user.customer))
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [user.customer, securityUserTotalCount, dispatch])

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (user.customer && !activeContacts.length) dispatch(getActiveContacts(user.customer))
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [user.customer, activeContacts, dispatch])

 const defaultValues = useTicketCreateDefaultValues(customer)
 const methods = useForm({
  resolver: yupResolver(TicketSchema('new')),
  defaultValues,
  mode: 'onChange'
 })

 const {
  reset,
  setValue,
  setError,
  watch,
  handleSubmit,
  formState: { errors, isSubmitting, isSubmitSuccessful }
 } = methods

 const { machine, issueType, summary, description, files } = watch()

 const checkFormCompletion = useCallback(() => {
  setIsFormComplete(!!machine && !!issueType && !!summary && !!description)
 }, [machine, issueType, summary, description])

//  useEffect(() => {
//   if (contact) {
//    const selectedContact = activeContacts.find(activeContact => activeContact?._id === contact?._id)
//    if (selectedContact) {
//     setValue(FORM_EL.name, `${selectedContact.firstName} ${selectedContact.lastName}`)
//     if (selectedContact.email) setValue(FORM_EL.email, selectedContact.email)
//    }
//   }
//  }, [contact, activeContacts, setValue, name])

 useEffect(() => {
  if (!isSuccessState) {
   checkFormCompletion()
  }
 }, [checkFormCompletion])

 const isFormDirty = Object.keys(defaultValues).some(key => !deepEqual(watch(key), defaultValues[key]))
 useEffect(() => {
  const handleBeforeUnload = event => {
   if (isFormDirty) {
    event.preventDefault()
    event.returnValue = t('responses.messages.form_dirty')
   }
  }
  const handlePopState = event => {
   if (isFormDirty) {
    const confirmation = window.confirm(t('responses.messages.form_dirty'))
    if (!confirmation) {
     event.preventDefault()
     history.pushState(null, document.title, window.location.href)
    } else {
     reset(defaultValues)
    }
   }
  }
  window.addEventListener('beforeunload', handleBeforeUnload)
  window.addEventListener('popstate', handlePopState)
  return () => {
   window.removeEventListener('beforeunload', handleBeforeUnload)
   window.removeEventListener('popstate', handlePopState)
  }
 }, [isFormDirty])

 const handleConfirmation = async () => {
  setIsConfirming(true)
 }

 const handleCancel = async () => {
  setOpenConfirmDialog(false)
  reset(defaultValues)
  navigate(PATH_DASHBOARD.root)
 }

 const handleConfirmCancel = () => {
  if (isFormDirty) {
   setOpenConfirmDialog(true)
   return
  }
  handleCancel()
 }

 useEffect(() => {
    if (!customer) return
    dispatch(getTicketSettings())
    dispatch(getCustomerMachines(customer?._id))
    return ()=> {
        dispatch(resetTicketSettings())
        dispatch(resetCustomerMachines())
    }
 }, [dispatch])

 const hashFilesMD5 = async (_files) => {
    const hashPromises = _files.map((file) => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const wordArray = MD5(lib.WordArray.create(arrayBuffer));
        const hashHex = wordArray.toString(enc.Hex);
        resolve(hashHex);
      }
      reader.onerror = () => {
        reject(new Error(`Error reading file: ${file?.name || '' }`))
      }
      reader.readAsArrayBuffer(file);
    }))
    try {
      const hashes = await Promise.all(hashPromises)
      return hashes;
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const handleDropMultiFile = useCallback(async (acceptedFiles) => {
    const hashes = await hashFilesMD5(acceptedFiles)
    const newFiles = ( Array.isArray(files) && files?.length > 0 ) ? [ ...files ] : []
    acceptedFiles.forEach((file, index) => {
      const eTag = hashes[index];
      if( !newFiles?.some(( el ) => el?.eTag === eTag ) ){
        const newFile = Object.assign(file, {
          preview: URL.createObjectURL(file),
          src: URL.createObjectURL(file),
          isLoaded: true,
          eTag,
        });
        newFiles.push(newFile)
      }
    });
    setValue('files', newFiles, { shouldValidate: true })
  }, [setValue, files])

  const handleFileRemove = useCallback( async (inputFile) => {
    try{
      setValue('files', files?.filter((el) => ( inputFile?._id ? el?._id !== inputFile?._id : el !== inputFile )), { shouldValidate: true } )
      if( inputFile?._id ){
        dispatch(deleteFile( inputFile?.ticket, inputFile?._id))
      }
    } catch(e){
      console.error(e)
    }
  }, [ setValue, files, dispatch ] )

 const handleSubmissionError = error => {
  if (error?.errors) {
   error.errors.forEach(({ field, message }) => {
    setError(field, { type: 'validation', message })
   })
   snack(t('responses.error.form_check_errors'), { variant: COLOR.ERROR })
   return
  }
  if (error?.MessageCode && regEx.test(error.MessageCode)) {
   snack(t('responses.error.default'), { variant: COLOR.ERROR })
   setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, { type: 'submission', message: error.MessageCode })
   return
  }
  console.error(t('responses.error.unexpected_error'), error)
  snack(error, { variant: COLOR.ERROR })
  setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, { type: 'unexpected', message: error?.message || t('responses.error.unexpected_error') })
 }

 const onSubmit = async data => {
  try {
   setIsSuccessState(true)
   setIsConfirming(false)
   const Data = { ...data, customer }

   if (addAsContact) {
    const newContactResponse = await dispatch(addContactFromUserInvite(customer?._id, Data))
    if (newContactResponse.status !== 201) {
     snack(t('responses.error.unable_create_contact'), { variant: COLOR.ERROR })
     throw new Error(t('responses.error.unable_create_contact'))
    }
    snack(t('responses.success.created_contact'), { variant: COLOR.SUCCESS })
    const { customerCategory } = newContactResponse.data
    Data.contact = customerCategory
   }

   const response = await dispatch(addAndInviteSecurityUser(Data))
   await delay(2000)
   if (REGEX.SUCCESS_CODE.test(response.status)) {
    snack(t('responses.success.user_invite_request_submitted'), { variant: COLOR.SUCCESS })
    reset()
    setIsFormComplete(false)
    setIsSuccessState(false)
   } else {
    console.error(t('responses.error.failed_submission'), response)
    snack(t('responses.error.failed_submission'), { variant: COLOR.ERROR })
    setIsSuccessState(false)
    setIsConfirming(false)
   }
  } catch (error) {
   handleSubmissionError(error)
   setIsSuccessState(false)
  }
 }

 return (
  <Fragment>
   <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Grid container my={4} direction={{ xs: 'column', md: 'row' }} flex={1} rowSpacing={4} gridAutoFlow={isMobile ? FLEX_DIR.COLUMN : FLEX_DIR.ROW} columnSpacing={2}>
        <Grid item xs={12} sm={12} md={4}>
            <Box m={2}>
                <Card {...GCardOption(themeMode)}>
                    <GStyledTopBorderDivider mode={themeMode} />
                    <Grid container spacing={2} p={1.5}>
                            <Grid item xs={12} sm={12} md={12}>
                                <RHFRequiredTextFieldWrapper condition={!machine}>
                                    <RHFAutocomplete
                                        name={'machine'}
                                        label={t('machine.label')}
                                        options={customerMachines || []}
                                        isOptionEqualToValue={(option, value) => option._id === value._id}
                                        getOptionLabel={option => `${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}
                                        renderOption={(props, option) => <li {...props} key={option?._id}>{`${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}</li>}
                                        helperText={errors.contact ? errors.contact.message : t('new_contact.helper_text')}
                                    />
                                    </RHFRequiredTextFieldWrapper>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <RHFRequiredTextFieldWrapper condition={!issueType}>
                                    <RHFAutocomplete
                                        name="issueType"
                                        label="Issue Type*"
                                        options={ticketSettings?.issueTypes || []}
                                        isOptionEqualToValue={(option, value) => option._id === value._id}
                                        getOptionLabel={(option) => `${option.name || ''}`}
                                        renderOption={(props, option) => (<li {...props} key={option?._id}> {option.name || ''} </li> )}
                                    />
                                </RHFRequiredTextFieldWrapper>
                            </Grid>
                    </Grid>
                </Card>
            </Box>
        </Grid>
        {issueType && machine && (
            <Grid item xs={12} sm={8} md={8}>
                <Box m={2}>
                    <Card {...GCardOption(themeMode)}>
                        <GStyledTopBorderDivider mode={themeMode} />
                        <Grid container spacing={2} p={1.5}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <RHFRequiredTextFieldWrapper condition={!summary}>
                                        <RHFTextField
                                            name={'summary'}
                                            label={t('summary.label')}
                                            aria-label={t('summary.label')}
                                            error={!!errors.summary}
                                            helperText={errors.summary ? errors.summary.message : ''}
                                            required
                                        />
                                        </RHFRequiredTextFieldWrapper>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <RHFRequiredTextFieldWrapper condition={!description}>
                                        <RHFTextField name="description" label={t('description.label')} minRows={3} multiline />
                                    </RHFRequiredTextFieldWrapper>
                                </Grid>
                        </Grid>
                        <Grid container spacing={2} p={1.5}>
                            <GridViewTitle title={t('attachment.attachments.label')} />
                            <Grid item xs={12} sm={12} md={12}>
                                <RHFUpload
                                    name="files"
                                    dropZone={true}
                                    multiple
                                    thumbnail
                                    imagesOnly
                                    onDrop={handleDropMultiFile}
                                    onRemove={handleFileRemove}
                                    onRemoveAll={() => setValue('files', '', { shouldValidate: true })}
                                />
                            </Grid>
                        </Grid>

                    </Card>
                </Box>
            </Grid>
        )}
    </Grid>
    <Grid container direction={{ xs: FLEX_DIR.COLUMN, md: FLEX_DIR.ROW }} justifyContent={FLEX.FLEX_END} sx={{ my: 5 }}>
     {/* <Grid item xs={12} sm={4} md={2} display={FLEX.FLEX} justifyContent={isMobile ? FLEX.FLEX_START : FLEX.FLEX_END}>
      <RHFCheckbox name={FORM_EL.isInvite} label={t('enable_portal_access.label')} error={!!errors.isInvite} helperText={errors.isInvite ? errors.isInvite.message : ''} />
     </Grid> */}
    </Grid>
    <Grid container direction={{ xs: FLEX_DIR.COLUMN, md: FLEX_DIR.ROW }} justifyContent={KEY.CENTER}>
     <Grid item xs={12} sm={4} md={4} >
      <GStyledLoadingButton
       fullWidth
       color={KEY.INHERIT}
       size={SIZE.SMALL}
       type={'button'}
       variant={KEY.CONTAINED}
       loading={isConfirming}
       mode={themeMode}
       onClick={handleConfirmation}
       disabled={!isFormComplete}>
       {t('create_support_ticket.label').toUpperCase()}
      </GStyledLoadingButton>
      &nbsp;
      <GStyledDefLoadingButton
       fullWidth
       color={KEY.INHERIT}
       size={SIZE.SMALL}
       type={'button'}
       variant={KEY.CONTAINED}
       bgColor={themeMode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[800]}
       textColor={themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white}
       loading={isConfirming}
       mode={themeMode}
       onClick={handleConfirmCancel}>
       {t('go_back.label').toUpperCase()}
      </GStyledDefLoadingButton>
     </Grid>
     {/* spacer  */}
     <Box height={{ xs: 50, md: 100 }} />
    </Grid>

    {userInviteDialog && (
     <UserInviteSuccessDialog
      setIsConfirming={setIsConfirming}
      isSubmitSuccessful={isSubmitSuccessful}
      addAsContact={addAsContact}
      onConfirm={handleSubmit(onSubmit)}
      action={
       <GStyledLoadingButton color={KEY.INHERIT} type={KEY.SUBMIT} loading={isSubmitting} variant={KEY.CONTAINED} mode={themeMode}>
        {t('confirm.label').toUpperCase()}
       </GStyledLoadingButton>
      }
     />
    )}
   </FormProvider>

   {openConfirmDialog && (
       <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        title={t('unsaved_changes.label')}
        content={t('responses.messages.form_dirty')}
        onClick={handleCancel}
        actionButtonBgColor={theme.palette.error.dark}
        actionButtonTextColor={theme.palette.error.contrastText}
        i18ActionButtonLabel={'leave.label'}
        i18SubButtonLabel={'stay.label'}
       />
      )}
  </Fragment>
 )
}

export default TicketCreateForm
