import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { FormHelperText, Typography } from '@mui/material'
import Editor from '../editor'

RHFEditor.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
}

function RHFEditor({ name, label, helperText, ...other }) {
  const {
    control,
    watch,
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext()

  const values = watch()

  useEffect(() => {
    if (values[name] === '<p><br></p>') {
      setValue(name, '', {
        shouldValidate: !isSubmitSuccessful,
      })
    }
  }, [isSubmitSuccessful, name, setValue, values])

  return (
    <React.Fragment>
      <Typography variant='subtitle2'>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) =>
          <Editor
            id={name}
            value={field.value}
            onChange={field.onChange}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        }
      />
    </React.Fragment>
  )
}

export default RHFEditor
