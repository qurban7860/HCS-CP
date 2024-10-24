import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import { Typography } from '@mui/material'
import { useSettingContext } from 'hook'
import { useTheme } from '@mui/material/styles'
import RHFTextField from './rhf-text-field'
import { TYPOGRAPHY, KEY } from 'constant'

export default function RHFDatePicker({ name, label, size, value, helperText, Error, ...other }) {
 const { control } = useFormContext()
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 return (
  <Controller
   name={name}
   control={control}
   render={({ field, fieldState: { error } }) => (
    <DatePicker
     {...field}
     name='serviceDate'
     value={value}
     label={<Typography variant={TYPOGRAPHY.OVERLINE2}>{label}</Typography>}
     onChange={newValue => field.onChange(newValue)}
     renderInput={params => <RHFTextField {...params} size={size} error={!!error || !!Error} helperText={error ? error?.message : helperText} />}
     {...other}
     sx={{
      '& .MuiInputLabel-root': {
       ...theme.typography.overline2
      },
      '& .MuiOutlinedInput-notchedOutline': {
       borderRadius: 0.4,
       color: themeMode === KEY.LIGHT ? 'grey.900' : 'grey.0',
       ...theme.typography.overline2,
       padding: '0'
      },
      '& .MuiInputBase-root': {
       '& .MuiInputBase-input': {
        padding: '10px 14px'
       }
      }
     }}
    />
   )}
  />
 )
}

RHFDatePicker.propTypes = {
 name: PropTypes.string,
 label: PropTypes.string,
 size: PropTypes.string,
 helperText: PropTypes.node,
 Error: PropTypes.bool,
 value: PropTypes.any
}
