import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { Autocomplete, Box, createFilterOptions } from '@mui/material'
import { COUNTRY } from 'constant'
import RHFTextField from './rhf-text-field'

RHFCountryAutocomplete.propTypes = {
 name: PropTypes.string,
 label: PropTypes.string,
 helperText: PropTypes.node,
 Error: PropTypes.bool,
 required: PropTypes.bool
}

export default function RHFCountryAutocomplete({ name, label, helperText, Error, required, ...other }) {
 const { control, setValue } = useFormContext()

 useEffect(() => {
  setValue(
   name,
   COUNTRY?.find(country => country?.code?.toLocaleLowerCase() === 'nz')
  )
 }, [name, setValue])

 return (
  <Controller
   name={name}
   control={control}
   render={({ field, fieldState: { error } }) => (
    <Autocomplete
     {...field}
     options={COUNTRY || []}
     onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
     isOptionEqualToValue={(option, value) => option?.code === value?.code}
     getOptionLabel={option => {
      if (typeof option === 'string') return option
      return `${option?.label || ''} (${option?.code || ''})`
     }}
     renderOption={(props, option) => (
      <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
       <img loading='lazy' width='20' srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`} src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`} alt='' />
       {option.label} ({option.code})
      </Box>
     )}
     autoHighlight
     autoSelect
     renderInput={params => <RHFTextField name={name} label={label} required={required} error={!!error || !!Error} helperText={error ? error?.message : helperText} {...params} />}
     {...other}
    />
   )}
  />
 )
}
