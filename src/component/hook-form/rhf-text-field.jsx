import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

RHFTextField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
  Error: PropTypes.bool,
}

export default function RHFTextField({ name, helperText, Error, ...other }) {
  const { control } = useFormContext()

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
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'grey.600',
              borderRadius: 0.4,
              color: 'grey.500',
            },
            '& .MuiInputBase-root': {
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#000',
                },
              },
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
            },
          }}
        />
      )}
    />
  )
}
