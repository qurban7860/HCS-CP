import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import { TextField } from '@mui/material'
import { useSettingContext } from 'hook'
import { KEY } from 'constant'

RHFTextField.propTypes = {
 name: PropTypes.string,
 helperText: PropTypes.node,
 Error: PropTypes.bool
}

export default function RHFTextField({ name, helperText, Error, ...other }) {
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
     helperText={error ? error?.message : helperText}
     {...other}
     sx={{
      '& .MuiInputLabel-root': {
       bgcolor: themeMode === KEY.LIGHT ? 'grey.400' : 'grey.800',
       ...theme.typography.overline1
      },
      '& .MuiOutlinedInput-notchedOutline': {
       borderRadius: 0.4,
       color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white,
       ...theme.typography.overline1
      },
      '& .MuiInputBase-root': {
       '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
         borderColor: 'common.white'
        },
        '& .MuiInputBase-input': {
         color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white
        }
       },
       '& .MuiInputBase-input': {
        color: themeMode === KEY.LIGHT ? 'grey.900' : 'grey.0'
       },
       '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
         borderColor: 'common.white'
        },
        backgroundColor: themeMode === KEY.LIGHT ? 'transparent' : 'grey.800'
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
