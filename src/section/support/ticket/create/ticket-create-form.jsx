import { Fragment, useEffect, useState, useCallback, useRef } from 'react'
import _ from 'lodash'
import debounce from 'lodash.debounce'
import { t } from 'i18next'
import { enc, MD5, lib } from 'crypto-js';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from 'auth/use-auth-context'
import { IconFlexi, snack, useResponsive, useSettingContext } from 'hook'
import { dispatch } from 'store'
import { useForm } from 'react-hook-form'
import {
  createTicket,
  getCustomer,
  getSecurityUsers,
  getActiveContacts,
  getTicketSettings,
  getCustomerMachines,
  getSoftwareVersion,
  deleteFile,
  setTicketCreateSuccessDialog,
  resetTicketSettings,
  resetCustomerMachines,
  resetSoftwareVersion
} from 'store/slice'
import { PATH_DASHBOARD, PATH_SUPPORT } from 'route/path'
import { TicketSchema } from 'schema'
import { useTicketCreateDefaultValues } from 'section/support'
import { useTheme, Grid, Box, Card } from '@mui/material'
import { RHFRequiredTextFieldWrapper, RHFUpload, ConfirmDialog, TicketCreateSuccessDialog, GridViewTitle, BackButton } from 'component'
import FormProvider, { RHFTextField, RHFAutocomplete, RHFDatePickr, RHFTimePicker, RHFSwitch, RHFEditor } from 'component/hook-form'
import { GStyledLoadingButton, GStyledDefLoadingButton, GStyledStickyFormGrid, GCardOption, GStyledTopBorderDivider } from 'theme/style'
import { REGEX, LOCAL_STORAGE_KEY, KEY, COLOR, FLEX_DIR } from 'constant'
import { delay, deepEqual } from 'util'

/**
 * Creating a new ticket form
 * @returns {JSX.Element}
 */
function TicketCreateForm() {
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [isSuccessState, setIsSuccessState] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [filteredRequestTypes, setFilteredRequestTypes] = useState([]);
  const { customer, softwareVersion, activeContacts, securityUserTotalCount, customerMachines, ticketSettings, ticketCreateSuccessDialog } = useSelector(
    state => ({
      customer: state.customer.customer,
      activeContacts: state.contact.activeContacts,
      securityUserTotalCount: state.user.securityUserTotalCount,
      userInviteDialog: state.user.userInviteDialog,
      customerMachines: state.machine.customerMachines,
      customerRoles: state.role.customerRoles,
      isLoading: state.ticket.isLoading,
      softwareVersion: state.ticket.softwareVersion,
      ticketSettings: state.ticket.ticketSettings,
      ticketCreateSuccessDialog: state.ticket.ticketCreateSuccessDialog
    }),
    _.isEqual
  )

  const { user } = useAuthContext()
  const { themeMode } = useSettingContext()
  const theme = useTheme()
  const navigate = useNavigate()
  const regEx = new RegExp(REGEX.ERROR_CODE)
  const isMobile = useResponsive('down', 'sm')
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

  const defaultValues = useTicketCreateDefaultValues(customer, softwareVersion)
  const methods = useForm({
    resolver: yupResolver(TicketSchema('new')),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const { reset, setValue, setError, watch, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods
  const { machine, issueType, summary, description, files, requestType } = watch()

  const checkFormCompletion = useCallback(() => {
    setIsFormComplete(!!machine && !!issueType && !!summary)
  }, [machine, issueType, summary])

  useEffect(() => {
    if (machine?._id) {
      dispatch(getSoftwareVersion(machine._id, customer?._id))
    }
    return () => {
      dispatch(resetSoftwareVersion());
    }
  }, [dispatch, machine])

  useEffect(() => {
    if (softwareVersion) {
      setValue('hlc', softwareVersion.hlc || t('not_applicable.abbr'))
      setValue('plc', softwareVersion.plc || t('not_applicable.abbr'))
    }
  }, [softwareVersion, setValue])

  // useEffect to watch issueType changes and filter requestTypes
  useEffect(() => {
    if (!issueType || !ticketSettings?.requestTypes) {
      // If issueType is cleared, reset the dependent requestType and list
      setFilteredRequestTypes([]);
      setValue('requestType', null);
      return;
    }

    const filtered = ticketSettings.requestTypes.filter(
      (requestType) => requestType.issueType?._id === issueType._id
    );

    setFilteredRequestTypes(filtered);

    // Optional: If the current selected requestType isn't in filtered, clear it
    setValue('requestType', (current) => {
      const stillValid = filtered.find(rt => rt._id === current?._id);
      return stillValid ? current : null;
    });

  }, [issueType, ticketSettings?.requestTypes, setValue]);


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
    return () => {
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
        reject(new Error(`Error reading file: ${file?.name || ''}`))
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
    const newFiles = (Array.isArray(files) && files?.length > 0) ? [...files] : []
    acceptedFiles.forEach((file, index) => {
      const eTag = hashes[index];
      if (!newFiles?.some((el) => el?.eTag === eTag)) {
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

  const handleFileRemove = useCallback(async (inputFile) => {
    try {
      setValue('files', files?.filter((el) => (inputFile?._id ? el?._id !== inputFile?._id : el !== inputFile)), { shouldValidate: true })
      if (inputFile?._id) {
        dispatch(deleteFile(inputFile?.ticket, inputFile?._id))
      }
    } catch (e) {
      console.error(e)
    }
  }, [setValue, files, dispatch])

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

  const onSubmit = async (data) => {
    try {
      await dispatch(createTicket(data))
      await delay(1000)
      reset()
      dispatch(setTicketCreateSuccessDialog(true))
    } catch (error) {
      handleSubmissionError(error)
    }
  }

  const handleBackAction = event => {
    navigate(PATH_SUPPORT.tickets.list)
  }

  const isServiceRequest = issueType?.name?.trim()?.toLowerCase() === KEY.SERVICE_REQUEST
  const isChangeRequest = issueType?.name?.trim()?.toLowerCase() === KEY.CHANGE_REQUEST

  return (
    <Fragment>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction={{ xs: 'column', md: 'row' }} flex={1} rowSpacing={4} gridAutoFlow={isMobile ? FLEX_DIR.COLUMN : FLEX_DIR.ROW} columnSpacing={2}>
          <Grid item xs={12} sm={12} lg={12}>
            <BackButton handleBackAction={handleBackAction} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Box mt={0} mb={2}>
              <Card {...GCardOption(themeMode)}>
                <GStyledTopBorderDivider mode={themeMode} />
                <Grid container spacing={2} p={1.5}>
                  <Grid item xs={12} sm={12} md={4}>
                    <RHFRequiredTextFieldWrapper condition={!machine}>
                      <RHFAutocomplete
                        name={'machine'}
                        label={t('machine.label')}
                        options={customerMachines || []}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        getOptionLabel={option => `${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}
                        renderOption={(props, option) => <li {...props} key={option?._id}>{`${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}</li>}
                        helperText={errors.machine ? errors.machine.message : ''}
                        required
                      />
                    </RHFRequiredTextFieldWrapper>
                  </Grid>

                  {/* {machine && (
          <Fragment>
           <Grid item xs={12} sm={12} md={6}>
            <RHFTextField name={'machineModel'} label={t('machine_model.label')} value={machine?.machineModel?.name || ''} InputProps={{ readOnly: true }} />
           </Grid>
           <Grid item xs={12} sm={6} md={6}>
            <RHFTextField name={"hlc"} label={t('hmi_version.label')} disabled />
           </Grid>
           <Grid item xs={12} sm={6} md={6}>
            <RHFTextField name={"plc"} label={t('plc_version.label')} disabled />
           </Grid>
          </Fragment>
         )} */}

                  <Fragment>
                    <Grid item xs={12} sm={12} md={4}>
                      <RHFTextField name={'machineModel'} label={t('machine_model.label')} value={machine?.machineModel?.name || ''} InputProps={{ readOnly: true }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <RHFTextField name={"hlc"} label={t('hmi_version.label')} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <RHFTextField name={"plc"} label={t('plc_version.label')} disabled />
                    </Grid>
                  </Fragment>

                  <Grid item xs={12} md={6}>
                    <RHFRequiredTextFieldWrapper condition={!issueType}>
                      <RHFAutocomplete
                        name="issueType"
                        label={t('issue_type.label')}
                        options={ticketSettings?.issueTypes || []}
                        isOptionEqualToValue={(option, value) => option?._id === value?._id}
                        getOptionLabel={(option) => option?.name || ''}
                        renderOption={(props, option) => (
                          <li {...props} key={option?._id}>{option?.name || ''}</li>
                        )}
                        required
                      />
                    </RHFRequiredTextFieldWrapper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <RHFRequiredTextFieldWrapper condition={!requestType}>
                      <RHFAutocomplete
                        name="requestType"
                        label={t('request_type.label')}
                        options={filteredRequestTypes}
                        isOptionEqualToValue={(option, value) => option?._id === value?._id}
                        getOptionLabel={(option) => option?.name || ''}
                        renderOption={(props, option) => (
                          <li {...props} key={option?._id}>{option?.name || ''}</li>
                        )}
                        required
                        disabled={!issueType} // Disable if no issueType selected
                      />
                    </RHFRequiredTextFieldWrapper>
                  </Grid>

                </Grid>
              </Card>
            </Box>
            {/* <Grid container direction={{ xs: FLEX_DIR.COLUMN, md: FLEX_DIR.ROW }} justifyContent={KEY.CENTER} gap={2}>
       <Grid item xs={12} sm={12} md={12}>
        <GStyledLoadingButton fullWidth color={KEY.INHERIT} type={KEY.SUBMIT} mode={themeMode} loading={isSubmitting} disabled={!isFormComplete}>
         {t('create_support_ticket.label').toUpperCase()}
        </GStyledLoadingButton>
       </Grid>
       <Grid item xs={12} sm={12} md={12}>
        <GStyledDefLoadingButton
         fullWidth
         type={'button'}
         color={KEY.INHERIT}
         variant={KEY.CONTAINED}
         bgColor={themeMode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[800]}
         textColor={themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white}
         mode={themeMode}
         onClick={handleConfirmCancel}>
         {t('go_back.label').toUpperCase()}
        </GStyledDefLoadingButton>
       </Grid>
      </Grid> */}
          </Grid>

          {(issueType && machine && requestType) && (
            <Grid item xs={12} sm={9} md={12}>
              <Box mb={2} mt={0}>
                <Card {...GCardOption(themeMode)}>
                  <GStyledTopBorderDivider mode={themeMode} />
                  <Grid container spacing={2} p={1.5}>
                    <Grid item xs={12} sm={12} md={12}>
                      <RHFRequiredTextFieldWrapper condition={!summary}>
                        <RHFTextField name={'summary'} label={t('summary.label')} aria-label={t('summary.label')} error={!!errors.summary} helperText={errors.summary ? errors.summary.message : ''} required />
                      </RHFRequiredTextFieldWrapper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <RHFEditor name={'description'} label={t('description.label')} minRows={3} multiline />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} p={1.5}>
                    <GridViewTitle title={t('attachment.attachments.label')} />
                    <Grid item xs={12} sm={12} md={12}>
                      <RHFUpload
                        name={'files'}
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
                  <Grid container spacing={2} p={1.5}>
                    <Grid item xs={12} sm={12} md={6}>
                      <RHFRequiredTextFieldWrapper condition={!issueType}>
                        <RHFAutocomplete
                          name={'priority'}
                          label={t('priority.label')}
                          options={ticketSettings?.priorities || []}
                          isOptionEqualToValue={(option, value) => option._id === value._id}
                          getOptionLabel={option => option?.name || ''}
                          renderOption={(props, option) => (
                            <li {...props} key={option?._id}>
                              <IconFlexi
                                icon={option?.icon}
                                color={option?.color}
                              />{' '}
                              {option.name && option.name}
                            </li>
                          )}
                        />
                      </RHFRequiredTextFieldWrapper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <RHFRequiredTextFieldWrapper condition={!issueType}>
                        <RHFAutocomplete
                          name={'impact'}
                          label={t('impact.label')}
                          options={ticketSettings?.impacts || []}
                          isOptionEqualToValue={(option, value) => option._id === value._id}
                          getOptionLabel={option => `${option.name || ''}`}
                          renderOption={(props, option) => (
                            <li {...props} key={option?._id}>
                              {option.name && option.name}
                            </li>
                          )}
                        />
                      </RHFRequiredTextFieldWrapper>
                    </Grid>
                  </Grid>

                  {isChangeRequest && (
                    <Grid container spacing={2} p={1.5}>
                      <Grid item xs={12} sm={12} md={6}>
                        <RHFAutocomplete
                          name={'changeType'}
                          label={t('change_type.label')}
                          options={ticketSettings?.changeTypes || []}
                          isOptionEqualToValue={(option, value) => option._id === value._id}
                          getOptionLabel={option => `${option.name || ''}`}
                          renderOption={(props, option) => (
                            <li {...props} key={option?._id}>
                              {option.name && option.name}
                            </li>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <RHFAutocomplete
                          name={'changeReason'}
                          label={t('change_reason.label')}
                          options={ticketSettings?.changeReasons || []}
                          isOptionEqualToValue={(option, value) => option._id === value._id}
                          getOptionLabel={option => `${option.name || ''}`}
                          renderOption={(props, option) => (
                            <li {...props} key={option?._id}>
                              {option.name && option.name}
                            </li>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <RHFEditor name='implementationPlan' label={t('implementation_plan.label')} minRows={4} multiline />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <RHFEditor name='backoutPlan' label={t('backout_plan.label')} minRows={4} multiline />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <RHFEditor name='testPlan' label={t('test_plan.label')} minRows={4} multiline />
                      </Grid>
                    </Grid>
                  )}
                  {isServiceRequest && (
                    <Grid container spacing={2} p={1.5}>
                      <Grid item xs={12} sm={12} md={12}>
                        <RHFAutocomplete
                          name='investigationReason'
                          label={t('investigation_reason.label')}
                          options={ticketSettings?.investigationReasons || []}
                          isOptionEqualToValue={(option, value) => option._id === value._id}
                          getOptionLabel={option => `${option.name || ''}`}
                          renderOption={(props, option) => (
                            <li {...props} key={option?._id}>
                              {option.name && option.name}
                            </li>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <RHFEditor name='rootCause' label={t('root_cause.label')} minRows={4} multiline />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <RHFEditor name='workaround' label={t('workaround.label')} minRows={4} multiline />
                      </Grid>
                    </Grid>
                  )}
                  {isChangeRequest && (
                    <Grid container spacing={2} p={1.5}>
                      <Grid item xs={12} sm={6} md={3}>
                        <RHFDatePickr name={'plannedStartDate'} label={t('planned_start_date.label')} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <RHFTimePicker name={'startTime'} label={t('planned_start_time.label')} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <RHFDatePickr name={'plannedEndDate'} label={t('planned_end_date.label')} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <RHFTimePicker name={'endTime'} label={t('planned_end_time.label')} />
                      </Grid>
                    </Grid>
                  )}
                  <Grid container spacing={2} p={2}>
                    <Grid item xs={12} sm={4} md={2}>
                      <RHFSwitch name={'shareWith'} label={t('set_private.label')} helperText={errors.shareWith ? errors.shareWith.message : ''} />
                    </Grid>
                  </Grid>
                </Card>

              </Box>
              <Grid container direction={{ xs: FLEX_DIR.COLUMN, md: FLEX_DIR.ROW }} justifyContent={KEY.END} gap={2}>
                <Grid marginTop={4} item xs={12} sm={12} md={3}>
                  <GStyledLoadingButton fullWidth color={KEY.INHERIT} type={KEY.SUBMIT} mode={themeMode} loading={isSubmitting} disabled={!isFormComplete}>
                    {t('create_support_ticket.label').toUpperCase()}
                  </GStyledLoadingButton>
                </Grid>
              </Grid>
              <Grid container direction={{ xs: FLEX_DIR.COLUMN, md: FLEX_DIR.ROW }} justifyContent={KEY.END} gap={2}>
                <Grid item marginTop={1} mb={2} xs={12} sm={12} md={3}>
                  <GStyledDefLoadingButton
                    fullWidth
                    type={'button'}
                    color={KEY.INHERIT}
                    variant={KEY.CONTAINED}
                    bgColor={themeMode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[800]}
                    textColor={themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white}
                    mode={themeMode}
                    onClick={handleConfirmCancel}>
                    {t('go_back.label').toUpperCase()}
                  </GStyledDefLoadingButton>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </FormProvider>

      {ticketCreateSuccessDialog && (
        <TicketCreateSuccessDialog />
      )}

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
