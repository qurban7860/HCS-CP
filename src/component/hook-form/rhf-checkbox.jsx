import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { useSettingContext } from 'hook'
import { Checkbox, Typography, FormLabel, FormGroup, FormControl, FormHelperText, FormControlLabel } from '@mui/material'
import { KEY, TYPOGRAPHY } from 'constant'

RHFCheckbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node
}

export function RHFCheckbox({ name, label, helperText, ...other }) {
  const { control } = useFormContext()
  const { themeMode } = useSettingContext()

  return (
   <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
     <div>
      <FormControlLabel
       control={<Checkbox {...field} checked={field.value} sx={{ borderRadius: 0.4, '& .MuiSvgIcon-root':{ color: themeMode === KEY.LIGHT ? 'howick.darkBlue' : 'howick.orange' }}} />}
       label={<Typography variant={TYPOGRAPHY.BODY2}>{label}</Typography>}
       {...other}
      />
      {(!!error || helperText) && <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>}
     </div>
    )}
   />
  )
}

RHFMultiCheckbox.propTypes = {
  row: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  spacing: PropTypes.number,
  helperText: PropTypes.node
}

export function RHFMultiCheckbox({ row, name, label, options, spacing, helperText, ...other }) {
  const { control } = useFormContext()

  const getSelected = (selectedItems, item) =>
    selectedItems.includes(item) ? selectedItems.filter((value) => value !== item) : [...selectedItems, item]

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel component="legend" sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}

          <FormGroup
            sx={{
              ...(row && {
                flexDirection: 'row'
              }),
              '& .MuiFormControlLabel-root': {
                '&:not(:last-of-type)': {
                  mb: spacing || 0
                },
                ...(row && {
                  mr: 0,
                  '&:not(:last-of-type)': {
                    mr: spacing || 2
                  }
                })
              }
            }}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox checked={field.value.includes(option.value)} onChange={() => field.onChange(getSelected(field.value, option.value))}  />
                }
                label={option.label}
                {...other}
              />
            ))}
          </FormGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
