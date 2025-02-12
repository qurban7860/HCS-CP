import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { FormHelperText } from '@mui/material'

RHFUploadBox.propTypes = {
  name: PropTypes.string,
}

export function RHFUploadBox({ name, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
    />
  )
}
