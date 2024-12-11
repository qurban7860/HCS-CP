import { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { useFormContext, Controller } from 'react-hook-form'
import { useMediaQuery, TextField, InputAdornment, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { KEY } from 'constant'

export default function RHFPasswordField({ name, helperText, Error, ...other }) {
 const [showPassword, setShowPassword] = useState(false)
 const { control } = useFormContext()
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

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
     sx={{
      '& .MuiInputLabel-root': {
       ...(isDesktop ? theme.typography.body1 : theme.typography.body2)
      },
      '& .MuiOutlinedInput-notchedOutline': {
       borderRadius: 0.4,
       color: themeMode === KEY.LIGHT ? 'grey.900' : 'grey.0',
       ...(isDesktop ? theme.typography.body1 : theme.typography.body2)
      },

      '& .MuiInputBase-root': {
       '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
         borderColor: 'howick.midBlue'
        },
        '& .MuiInputBase-input': {
         color: themeMode === KEY.LIGHT ? 'grey.900' : 'grey.0'
        }
       },
       '& .MuiInputBase-input': {
        color: themeMode === KEY.LIGHT ? 'grey.900' : 'grey.0'
       },
       //    '&.Mui-focused': {
       //     '& .MuiOutlinedInput-notchedOutline': {
       //      borderColor: 'common.white'
       //     },
       //     backgroundColor: themeMode === KEY.LIGHT ? 'transparent' : 'grey.800'
       //    },
       // disabled
       '&.Mui-disabled': {
        color: themeMode === KEY.LIGHT ? 'grey.800' : 'grey.200',
        '& .MuiOutlinedInput-notchedOutline': {
         borderColor: themeMode === KEY.LIGHT ? 'transparent' : 'bronze.main'
        }
       }
      }
     }}
    />
   )}
  />
 )
}

RHFPasswordField.propTypes = {
 name: PropTypes.string,
 helperText: PropTypes.node,
 Error: PropTypes.bool
}
