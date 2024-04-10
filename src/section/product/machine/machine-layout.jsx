import { useState, useRef, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useAuthContext } from 'auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Badge, TextField, Typography, List, ListItem, ListItemText, Grid, Divider, Chip, Card, CardMedia, IconButton } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useForm, Controller } from 'react-hook-form'
import FormProvider, { RHFTextField, RHFAutocomplete } from 'component/hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { MotionLazyContainer } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { machineSchema } from 'schema'
import { useGetUserQuery } from 'store/slice'
import { useIcon, ICON_NAME } from 'hook'
import { MARGIN, RADIUS, ASSET } from 'config'
import { KEY, TITLE, LABEL } from 'constant'
import { mockMachine, mockUser, mockMachineConnections } from '_mock'
import { fDate } from 'util/format'

const MachineLayout = () => {
  const [hoverAvatar, setHoverAvatar] = useState(false)
  const [hoverBadge, setHoverBadge] = useState(false)
  const [isNotEditState, setIsNotEditState] = useState(true)
  const { user: userState, userId } = useSelector((state) => state.auth)
  // const { securityUser } = useSelector((state) => state.user)
  const { data: userDetail, isLoading, error, refetch } = useGetUserQuery(userId)

  const { themeMode } = useSettingContext()

  const fileInput = useRef(null)

  const methods = useForm({
    resolver: yupResolver(machineSchema),
    defaultValues: {
      serialNo: mockMachine[0].serialNo || '',
      name: mockMachine[0].name || '',
      alias: mockMachine[0].alias || [],
      profile: mockMachine[0].profile.default.size || '',
      parentSerialNo: mockMachine[0]?.parentMachine || '',
      previousMachine: mockMachine[0]?.parentMachine?.name || '',
      supplier: mockMachine[0].supplier || null,
      category: mockMachine[0]?.machineModel?.category || null,
      machineModel: mockMachine[0]?.machineModel.name || null,
      manufactureDate: mockMachine[0]?.manufactureDate || null,
      purchaseDate: mockMachine[0]?.purchaseDate || null,
      customer: mockMachine[0].customer || null,
      financialCompany: mockMachine[0]?.financialCompany.name || null,
      machineConnectionVal: mockMachine[0]?.machineConnections?.map((connection) => connection?.serialNo) || [],
      status: mockMachine[0].status || null,
      workOrderRef: mockMachine[0].workOrderRef || '',
      // installationSite: mockMachine[0]?.installationSite || null,
      // billingSite: mockMachine[0].billingSite || null,
      installationDate: fDate(mockMachine[0]?.installationDate) || null,
      shippingDate: fDate(mockMachine[0]?.shippingDate) || null,
      siteMilestone: mockMachine[0].siteMilestone || '',
      projectManager: mockMachine[0]?.projectManager[0].name || [],
      supportManager: mockMachine[0]?.supportManager[0].name || [],
      accountManager: mockMachine[0]?.accountManager[0].name || [],
      supportExpireDate: mockMachine[0].supportExpireDate || null,
      description: mockMachine[0].description || '',
      isActive: mockMachine[0].isActive || false
    }
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  const onSubmit = async (data) => {
    try {
      await dispatch(updateSecurityUser(data, securityUser._id))
      await dispatch(getSecurityUser(securityUser._id))
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

  const { Icon, iconSrc: ticketStatusIconSrc } = useIcon(ICON_NAME.TIX_STATUS)
  const { iconSrc: editSrc } = useIcon(ICON_NAME.EDIT)
  const { iconSrc: saveSrc } = useIcon(ICON_NAME.SAVE)

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
                    {LABEL.MACHINE_LIST}
                  </Typography>
                </Box>
                <List>
                  {machineList.map((machine) => (
                    <ListItem key={machine.id}>
                      <Grid container alignItems="center">
                        <Grid item xs={8}>
                          <ListItemText primary={machine.id} secondary={machine.name} />
                        </Grid>
                        <Grid item xs={4} flex={1} justifyContent="flex-end">
                          <ListItemText>
                            <Chip
                              label={<Typography variant="h6">{machine.status}</Typography>}
                              size="small"
                              variant="outlined"
                              sx={{
                                backgroundColor: machine.status === 'Stopped' ? 'error.main' : 'burnIn.main',
                                color: `common.${machine.status === 'Stopped' ? 'white' : 'black'}`,
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
                        defaultValue={mockMachine[0]?.customer.name || 'Organization'}
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
                          {isLoading ? 'isLoading...' : TITLE.MACHINE}
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
                        <RHFTextField name="serialNo" label="Serial Number" disabled={isNotEditState} />
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <RHFTextField name="machineModel" label="Machine Model" disabled={isNotEditState} />
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <RHFTextField name="profile" label="Default Profile" disabled={isNotEditState} />
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
                        <RHFTextField name="name" label="name" disabled={isNotEditState} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <RHFTextField name="purchaseDate" label="Purchase Date" disabled={isNotEditState} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <RHFTextField name="financialCompany" label="Financial Company" disabled={isNotEditState} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {/* use chip tp map through machineConnections */}
                        <RHFAutocomplete
                          multiple
                          disableCloseOnSelect
                          name="machineConnectionVal"
                          label="Connected Machines"
                          id="tags-outlined"
                          options={mockMachineConnections?.filter((machineKit) => machineKit?._id !== mockMachine[0]?._id)}
                          getOptionLabel={(option) =>
                            `${option?.connectedMachine?.serialNo ? option?.connectedMachine?.serialNo : option?.serialNo} ${
                              option?.name ? '-' : ''
                            } ${option?.name ? option.name : ''}`
                          }
                          filterSelectedOptions
                          isOptionEqualToValue={(option, value) => option?._id === value?._id}
                        />
                        {/* <RHFTextField name="machineConnectionVal" label="Machine Kits" disabled={isNotEditState} /> */}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <RHFTextField name="profile" label="Default Profile" disabled={isNotEditState} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <RHFTextField name="shippingDate" label="Shipping Date" disabled={isNotEditState} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <RHFTextField name="installationDate" label="Installation Date" disabled={isNotEditState} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <RHFTextField name="supportManager" label="Support Manager" disabled={isNotEditState} />
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
                        <RHFTextField name="projectManager" label="Project Manager" disabled={isNotEditState} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <RHFTextField name="supportManager" label="Support Manager" disabled={isNotEditState} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <RHFTextField name="accountManager" label="Account Manager" disabled={isNotEditState} />
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
