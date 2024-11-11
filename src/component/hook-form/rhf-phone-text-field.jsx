import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Icon, ICON_NAME } from 'hook'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField, InputAdornment, Autocomplete } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSettingContext } from 'hook'
import { KEY } from 'constant'

RHFPhoneTextField.propTypes = {
 name: PropTypes.string,
 helperText: PropTypes.node,
 Error: PropTypes.bool
}

export default function RHFPhoneTextField({ name, helperText, Error, ...other }) {
 const { control } = useFormContext()
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 return (
  <Controller
   name={name}
   control={control}
   render={({ field, fieldState: { error } }) => (
    <TextField
     {...field}
     fullWidth
     value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
     error={!!error || !!Error}
     InputProps={{
      startAdornment: (
       <InputAdornment position='start'>
        <Icon icon={ICON_NAME.PHONE} sx={{ width: 25, height: 25 }} />
       </InputAdornment>
      )
     }}
     helperText={error ? error?.message : helperText}
     {...other}
     sx={{
      '& .MuiInputLabel-root': {
       ...theme.typography.body1
      },
      '& .MuiOutlinedInput-notchedOutline': {
       borderRadius: 0.4,
       color: themeMode === KEY.LIGHT ? 'grey.900' : 'grey.0',
       ...theme.typography.body1
      },
      '& .MuiInputBase-root': {
       '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
         borderColor: 'howick.midBlue'
        },
        '& .MuiInputBase-input': {
         color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white
        }
       },
       '& .MuiInputBase-input': {
        color: themeMode === KEY.LIGHT ? 'grey.900' : 'grey.0'
       },
       '&.Mui-disabled': {
        color: themeMode === KEY.LIGHT ? 'grey.800' : 'grey.200',
        '& .MuiOutlinedInput-notchedOutline': {
         borderColor: themeMode === KEY.LIGHT ? 'transparent' : 'bronze.main'
        }
       },
       '& .MuiAutocomplete-inputRoot': {
        backgroundColor: themeMode === KEY.LIGHT ? 'grey.400' : 'grey.800'
       }
      }
     }}
    />
   )}
  />
 )
}
