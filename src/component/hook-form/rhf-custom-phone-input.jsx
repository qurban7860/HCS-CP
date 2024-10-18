import { Fragment } from 'react'
import { TextField, InputAdornment, Autocomplete } from '@mui/material'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { Iconify } from 'component/iconify'
import RHFTextField from './rhf-text-field'

RHFCustomPhoneInput.propTypes = {
 name: PropTypes.string,
 label: PropTypes.string,
 index: PropTypes.number,
 value: PropTypes.object,
 isRegister: PropTypes.bool
}

export default function RHFCustomPhoneInput({ name, value, index, label, isRegister = false, countryCodePlaceholder, ...other }) {
 const { control, setValue } = useFormContext()

 return (
  <Controller
   name={name}
   control={control}
   render={({ field, fieldState: { error } }) => (
    <RHFTextField
     {...field}
     label={label}
     name={name}
     placeholder="Number"
     value={value?.number?.replace(/[^0-9]/g) || ''}
     onChange={(e) => {
      const inputValue = e.target.value.replace(/[^0-9]/g, '')
      setValue(name, { ...value, number: inputValue }, { shouldValidate: true })
     }}
     InputProps={{
      startAdornment: (
       <>
        <InputAdornment position="start">
         <Iconify icon="mdi:phone" sx={{ width: 25, height: 25 }} />
         {!isRegister && (
          <Fragment>
           <Autocomplete
            // freeSolo
            disableClearable
            defaultValue={value?.type || 'PHONE'}
            size="small"
            value={value?.type || null}
            sx={{ width: '50px', mx: 1 }}
            options={['PHONE', 'FAX', 'CELL', 'OTHERS']}
            onChange={(event, newValue) => {
             setValue(name, { ...value, type: newValue }, { shouldValidate: true })
            }}
            renderInput={(params) => <RHFTextField {...params} name={`${name}.type`} variant="standard" size="small" placeholder="Type" sx={{ mb: 0.9 }} />}
           />{' '}
           {'+'}
          </Fragment>
         )}
         <TextField
          value={value?.countryCode || ''}
          variant="standard"
          InputProps={{
           inputProps: {
            maxLength: 2
           }
          }}
          onChange={(e) => {
           const inputValue = e.target.value.replace(/[^0-9]/g, '')
           setValue(name, { ...value, countryCode: inputValue }, { shouldValidate: true })
          }}
          placeholder={countryCodePlaceholder || '00'}
          sx={{ width: '60px', mx: 1 }}
         />
         |
        </InputAdornment>
       </>
      ),
      endAdornment: (
       <InputAdornment position="start">
        <TextField
         value={value?.extensions || ''}
         variant="standard"
         placeholder="Ext."
         sx={{ width: '80px', mx: 1 }}
         InputProps={{
          inputProps: {
           maxLength: 10
          }
         }}
         onChange={(e) => {
          const inputValue = e.target.value.replace(/[^0-9]/g, '')
          setValue(name, { ...value, extensions: inputValue }, { shouldValidate: true })
         }}
        />
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
