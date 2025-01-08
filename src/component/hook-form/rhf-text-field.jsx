import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { useMediaQuery, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSettingContext } from 'hook'
import { RADIUS } from 'config/layout'
import { KEY } from 'constant'

export default function RHFTextField({ name, helperText, Error, ...other }) {
 const { control } = useFormContext()
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

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
       ...(isDesktop ? theme.typography.body1 : theme.typography.body2)
      },
      '& .MuiOutlinedInput-notchedOutline': {
       borderRadius: RADIUS.FORM.borderRadius,
       color: themeMode === KEY.LIGHT ? 'grey.900' : 'grey.0',
       ...(isDesktop ? theme.typography.body1 : theme.typography.body2)
      },
      '& .MuiInputBase-root': {
       '&:hover': {
        '& .MuiInputBase-input': {
         color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white
        }
       },
       '& .MuiInputBase-input': {
        color: themeMode === KEY.LIGHT ? 'grey.900' : 'grey.0'
       },
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

RHFTextField.propTypes = {
 name: PropTypes.string,
 helperText: PropTypes.node,
 Error: PropTypes.bool
}
