import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { m } from 'framer-motion'
import { t } from 'i18next'
import { useAuthContext } from 'auth'
import { useNavigate } from 'react-router-dom'
import { ICON_NAME, Icon, snack, useSettingContext } from 'hook'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema } from 'schema'
import { Typography, Stack, Alert, Button, Grid, Box, Autocomplete, TextField, Chip } from '@mui/material'
import FormProvider, { RHFPhoneInput, RHFTextField, RHFCountryAutocomplete, RHFCheckbox, RHFAutocompleteLableName } from 'component/hook-form'
import { FormHeader } from 'component'
import { PATH_AUTH } from 'route/path'
import { RADIUS } from 'config'
import { DIV_ROLE, REGEX, LOCAL_STORAGE_KEY, RESPONSE, KEY, LABEL, VARIANT, SNACK, SIZE, COLOR, DEBUG } from 'constant'
import { a11yProps } from 'util'
import { useTheme } from '@mui/material/styles'
import { GStyledSpanBox, GStyledMachineChip, GStyledLoadingButton } from 'theme/style'
import { StyledTabBox, StyledTabs, StyledTab } from '../style'

const { TYPOGRAPHY } = VARIANT

function TabPanel({ children, value, index, ...other }) {
 return (
  <m.div role={DIV_ROLE.TAB_PANEL} hidden={value !== index} {...a11yProps(index)} {...other}>
   {value === index && <Box>{children}</Box>}
  </m.div>
 )
}

function RegisterForm() {
 const { contacts } = useSelector((state) => state.contact)
 const [tab, setTab] = useState(1)
 const [machineList, setMachineList] = useState([])
 const [isInfoComplete, setIsInfoComplete] = useState(false)
 const [isSiteComplete, setIsSiteComplete] = useState(false)
 const [isMachineListComplete, setIsMachineListComplete] = useState(false)
 const [provideSite, setProvideSite] = useState(false)
 const { themeMode } = useSettingContext()
 const navigate = useNavigate()
 const { login } = useAuthContext()
 const regEx = new RegExp(REGEX.ERROR_CODE)

 const defaultValues = {
  name: '',
  email: '',
  contacts: contacts,
  site: {},
  machines: []
 }

 const methods = useForm({
  resolver: yupResolver(LoginSchema),
  defaultValues
 })

 const {
  reset,
  setError,
  setValue,
  watch,
  handleSubmit,
  formState: { errors, isSubmitting, isSubmitSuccessful }
 } = methods

 const { email } = watch()

 const checkInfoCompletion = () => {
  const { name, contactName, email, phone } = methods.getValues()
  setIsInfoComplete(!!name && !!contactName && !!email)
 }

 const checkSiteCompletion = () => {
  const { street, suburb, city, region, postcode, country } = methods.getValues()
  setIsSiteComplete(!!street && !!suburb && !!city && !!region && !!postcode && !!country)
 }

 const checkMachineListCompletion = () => {
  setIsMachineListComplete(machineList.length > 0)
 }

 useEffect(() => {
  const subscription = methods.watch(() => {
   checkInfoCompletion()
   checkSiteCompletion()
   checkMachineListCompletion()
  })
  return () => subscription.unsubscribe()
 }, [methods, machineList])

 useEffect(() => {
  const storedHowickUserData = localStorage.getItem(LOCAL_STORAGE_KEY.HOWICK_USER_DATA)
  if (storedHowickUserData) {
   const { email, remember } = JSON.parse(storedHowickUserData)
   setValue(KEY.EMAIL, email)
   setValue(KEY.REMEMBER, remember)
  }
 }, [])

 const handleChange = (event, newValue) => {
  setTab(newValue)
 }

 const onSubmit = async (data) => {
  try {
   if (remember) {
    const HowickUserData = { email, remember }
    localStorage.setItem(LOCAL_STORAGE_KEY.HOWICK_USER_DATA, JSON.stringify(HowickUserData))
   } else {
    localStorage.removeItem(LOCAL_STORAGE_KEY.USER_DATA)
   }
   await login(data.email, data.password)
   if (localStorage.getItem(LOCAL_STORAGE_KEY.MFA)) {
    navigate(PATH_AUTH.authenticate)
    localStorage.removeItem(LOCAL_STORAGE_KEY.MFA)
   }
   reset()
  } catch (error) {
   if (regEx.test(error.MessageCode)) {
    console.error(DEBUG.AUTH_LOGIN_ERROR, error?.Message || '')
    snack(RESPONSE.error.INVALID_CREDENTIALS, { variant: COLOR.ERROR })
    reset()
    setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, {
     ...error,
     message: error.Message
    })
   } else {
    console.error(DEBUG.AUTH_LOGIN_ERROR, error || '')
    snack(RESPONSE.error.INVALID_CREDENTIALS, { variant: COLOR.ERROR })
    setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, {
     ...error,
     message: error
    })
   }
  }
 }

 const validateSerialNumbers = (value) => {
  const serialNumbers = value.split(',')
  let isValid = true

  serialNumbers.forEach((serialNumber) => {
   if (serialNumber.length !== 5) {
    isValid = false
   }
  })
  return isValid
 }

 const handleMachineList = (event) => {
  const { value } = event.target
  const characterCount = value ? Array.from(value).length : 0
  if (characterCount === 5) {
   setMachineList([...machineList, value])
  } else {
   setMachineList([...machineList])
  }
 }

 const handleProvideSiteToggle = (event) => {
  setProvideSite(event.target.checked)
 }

 const handleNextButton = (isCompleted) => {
  isCompleted && setTab(tab + 1)
 }

 const renderInfo = () => {
  return (
   <Fragment>
    <Stack spacing={3} sx={{ mt: 2, mb: 2 }}>
     {!!errors.afterSubmit || (errors.afterSubmit && <Alert severity="error">{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>)}
     <RHFTextField type="text" name="name" label="Name" autoComplete={LABEL.NAME} aria-label={LABEL.NAME} required />
     <RHFTextField type="text" name="contactName" label="Contact Name" autoComplete={LABEL.NAME} aria-label={LABEL.NAME} helperText="Your organization name" required />
     <RHFTextField type={KEY.EMAIL} name={KEY.EMAIL} label="Email" autoComplete={KEY.EMAIL} aria-label={LABEL.LOGIN_EMAIL} required />
     <RHFPhoneInput name="phone" label="Phone" autoComplete={KEY.PHONE} aria-label="phone" />
    </Stack>
    <Grid container justifyContent={'flex-end'}>
     <Grid item sm={2}>
      <Button onClick={() => handleNextButton(isInfoComplete)} disabled={!isInfoComplete}>
       <Icon icon={ICON_NAME.CHEVRON_RIGHT} width={42} />
      </Button>
     </Grid>
    </Grid>
   </Fragment>
  )
 }

 const renderSite = () => {
  return (
   <Fragment>
    <Stack spacing={3} sx={{ mt: 2, mb: 2 }}>
     {!!errors.afterSubmit || (errors.afterSubmit && <Alert severity="error">{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>)}
     <RHFCheckbox name="dontProvideSite" label="I Don't want to provide site information" onChange={handleProvideSiteToggle} />
     <RHFAutocompleteLableName name="siteType" label="Site Type" options={['Billing', 'Shipping', 'Main']} disabled={provideSite} />
     <RHFTextField name="street" label="Street" disabled={provideSite} />
     <RHFTextField name="suburb" label="Suburb" disabled={provideSite} />
     <RHFTextField name="city" label="City" disabled={provideSite} />
     <GStyledSpanBox>
      <RHFTextField name="region" label="Region" disabled={provideSite} />
      <RHFTextField name="postcode" label="Post Code" disabled={provideSite} />
     </GStyledSpanBox>
     <RHFCountryAutocomplete name="country" label="Country" disabled={provideSite} />
    </Stack>
    <Grid container justifyContent={'flex-end'}>
     <Grid item sm={2}>
      <Button onClick={() => handleNextButton(isSiteComplete)} disabled={!isSiteComplete || provideSite}>
       <Icon icon={ICON_NAME.CHEVRON_RIGHT} width={42} />
      </Button>
     </Grid>
    </Grid>
   </Fragment>
  )
 }

 const renderMachineList = () => {
  return (
   <Fragment>
    <Stack spacing={3} sx={{ mt: 2, mb: 2 }}>
     {!!errors.afterSubmit || (errors.afterSubmit && <Alert severity="error">{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>)}
     <Autocomplete
      multiple
      freeSolo
      options={[]}
      value={machineList}
      onChange={(event, newValue) => {
       setMachineList(newValue)
      }}
      renderTags={(value, getTagProps) =>
       value.map((option, index) => <GStyledMachineChip label={<Typography variant={TYPOGRAPHY.H4}>{option}</Typography>} mode={themeMode} {...getTagProps({ index })} />)
      }
      option
      renderInput={(params) => <TextField {...params} variant="outlined" label="Machines" placeholder="Enter machine Serial Numbers" helperText="Press enter at the end of each serial number" />}
     />
    </Stack>
    <GStyledLoadingButton
     fullWidth
     isLoading={isSubmitting}
     color={KEY.INHERIT}
     size={SIZE.LARGE}
     type={KEY.SUBMIT}
     variant={KEY.CONTAINED}
     loading={isSubmitSuccessful || isSubmitting}
     disabled={machineList.length === 0}
     sx={RADIUS.BORDER}>
     {'REGISTER'}
    </GStyledLoadingButton>
   </Fragment>
  )
 }

 return (
  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
   {/* <FormHeader label={'Registration'} />bab */}
   <StyledTabBox>
    <StyledTabs value={tab} onChange={handleChange} variant={VARIANT.FULL_WIDTH} centered>
     <StyledTab label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{'Basic Info'}</Typography>} {...a11yProps(1)} mode={themeMode} isComplete={isInfoComplete} />
     <StyledTab label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{'Site'}</Typography>} {...a11yProps(2)} mode={themeMode} isComplete={isSiteComplete} disabled={!isInfoComplete} />
     <StyledTab
      label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{'Machines'}</Typography>}
      {...a11yProps(3)}
      mode={themeMode}
      isComplete={isMachineListComplete}
      disabled={!isSiteComplete || !provideSite}
     />
    </StyledTabs>
   </StyledTabBox>
   <TabPanel value={1} index={1} hidden={tab !== 1}>
    {renderInfo()}
   </TabPanel>
   <TabPanel value={2} index={2} hidden={tab !== 2}>
    {renderSite()}
   </TabPanel>
   <TabPanel value={3} index={3} hidden={tab !== 3}>
    {renderMachineList()}
   </TabPanel>
  </FormProvider>
 )
}

export default RegisterForm
