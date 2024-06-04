import { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, ICON_NAME } from 'hook'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { KEY } from 'constant'

RHFPasswordField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
  Error: PropTypes.bool
}

export default function RHFPasswordField({ name, helperText, Error, ...other }) {
  const [showPassword, setShowPassword] = useState(false)
  const theme = useTheme()
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={showPassword ? KEY.TEXT : KEY.PASSWORD}
          value={typeof field.value === KEY.NUMBER && field.value === 0 ? '' : field.value}
          InputProps={{
            endAdornment: (
              <InputAdornment position={KEY.END}>
                <IconButton onClick={() => setShowPassword(!showPassword)} edge={KEY.END}>
                  <Icon icon={showPassword ? ICON_NAME.EYE : ICON_NAME.EYE_OFF} color={theme.palette.grey[500]} />
                </IconButton>
              </InputAdornment>
            )
          }}
          error={!!error || !!Error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  )
}
