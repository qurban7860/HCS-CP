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
       //    '&.Mui-focused': {
       //     '& .MuiOutlinedInput-notchedOutline': {
       //      borderColor: 'grey.400'
       //     },
       //     backgroundColor: themeMode === KEY.LIGHT ? 'transparent' : 'grey.800'
       //    },
       '&.Mui-disabled': {
        backgroundColor: themeMode === KEY.LIGHT ? 'grey.100' : 'grey.800',
        pointerEvents: 'none',
        '& .MuiOutlinedInput-notchedOutline': {
         color: themeMode === KEY.LIGHT ? 'grey.800' : 'grey.400'
        }
       },
       '& .MuiAutocomplete-inputRoot': {
        backgroundColor: themeMode === KEY.LIGHT ? 'grey.400' : 'grey.800'
       }
      },
      '& .MuiInputLabel-root.Mui-disabled': {
       color: themeMode === KEY.LIGHT ? 'grey.500' : 'grey.300'
      },
      '& .MuiFormHelperText-root.Mui-disabled': {
       color: themeMode === KEY.LIGHT ? 'grey.500' : 'grey.300'
      }
     }}
    />
   )}
  />
 )
}
