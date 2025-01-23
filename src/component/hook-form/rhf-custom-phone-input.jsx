import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Icon, ICON_NAME } from 'hook'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField, InputAdornment, Autocomplete } from '@mui/material'
import { ICON } from 'config/layout'
import { PHONE_TYPES } from 'constant/key'
import RHFTextField from './rhf-text-field'

RHFCustomPhoneInput.propTypes = {
 name: PropTypes.string,
 label: PropTypes.string,
 index: PropTypes.number,
 value: PropTypes.object,
 isRegister: PropTypes.bool,
 countryCodePlaceholder: PropTypes.string,
 isOnlyNumber: PropTypes.bool
}

export default function RHFCustomPhoneInput({ name, value, index, label, isRegister = false, countryCodePlaceholder, isOnlyNumber, ...other }) {
 const { control, setValue } = useFormContext()

 return (
  <Controller
   name={name}
   //    value={value}
   control={control}
   render={({ field, fieldState: { error } }) => (
    <RHFTextField
     {...field}
     label={label}
     name={name}
     placeholder='Phone Number'
     value={value?.number?.replace(/[^0-9]/g) || ''}
     onChange={e => {
      const inputValue = e.target.value.replace(/[^0-9]/g, '')
      setValue(name, { ...value, number: inputValue }, { shouldValidate: true })
     }}
     InputProps={{
      startAdornment: (
       <Fragment>
        <InputAdornment position='start'>
         <Icon icon={ICON_NAME.PHONE} sx={{ ...ICON.SIZE_XS }} />
         {!isRegister && (
          <Fragment>
           <Autocomplete
            disableClearable
            defaultValue={value?.type || 'PHONE'}
            size='small'
            value={value?.type || null}
            sx={{ width: 70, mx: 1 }}
            options={PHONE_TYPES}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(event, newValue) => {
             setValue(name, { ...value, type: newValue }, { shouldValidate: true })
            }}
            renderInput={params => <RHFTextField {...params} name={`${name}.type`} size='small' placeholder='Type' sx={{ mb: 0.9, backgroundColor: 'transparent' }} />}
           />
           {'+'}
          </Fragment>
         )}
         {!isOnlyNumber && (
          <Fragment>
           <TextField
            value={value?.countryCode || ''}
            variant='standard'
            InputProps={{
             inputProps: {
              maxLength: 2
             }
            }}
            onChange={e => {
             const inputValue = e.target.value.replace(/[^0-9]/g, '')
             setValue(name, { ...value, countryCode: inputValue }, { shouldValidate: true })
            }}
            placeholder={countryCodePlaceholder || '00'}
            sx={{ width: 40, mx: 1 }}
           />
           |
          </Fragment>
         )}
        </InputAdornment>
       </Fragment>
      ),
      endAdornment: (
       <InputAdornment position='start'>
        {!isOnlyNumber && (
         <TextField
          value={value?.extensions || ''}
          variant='standard'
          placeholder='Ext.'
          sx={{ width: 40, mx: 1 }}
          InputProps={{
           inputProps: {
            maxLength: 10
           }
          }}
          onChange={e => {
           const inputValue = e.target.value.replace(/[^0-9]/g, '')
           setValue(name, { ...value, extensions: inputValue }, { shouldValidate: true })
          }}
         />
        )}
       </InputAdornment>
      ),
      inputProps: {
       maxLength: 16
      }
     }}
     {...other}
    />
   )}
  />
 )
}
