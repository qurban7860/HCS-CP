import { useState, useRef, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, dispatch } from 'store'
import { useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Badge, TextField, Typography, List, ListItem, ListItemText, Grid, Divider, Chip, Card, CardMedia, IconButton } from '@mui/material'
import { useGetMachineQuery, useGetMachineViaCustomerQuery, useGetCustomerQuery } from 'store/slice'
import { useForm, Controller } from 'react-hook-form'
import FormProvider, { RHFTextField, RHFAutocomplete } from 'component/hook-form'
import { GStyledScrollContainerGrid } from 'theme/style'
import { ViewFormField } from 'component/viewform'
import { MotionLazyContainer } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { machineSchema } from 'schema'
import { useGetUserQuery } from 'store/slice'
import { useIcon, ICON_NAME, snack } from 'hook'
import { MARGIN, RADIUS, ASSET } from 'config'
import { KEY, TITLE, LABEL, RESPONSE, COLOR, TYPOGRAPHY_VARIANT } from 'constant'
import { mockUser, mockMachineConnections } from '_mock'
import { fDate } from 'util/format'
import { parseAddress } from 'util/address-parser'

const MachineLayout = () => {
  const { id } = useParams()
  const [hoverAvatar, setHoverAvatar] = useState(false)
  const [hoverBadge, setHoverBadge] = useState(false)
  const [isNotEditState, setIsNotEditState] = useState(true)
  const [isIdReady, setIsIdReady] = useState(false)

  const { Icon, iconSrc: ticketStatusIconSrc } = useIcon(ICON_NAME.TIX_STATUS)
  const { iconSrc: editSrc } = useIcon(ICON_NAME.EDIT)
  const { iconSrc: saveSrc } = useIcon(ICON_NAME.SAVE)

  //  const { machine } = useSelector((state) => state.machine)
  const { user: userState, userId } = useSelector((state) => state.auth)
  const { data: securityUser, isLoading, error, refetch } = useGetUserQuery(userId)
  const { data: machineData, isLoading: machineIsLoading, error: machineError, refetch: machineRefetch } = useGetMachineQuery(id)

  const { themeMode } = useSettingContext()
  const fileInput = useRef(null)

  useEffect(() => {
    if (machineError) {
      snack(RESPONSE.error.FETCH, { variant: COLOR.ERROR })
    } else if (machineIsLoading) {
      snack(RESPONSE.FETCH_LOADING)
    } else {
      snack(RESPONSE.success.FETCH_DATA, { variant: COLOR.SUCCESS })

      // machineRefetch()
    }
    machineRefetch()
  }, [machineRefetch, id, machineData, machineIsLoading, machineError])

  const defaultValues = useMemo(() => {
    return {
      serialNo: machineData?.serialNo || '',
      name: machineData?.name || '',
      alias: machineData?.alias || [],
      profile: machineData?.profile?.default?.size || '',
      parentSerialNo: machineData?.parentMachine || '',
      previousMachine: machineData?.parentMachine?.name || '',
      supplier: machineData?.supplier || '',
      category: machineData?.machineModel?.category || '',
      machineModel: machineData?.machineModel?.name || '',
      manufactureDate: machineData?.manufactureDate || '',
      purchaseDate: fDate(machineData?.purchaseDate) || '',
      customer: machineData?.customer?.name || '',
      financialCompany: machineData?.financialCompany?.name || '',
      machineConnectionVal: machineData?.machineConnections?.map((connection) => connection?.serialNo) || [],
      status: machineData?.status?.name || '',
      workOrderRef: machineData?.workOrderRef || '',
      installationSite: parseAddress(machineData?.instalationSite?.address) || '',
      installationSiteLat: machineData?.instalationSite?.lat || '',
      installationSiteLong: machineData?.instalationSite?.long || '',
      installationDate: machineData?.installationDate || '',
      shippingDate: fDate(machineData?.shippingDate) || '',
      siteMilestone: machineData?.siteMilestone || '',
      projectManager: machineData?.projectManager || '',
      supportManager: machineData?.supportManager || '',
      accountManager: machineData?.accountManager || '',
      supportExpireDate: machineData?.supportExpireDate || null,
      description: machineData?.description || '',
      isActive: machineData?.isActive || false
    }
  }, [machineData])

  const methods = useForm({
    resolver: yupResolver(machineSchema),
    defaultValues
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = methods

  const onSubmit = async (data) => {
    try {
      await dispatch(updateSecurityUser(data, securityUser._id))
      // await dispatch(getSecurityUser(securityUser._id))
      reset()
      navigate(PATH_SECURITY.users.profile)
    } catch (error) {
      enqueueSnackbar(error, { variant: `error` })
      console.log('Error:', error)
    }
  }

  const handleEdit = () => {
    setIsNotEditState((prev) => !prev)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    console.log(file)
  }

  const handleHoverAvatar = () => {
    setHoverAvatar((prev) => !prev)
  }

  const handleHoverBadge = () => {
    setHoverBadge((prev) => !prev)
  }

  // TODO: #HPS-1053 when machine slice/reducers replace this mock data
  const machineList = [
    { id: 20566, name: 'FRAMA3200', status: 'Running' },
    { id: 20567, name: 'Decoiler', status: 'Running' },
    { id: 15699, name: 'H100', status: 'Stopped' }
  ]
  // TODO: #HPS-1062 when JIRA api integated, replace this mock data
  const ticketList = [{ id: 'HWKSC-12345', status: 'Under Review', agent: 'Maria Clara' }]

  return (
    <MotionLazyContainer display="flex">
      {/*  TODO: Make responsive */}
      {/* {TODO: refactor  */}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} flexDirection="row" {...MARGIN.PAGE_PROP}>
          <Grid item lg={3}>
            <Grid container mb={2}>
              <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
                <Box
                  bgcolor={themeMode === 'light' ? 'success.main' : 'grey.800'}
                  flex={1}
                  px={2}
                  pt={2}
                  sx={{
                    backgroundImage: `url(${ASSET.BG_STROKE_LOGO})`,
                    backgroundSize: 'cover',
                    backgroundPositionY: 'center',
                    backgroundSize: '150%'
                  }}>
                  <Typography variant="h6" color="common.white" gutterBottom>
                    {LABEL.MACHINE_HISTORY}
                  </Typography>
                </Box>
                <List>
                  {machineList.map((mach) => (
                    <ListItem key={mach.id}>
                      <Grid container alignItems="center">
                        <Grid item xs={8}>
                          <ListItemText primary={mach.id} secondary={mach.name} />
                        </Grid>
                        <Grid item xs={4} flex={1} justifyContent="flex-end">
                          <ListItemText secondary="Date Transferred: 2021-09-01" />
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
            <Grid container mb={2}>
              <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
                <Box
                  bgcolor={themeMode === 'light' ? 'success.main' : 'grey.800'}
                  flex={1}
                  px={2}
                  pt={2}
                  sx={{
                    backgroundImage: `url(${ASSET.BG_STROKE_LOGO})`,
                    backgroundSize: 'cover',
                    backgroundPositionY: 'center',
                    backgroundSize: '150%'
                  }}>
                  <Typography variant="h6" color="common.white" gutterBottom>
                    {LABEL.CONNECTED_MACHINE}
                  </Typography>
                </Box>
                <List>
                  {machineList.map((mach) => (
                    <ListItem key={mach.id}>
                      <Grid container alignItems="center">
                        <Grid item xs={8}>
                          <ListItemText primary={mach.id} secondary={mach.name} />
                        </Grid>
                        <Grid item xs={4} flex={1} justifyContent="flex-end">
                          <ListItemText>
                            <Chip
                              label={<Typography variant="h6">{mach.status}</Typography>}
                              size="small"
                              variant="outlined"
                              sx={{
                                backgroundColor: mach.status === 'Stopped' ? 'error.main' : 'burnIn.main',
                                color: `common.${mach.status === 'Stopped' ? 'white' : 'black'}`,
                                fontWeight: 'bold'
                              }}
                            />
                          </ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
            <Grid container mb={2}>
              <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper" sx={{ height: '500px' }}>
                <Box
                  bgcolor={themeMode === 'light' ? 'success.main' : 'grey.800'}
                  flex={1}
                  px={2}
                  pt={2}
                  sx={{
                    backgroundImage: `url(${ASSET.BG_STROKE_LOGO})`,
                    backgroundSize: 'cover',
                    backgroundPositionY: 'center',
                    backgroundSize: '150%'
                  }}>
                  <Typography variant="h6" color="common.white" gutterBottom>
                    {LABEL.INSTALLATION_SITE}
                  </Typography>
                </Box>
                <Grid container m={2} alignItems="center" justifyContent="center" flexDirection="row">
                  <Grid item xs={12}>
                    <ListItemText primary={defaultValues.installationSite} />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ justifyContent: 'center', margin: 'auto', alignItems: 'center' }}>
                      <Typography variant={TYPOGRAPHY_VARIANT.H4}>{'MAP HERE'}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={12} lg={9}>
            <Box mb={2}>
              <Card
                height="100vh"
                m={2}
                sx={{
                  backgroundColor: themeMode === KEY.LIGHT ? 'background.paper' : 'background.default',
                  backgroundImage: `url(${themeMode === KEY.LIGHT ? ASSET.BG_STROKE_GREY_LOGO : ASSET.BG_STROKE_BRONZE_LOGO})`,
                  backgroundSize: '200%'
                }}>
                <Divider
                  sx={{
                    height: 2,
                    borderStyle: 'solid',
                    borderColor: themeMode === 'light' ? 'success.main' : 'grey.400',
                    borderWidth: 5
                  }}
                />

                <Grid container mb={10} px={1.5}>
                  <Grid item lg={8}>
                    <Box my={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <input accept="image/*" type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleFileChange} />
                      <Badge
                        onMouseEnter={handleHoverBadge}
                        onMouseLeave={handleHoverBadge}
                        overlap="circular"
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        badgeContent={
                          <Chip
                            icon={<Icon icon={editSrc} color="common.white" width={15} />}
                            size="small"
                            variant="filled"
                            onClick={() => {
                              fileInput.current.click()
                            }}
                            sx={{
                              borderColor: 'common.white',
                              color: 'success.main',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              display: hoverBadge ? 'block' : 'none'
                            }}
                          />
                        }>
                        <CardMedia
                          component="img"
                          src={mockUser[0].badge}
                          alt={mockUser[0]?.organization}
                          sx={{
                            width: 70,
                            height: 70,
                            objectFit: 'hidden',
                            borderRadius: '10%',
                            marginRight: 2
                          }}
                        />
                      </Badge>
                      <Controller
                        name="machineName"
                        control={control}
                        disabled={isNotEditState}
                        defaultValue={machineData?.customer?.name || 'Organization'}
                        rules={{ required: 'organization is required' }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="Organization"
                            variant={isNotEditState ? 'filled' : 'standard'}
                            error={!!error}
                            helperText={error?.message}
                            size="large"
                            fullWidth
                            fontWeight="bold"
                            InputProps={{
                              sx: {
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                backgroundColor: 'transparent',
                                '&.Mui-disabled': {
                                  backgroundColor: themeMode === KEY.LIGHT ? 'grey.200' : 'grey.900'
                                }
                              }
                            }}
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={4}>
                    <Grid container justifyContent="flex-end" flexDirection="column" alignContent="flex-end">
                      <Grid item xs={12}>
                        <Typography variant="h1" gutterBottom color={themeMode === KEY.LIGHT ? 'grey.400' : 'grey.800'}>
                          {isLoading ? 'isLoading...' : defaultValues?.serialNo}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} justifyContent="flex-end">
                        <Grid container justifyContent="flex-end">
                          <IconButton
                            onClick={handleEdit}
                            sx={{
                              backgroundColor: themeMode === KEY.LIGHT ? 'transparent' : 'grey.800',
                              border: `1px solid ${themeMode === KEY.LIGHT ? 'success.main' : 'grey.400'}`,
                              borderRadius: RADIUS.BORDER.borderRadius
                            }}>
                            {!isNotEditState ? (
                              <Icon icon={saveSrc} sx={{ color: themeMode === KEY.LIGHT ? 'primary.lighter' : 'grey.100' }} />
                            ) : (
                              <Icon icon={editSrc} sx={{ color: themeMode === KEY.LIGHT ? 'primary.lighter' : 'grey.100' }} />
                            )}
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={2} px={1.5} mb={5}>
                  <Grid item lg={12} my={1}>
                    <Typography variant="h5" gutterBottom>
                      {TITLE.MACHINE_KEY_DETAILS}
                    </Typography>
                  </Grid>
                  <Grid item lg={12} sm={12}>
                    <Grid container spacing={2} p={2} pb={5}>
                      <Grid item xs={6} sm={4}>
                        <ViewFormField heading="Serial Number" isLoading={isLoading}>
                          {machineData?.serialNo}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <ViewFormField heading="Machine Model" isLoading={isLoading}>
                          {machineData?.machineModel?.name}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <ViewFormField heading="Default Profile" isLoading={isLoading}>
                          {Array.isArray(machineData?.profiles)
                            ? machineData?.profiles[0].flange + 'X' + machineData?.profiles[0].web
                            : TITLE.NOT_PROVIDED}
                        </ViewFormField>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Box>
            <Box mb={2}>
              <Card
                height="100vh"
                m={2}
                mt={10}
                pt={2}
                sx={{
                  backgroundColor: themeMode === 'light' ? 'background.paper' : 'background.default',
                  backgroundImage: `url(${themeMode === KEY.LIGHT ? ASSET.BG_STROKE_GREY_LOGO : ASSET.BG_STROKE_BRONZE_LOGO})`,
                  backgroundSize: 'cover',
                  backgroundSize: '150%'
                }}>
                <Divider
                  sx={{
                    height: 2,
                    borderStyle: 'solid',
                    borderColor: themeMode === 'light' ? 'success.main' : 'grey.400',
                    borderWidth: 5
                  }}
                />
                <Grid container spacing={2} px={1.5} mb={5}>
                  <Grid item lg={12} my={1}>
                    <Typography variant="h5" gutterBottom>
                      {TITLE.MACHINE_INFO}
                    </Typography>
                  </Grid>
                  <Grid item lg={12} sm={12}>
                    <Grid container spacing={6} p={2} pb={5}>
                      <Grid item xs={12} sm={12}>
                        <ViewFormField heading="Name" isLoading={isLoading}>
                          {machineData?.name}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading="Financial Company" isLoading={isLoading}>
                          {machineData?.financialCompany}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading="Purchase Date" isLoading={isLoading}>
                          {fDate(machineData?.purchaseDate)}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading="Manufactured Date" isLoading={isLoading}>
                          {fDate(machineData?.manufactureDate)}
                        </ViewFormField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading="Shipping Date" isLoading={isLoading}>
                          {fDate(machineData?.shippingDate)}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading="Installation Date" isLoading={isLoading}>
                          {fDate(machineData?.installationDate)}
                        </ViewFormField>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Box>
            <Box mb={2}>
              <Card
                height="100vh"
                m={2}
                mt={10}
                pt={2}
                sx={{
                  backgroundColor: themeMode === 'light' ? 'background.paper' : 'background.default',
                  backgroundImage: `url(${themeMode === KEY.LIGHT ? ASSET.BG_STROKE_GREY_LOGO : ASSET.BG_STROKE_BRONZE_LOGO})`,
                  backgroundSize: 'cover',
                  backgroundSize: '150%'
                }}>
                <Divider
                  sx={{
                    height: 2,
                    borderStyle: 'solid',
                    borderColor: themeMode === 'light' ? 'success.main' : 'grey.400',
                    borderWidth: 5
                  }}
                />
                <Grid container spacing={2} px={1.5} mb={10}>
                  <Grid item lg={12} my={1}>
                    <Typography variant="h5" gutterBottom>
                      {TITLE.HOWICK_RESOURCES}
                    </Typography>
                  </Grid>
                  <Grid item lg={12} sm={12}>
                    <Grid container spacing={6} p={2} pb={5}>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading="Project Manager" isLoading={isLoading} contact={defaultValues.projectManager} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading="Support Manager" isLoading={isLoading} contact={defaultValues.supportManager} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading="Account Manager" isLoading={isLoading} contact={defaultValues.accountManager} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </MotionLazyContainer>
  )
}

MachineLayout.propTypes = {
  machine: PropTypes.array
}

export default MachineLayout
