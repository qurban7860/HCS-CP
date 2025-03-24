import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

RHFDescription.propTypes = {
  name: PropTypes.string,
  schema: PropTypes.object,
  helperText: PropTypes.node,
}

function RHFDescription({ name, schema, helperText, ...other }) {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate: schema }}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          error={!!errors[name]}
          helperText={errors[name] ? errors[name]?.message : helperText}
          onChange={(e) => {
            setValue(name, e.target.value)
            field.onChange(e)
          }}
          onBlur={(e) => {
            field.onBlur(e)
          }}
          {...other}
        />
      )}
    />
  )
}

export default RHFDescription
