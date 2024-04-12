import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import { useSettingContext } from 'component/setting'

RHFTextField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
  Error: PropTypes.bool
}

export default function RHFTextField({ name, helperText, Error, ...other }) {
  const { control } = useFormContext()
  const { themeMode } = useSettingContext()

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
              color: themeMode === 'light' ? 'grey.900' : 'grey.0'
            },
            '& .MuiInputBase-root': {
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'common.white'
                },
                '& .MuiInputBase-input': {
                  color: themeMode === 'light' ? 'grey.900' : 'grey.0'
                }
              },
              // color of text when disabled
              '& .MuiInputBase-input': {
                color: themeMode === 'light' ? 'grey.900' : 'grey.0'
              },
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main'
                }
              },
              // disabled
              '&.Mui-disabled': {
                color: themeMode === 'light' ? 'grey.800' : 'grey.200',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'bronze.main'
                },
                '& .MuiInputBase-input': {}
              }
            }
          }}
        />
      )}
    />
  )
}
