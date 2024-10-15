import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { m } from 'framer-motion'
import { useAuthContext } from 'auth'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { ICON_NAME, Icon, snack, useSettingContext } from 'hook'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema } from 'schema'
import { Typography, Stack, Alert, Button, Grid, Box, Autocomplete, TextField, Chip } from '@mui/material'
import { GStyledSpanBox, GStyledMachineChip } from 'theme/style'
import FormProvider, { RHFPhoneInput, RHFTextField, RHFCountryAutocomplete, RHFCheckbox } from 'component/hook-form'
import { PATH_AUTH } from 'route/path'
import { DIV_ROLE, REGEX, LOCAL_STORAGE_KEY, RESPONSE, KEY, LABEL, FLEX, VARIANT, SNACK, SIZE, COLOR, DEBUG } from 'constant'
import { a11yProps } from 'util'
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
  const { customer } = useSelector((state) => state.customer)
  const { contacts } = useSelector((state) => state.contact)
  const [tab, setTab] = useState(1)
  const [machineList, setMachineList] = useState([])
  const { themeMode } = useSettingContext()
  const navigate = useNavigate()
  const { login } = useAuthContext()
  const regEx = new RegExp(REGEX.ERROR_CODE)

  const defaultValues = {
    name: '',
    email: '',
    contacts: contacts,
    site: {
      // name: customer.site.name,
      // address: customer.site.address,
      // city: customer.site.city,
      // state: customer.site.state,
      // zip: customer.site.zip,
      // country: customer.site.country,
      // phone: customer.site.phone,
      // email: customer.site.email,
      // contact: customer.site.contact,
      // timezone: customer.site.timezone,
      // currency: customer.site.currency,
    }
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

  const { remember, email, password } = watch()

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
        const HowickUserData = {
          email,
          remember
        }

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

    if (validateSerialNumbers(value)) {
      setMachineList(value.split(','))
    } else {
      setMachineList([])
    }

    const renderInfo = () => {
      return (
        <Fragment>
          <Stack spacing={3} sx={{ mt: 2, mb: 2 }}>
            {!!errors.afterSubmit || (errors.afterSubmit && <Alert severity="error">{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>)}
            <RHFTextField type="text" name="name" label="Name" autoComplete={LABEL.NAME} aria-label={LABEL.NAME} required />
            <RHFTextField
              type="text"
              name="contactName"
              label="Contact Name"
              autoComplete={LABEL.NAME}
              aria-label={LABEL.NAME}
              // placeholder="Organization"
              helperText="Your organization name"
              required
            />
            <RHFTextField type={KEY.EMAIL} name={KEY.EMAIL} label="Email" autoComplete={KEY.EMAIL} aria-label={LABEL.LOGIN_EMAIL} required />
            <RHFPhoneInput name="phone" label="Phone" autoComplete={KEY.PHONE} aria-label="phone" />
          </Stack>
          <Grid container justifyContent={'flex-end'}>
            <Grid item sm={2}>
              <Button>
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
            <RHFTextField name="street" label="Street" />
            <RHFTextField name="suburb" label="Suburb" />
            <RHFTextField name="city" label="City" />
            <GStyledSpanBox>
              <RHFTextField name="region" label="Region" />
              <RHFTextField name="postcode" label="Post Code" />
            </GStyledSpanBox>
            <RHFCountryAutocomplete name="country" label="Country" />
          </Stack>
          <Grid container justifyContent={'flex-end'}>
            <Grid item sm={2}>
              <Button>
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
                handleMachineList(newValue)
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <GStyledMachineChip
                    label={<Typography variant={TYPOGRAPHY.H4}>{option}</Typography>}
                    mode={themeMode}
                    {...getTagProps({ index })}
                  />
                ))
              }
              option
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Machines"
                  placeholder="Enter machine names"
                  helperText="Enter Machine Serial Numbers"
                />
              )}
            />
          </Stack>
          <Grid container justifyContent={'flex-end'}>
            <Grid item sm={2}>
              <Button>
                <Icon icon={ICON_NAME.CHEVRON_RIGHT} width={42} />
              </Button>
            </Grid>
          </Grid>
        </Fragment>
      )
    }

    return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <FormHeader label={'Registration'} />
        <StyledTabBox>
          <StyledTabs value={tab} onChange={handleChange} variant={VARIANT.FULL_WIDTH} centered>
            <StyledTab
              // disabled={value.installationSiteObj === ''}
              label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{'Basic Info'}</Typography>}
              {...a11yProps(1)}
              mode={themeMode}
            />
            <StyledTab
              // disabled={value.billingSiteObj === ''}
              label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{'Site'}</Typography>}
              {...a11yProps(2)}
              mode={themeMode}
            />
            <StyledTab
              // disabled={value.billingSiteObj === ''}
              label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{'Machines'}</Typography>}
              {...a11yProps(3)}
              mode={themeMode}
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
}

export default RegisterForm
