import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Badge,
  TextField,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
  Chip,
  Card,
  CardMedia,
  IconButton,
} from '@mui/material'
import TextareaAutosize from 'react-textarea-autosize'
import { useForm, Controller } from 'react-hook-form'
import { MotionLazyContainer } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { useIcon, ICON_NAME } from 'hook'
import { MARGIN, RADIUS, ASSET } from 'config'
import { KEY, TITLE, LABEL } from 'constant'
import { mockUser } from '_mock'

const UserProfile = ({ user = mockUser }) => {
  const [hoverAvatar, setHoverAvatar] = useState(false)
  const [hoverBadge, setHoverBadge] = useState(false)
  const [isEditState, setIsEditState] = useState(false)

  const { control, handleSubmit } = useForm()
  const { themeMode } = useSettingContext()

  const fileInput = useRef(null)

  const handleEdit = () => {
    setIsEditState((prev) => !prev)
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

  const onSubmit = (data) => {
    console.log(data)
  }

  const machineList = [
    { id: 20566, name: 'FRAMA3200', status: 'Running' },
    { id: 20567, name: 'Decoiler', status: 'Running' },
    { id: 15699, name: 'H100', status: 'Stopped' },
  ]

  const ticketList = [{ id: 'HWKSC-12345', status: 'Under Review', agent: 'Maria Clara' }]

  return (
    <MotionLazyContainer display="flex">
      {/*  TODO: Make responsive */}
      {/* {TODO: refactor  */}
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
                  backgroundSize: '150%',
                }}
              >
                <Typography variant="h6" color="common.white" gutterBottom>
                  {LABEL.USER_PROFILE_MACHINE}
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
                              fontWeight: 'bold',
                            }}
                          />
                        </ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item lg={12} sm={12} bgcolor="background.paper">
              <Box
                bgcolor={themeMode === 'light' ? 'success.main' : 'grey.800'}
                flex={1}
                px={2}
                pt={2}
                sx={{
                  backgroundImage: `url(${ASSET.BG_STROKE_LOGO})`,
                  backgroundSize: 'cover',
                  backgroundPositionY: 'center',
                  backgroundSize: '150%',
                }}
              >
                <Typography variant="h6" color="common.white" gutterBottom>
                  {LABEL.USER_PROFILE_TIX}
                </Typography>
              </Box>
              <List>
                {ticketList.map((ticket) => (
                  <ListItem key={ticket.id}>
                    <ListItemText
                      primary={ticket.id}
                      secondary={
                        <>
                          {`STATUS: ${ticket.status}`} <Icon icon={ticketStatusIconSrc} sx={{ color: 'bronze.main' }} />
                          <br />
                          {`AGENT: ${ticket.agent}`}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} lg={9}>
          <Card
            height="100vh"
            py={2}
            sx={{
              backgroundColor: themeMode === 'light' ? 'background.paper' : 'background.default',
              backgroundImage: `url(${themeMode === KEY.LIGHT ? ASSET.BG_STROKE_GREY_LOGO : ASSET.BG_STROKE_BRONZE_LOGO})`,
              backgroundSize: 'cover',
              backgroundSize: '150%',
            }}
          >
            <Divider
              sx={{
                height: 2,
                borderStyle: 'solid',
                borderColor: themeMode === 'light' ? 'success.main' : 'grey.400',
                borderWidth: 5,
              }}
            />
            <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={10} mt={2} mx={4}>
              <Grid container mb={10}>
                <Grid item lg={8}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
                            display: hoverBadge ? 'block' : 'none',
                          }}
                        />
                      }
                    >
                      <CardMedia
                        component="img"
                        src={user[0].badge}
                        alt={user[0].organization}
                        sx={{
                          width: 70,
                          height: 70,
                          objectFit: 'hidden',
                          borderRadius: '10%',
                          marginRight: 2,
                        }}
                      />
                    </Badge>
                    <Controller
                      name="organization"
                      control={control}
                      disabled={isEditState}
                      defaultValue={user[0].organization}
                      rules={{ required: 'organization is required' }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          label="Organization"
                          variant={isEditState ? 'filled' : 'standard'}
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
                                backgroundColor: themeMode === KEY.LIGHT ? 'grey.300' : 'grey.900',
                              },
                            },
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
                        {TITLE.PROFILE}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} justifyContent="flex-end">
                      <Grid container justifyContent="flex-end">
                        <IconButton
                          onClick={handleEdit}
                          sx={{
                            backgroundColor: themeMode === KEY.LIGHT ? 'transparent' : 'grey.800',
                            border: `1px solid ${themeMode === KEY.LIGHT ? 'success.main' : 'grey.400'}`,
                            borderRadius: RADIUS.BORDER.borderRadius,
                          }}
                        >
                          {isEditState ? (
                            <Icon icon={editSrc} sx={{ color: themeMode === KEY.LIGHT ? 'primary.lighter' : 'grey.100' }} />
                          ) : (
                            <Icon icon={saveSrc} sx={{ color: themeMode === KEY.LIGHT ? 'primary.lighter' : 'grey.100' }} />
                          )}
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={12}>
                  <Typography variant="h5" gutterBottom>
                    {TITLE.PERSONAL_INFO}
                  </Typography>
                </Grid>
                <Grid item lg={8} sm={12}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="firstName"
                        control={control}
                        disabled={isEditState}
                        defaultValue={user[0].firstName}
                        rules={{ required: 'Name is required' }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="First name"
                            variant="outlined"
                            error={!!error}
                            helperText={error?.message}
                            size="small"
                            fullWidth
                            InputProps={{
                              sx: {
                                backgroundColor: themeMode === KEY.LIGHT ? 'success.main' : 'grey.800',
                                '&.Mui-disabled': {
                                  backgroundColor: themeMode === KEY.LIGHT ? 'transparent' : 'grey.800',
                                },
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="lastName"
                        control={control}
                        defaultValue={user[0].lastName}
                        disabled={isEditState}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="Last name"
                            variant="outlined"
                            error={!!error}
                            helperText={error?.message}
                            size="small"
                            fullWidth
                            InputProps={{
                              sx: {
                                backgroundColor: themeMode === KEY.LIGHT ? 'success.main' : 'grey.800',
                                '& .MuiInputBase-input.Mui-disabled': {
                                  color: themeMode === KEY.LIGHT ? 'common.black' : 'common.white',
                                },
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="location"
                        control={control}
                        defaultValue={Object.values(user[0].location).join(', ')}
                        disabled={isEditState}
                        rules={{ required: 'Location is required' }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="Location"
                            variant="outlined"
                            error={!!error}
                            helperText={error?.message}
                            size="small"
                            fullWidth
                            multiline
                            InputProps={{
                              inputComponent: TextareaAutosize,
                              inputProps: {
                                minRows: 1,
                                maxRows: 5,
                              },
                              sx: {
                                backgroundColor: themeMode === KEY.LIGHT ? 'success.main' : 'grey.800',
                                '&.Mui-disabled': {
                                  backgroundColor: themeMode === KEY.LIGHT ? 'transparent' : 'grey.800',
                                },
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="email"
                        control={control}
                        disabled
                        defaultValue={user[0].email}
                        rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="E-mail"
                            variant="outlined"
                            error={!!error}
                            helperText={error?.message}
                            size="small"
                            fullWidth
                            InputProps={{
                              sx: {
                                backgroundColor: themeMode === KEY.LIGHT ? 'success.main' : 'grey.800',
                                '&.Mui-disabled': {
                                  backgroundColor: themeMode === KEY.LIGHT ? 'transparent' : 'grey.800',
                                },
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="role"
                        control={control}
                        defaultValue={user[0].role}
                        disabled={isEditState}
                        rules={{ required: 'Role is required' }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="Role"
                            variant="outlined"
                            error={!!error}
                            helperText={error?.message}
                            size="small"
                            fullWidth
                            InputProps={{
                              sx: {
                                backgroundColor: themeMode === KEY.LIGHT ? 'success.main' : 'grey.800',
                                '&.Mui-disabled': {
                                  backgroundColor: themeMode === KEY.LIGHT ? 'transparent' : 'grey.800',
                                },
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="phone"
                        control={control}
                        defaultValue={user[0].phone}
                        disabled={isEditState}
                        rules={{ required: 'Phone is required' }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="Phone"
                            variant="outlined"
                            error={!!error}
                            helperText={error?.message}
                            size="small"
                            fullWidth
                            InputProps={{
                              sx: {
                                backgroundColor: themeMode === KEY.LIGHT ? 'success.main' : 'grey.800',
                                '&.Mui-disabled': {
                                  backgroundColor: themeMode === KEY.LIGHT ? 'transparent' : 'grey.800',
                                },
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={4} sm={12}>
                  <Box display="flex" justifyContent="center">
                    <input accept="image/*" type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleFileChange} />
                    <Badge
                      onMouseEnter={handleHoverAvatar}
                      onMouseLeave={handleHoverAvatar}
                      overlap="circular"
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      badgeContent={
                        <Chip
                          icon={<Icon icon={editSrc} color="common.white" width={30} />}
                          size="large"
                          variant="filled"
                          onClick={() => {
                            fileInput.current.click()
                          }}
                          sx={{
                            borderColor: 'common.white',
                            color: 'success.main',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: hoverAvatar ? 'block' : 'none',
                          }}
                        />
                      }
                    >
                      <Avatar
                        src={user[0].photoURL}
                        alt={user[0].displayName}
                        sx={{
                          width: 250,
                          height: 250,
                          borderRadius: RADIUS.BORDER_RADIUS,
                          borderColor: themeMode === 'light' ? 'success.main' : 'grey.400',
                          borderWidth: 5,
                        }}
                      />
                    </Badge>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </MotionLazyContainer>
  )
}

UserProfile.propTypes = {
  user: PropTypes.array,
  // TODO: change to object when using real data
}

export default UserProfile
