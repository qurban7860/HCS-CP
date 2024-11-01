import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { useFormContext, Controller } from 'react-hook-form'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { TYPOGRAPHY, KEY } from 'constant'

RHFAutocomplete.propTypes = {
 name: PropTypes.string,
 label: PropTypes.string,
 helperText: PropTypes.node,
 Error: PropTypes.bool
}

export default function RHFAutocomplete({ name, label, helperText, Error, ...other }) {
 const { control, setValue } = useFormContext()

 const { themeMode } = useSettingContext()
 const theme = useTheme()

 return (
  <Controller
   name={name}
   control={control}
   render={({ field, fieldState: { error } }) => (
    <Autocomplete
     {...field}
     onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
     renderInput={params => (
      <TextField
       label={
        <Typography variant={TYPOGRAPHY.OVERLINE2} color={themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.common.white}>
         {label}
        </Typography>
       }
       error={!!error || !!Error}
       helperText={error ? error?.message : helperText}
       {...params}
      />
     )}
     {...other}
     sx={{
      '& .MuiInputLabel-root': {
       ...theme.typography.overline2
      },
      '& .MuiOutlinedInput-notchedOutline': {
       borderRadius: 0.4,
       color: themeMode === KEY.LIGHT ? 'grey.900' : 'grey.0',
       ...theme.typography.overline2
      }
     }}
    />
   )}
  />
 )
}
