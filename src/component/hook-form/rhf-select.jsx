import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { Box, Chip, Select, Checkbox, MenuItem, TextField, InputLabel, FormControl, OutlinedInput, FormHelperText } from '@mui/material'
import { RADIUS } from 'config/layout'

RHFSelect.propTypes = {
 name: PropTypes.string,
 native: PropTypes.bool,
 children: PropTypes.node,
 helperText: PropTypes.node,
 maxHeight: PropTypes.number
}

export function RHFSelect({ name, native, children, helperText, maxHeight = 220, ...other }) {
 const { control } = useFormContext()

 return (
  <Controller
   name={name}
   control={control}
   render={({ field, fieldState: { error } }) => (
    <TextField
     {...field}
     select
     fullWidth
     SelectProps={{
      native,
      MenuProps: {
       PaperProps: {
        sx: {
         ...(!native && {
          px: 1,
          maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
          '& .MuiMenuItem-root': {
           px: 1,
           borderRadius: RADIUS.FORM.borderRadius,
           typography: 'body2',
           textTransform: 'capitalize'
          }
         })
        }
       }
      },
      sx: { textTransform: 'capitalize' }
     }}
     error={!!error}
     helperText={error ? error?.message : helperText}
     {...other}>
     {children}
    </TextField>
   )}
  />
 )
}

RHFMultiSelect.propTypes = {
 customObject: PropTypes.bool,
 customName: PropTypes.string,
 name: PropTypes.string,
 chip: PropTypes.bool,
 label: PropTypes.string,
 options: PropTypes.array,
 checkbox: PropTypes.bool,
 placeholder: PropTypes.string,
 helperText: PropTypes.node,
 sx: PropTypes.object
}

export function RHFMultiSelect({ customObject, customName, name, chip, label, options, checkbox, placeholder, helperText, sx, ...other }) {
 const { control } = useFormContext()

 const renderValues = selectedIds => {
  const selectedItems = options.filter(item => selectedIds.includes(customObject ? item._id : item.value))

  if (!selectedItems.length && placeholder) {
   return (
    <Box component='em' sx={{ color: 'text.disabled' }}>
     {placeholder}
    </Box>
   )
  }

  if (chip) {
   return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
     {selectedItems.map(item => (
      <Chip key={customObject ? item._id : item.value} size='small' label={customObject ? item[customName] : item.label} />
     ))}
    </Box>
   )
  }

  return selectedItems.map(item => (customObject ? item[customName] : item.label)).join(', ')
 }

 return (
  <Controller
   name={name}
   control={control}
   render={({ field, fieldState: { error } }) => (
    <FormControl sx={sx}>
     {label && <InputLabel id={name}> {label} </InputLabel>}

     <Select
      {...field}
      multiple
      displayEmpty={!!placeholder}
      labelId={name}
      input={<OutlinedInput fullWidth label={customObject ? customName : label} error={!!error} />}
      renderValue={renderValues}
      MenuProps={{
       PaperProps: {
        sx: { px: 1, maxHeight: 280 }
       }
      }}
      {...other}>
      {placeholder && (
       <MenuItem
        disabled
        value=''
        sx={{
         py: 1,
         px: 2,
         borderRadius: RADIUS.FORM.borderRadius,
         typography: 'body2'
        }}>
        <em> {placeholder} </em>
       </MenuItem>
      )}

      {options.map(option => {
       const selected = field.value.includes(customObject ? option._id : option.value)

       return (
        <MenuItem
         key={customObject ? option._id : option.value}
         value={customObject ? option._id : option.value}
         sx={{
          py: 1,
          px: 2,
          borderRadius: RADIUS.FORM.borderRadius,
          typography: 'body2',
          ...(selected && {
           fontWeight: 'fontWeightMedium'
          }),
          ...(checkbox && {
           p: 0.25
          })
         }}>
         {checkbox && <Checkbox disableRipple size='small' checked={selected} />}

         {customObject ? option[customName] : option.label}
        </MenuItem>
       )
      })}
     </Select>

     {(!!error || helperText) && <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>}
    </FormControl>
   )}
  />
 )
}
