import { Fragment } from 'react'

const RegisterInfoPage = () => {
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
        {/* <RHFAutocomplete
          multiple
          disableCloseOnSelect
          filterSelectedOptions
          name="contacts"
          label="Contacts"
          options={contacts}
          isOptionEqualToValue={(option, value) => option?._id === value?._id}
          getOptionLabel={(option) => `${option.firstName || ''} ${ option.lastName || ''}`}
          renderOption={(props, option) => ( <li {...props} key={option?._id}>{`${option?.firstName || ''} ${option?.lastName || ''}`}</li> )}
          ChipProps={{ size: 'small' }}
        /> */}
        <RHFTextField type={KEY.EMAIL} name={KEY.EMAIL} label="Email" autoComplete={KEY.EMAIL} aria-label={LABEL.LOGIN_EMAIL} required />
        <RHFPhoneInput name="phone" label="Phone" autoComplete={KEY.PHONE} aria-label="phone" />
        {/* <RHFTextField
          type={KEY.EMAIL}
          name={KEY.EMAIL}
          label="Email"
          autoComplete={KEY.EMAIL}
          aria-label={LABEL.LOGIN_EMAIL}
          required
        /> */}
      </Stack>
      {/* /* create a next button */}

      {/* <GStyledLoadingButton
          fullWidth
          isLoading={isSubmitting}
          color={KEY.INHERIT}
          size={SIZE.LARGE}
          type={KEY.SUBMIT}
          variant={KEY.CONTAINED}
          loading={isSubmitSuccessful || isSubmitting}
          sx={RADIUS.BORDER}>
          {'Next'}
        </GStyledLoadingButton> */}
    </Fragment>
  )
}

export default RegisterInfoPage
