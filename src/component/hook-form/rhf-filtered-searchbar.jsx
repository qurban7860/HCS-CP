import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { dispatch } from 'store'
import { useSettingContext } from 'hook'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField, Select, MenuItem, InputAdornment, useTheme, useMediaQuery, Box, Typography, Stack, Button } from '@mui/material'
import { Icon, ICON_NAME } from 'hook'
import { RADIUS } from 'config/layout'
import { TYPOGRAPHY, KEY } from 'constant'

RHFFilteredSearchBar.propTypes = {
 name: PropTypes.string.isRequired,
 filterOptions: PropTypes.array.isRequired,
 placeholder: PropTypes.string,
 helperText: PropTypes.node,
 size: PropTypes.string,
 selectedFilter: PropTypes.string.isRequired,
 setSelectedFilter: PropTypes.func.isRequired
}

export default function RHFFilteredSearchBar({ name, filterOptions, size = 'small', placeholder, helperText, selectedFilter, setSelectedFilter = () => {}, ...other }) {
 const { control, watch, setValue } = useFormContext()
 const [error, setError] = useState('')

 const searchKey = watch(name)

 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

 useEffect(() => {
  if (!selectedFilter) setError('Please select a filter option to enable search')
 }, [selectedFilter, setError])

 const clearSearchKey = () => {
  setValue(name, '')
  dispatch(setSelectedFilter(''))
 }

 return (
  <Controller
   name={name}
   control={control}
   render={({ field, fieldState: { error: fieldError } }) => (
    <Stack spacing={0}>
     {isMobile && (
      <Select
       value={selectedFilter}
       onChange={e => {
        dispatch(setSelectedFilter(e.target.value))
        setError('')
       }}
       displayEmpty
       size={size}
       fullWidth
       sx={{
        minWidth: '100%',
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
        boxShadow: 'none',
        borderBottom: '2px solid',
        borderColor: 'divider',
        marginBottom: 1,
        color: selectedFilter === '' ? 'text.secondary' : 'text.primary',
        typography: theme.typography.body2
       }}
       MenuProps={{
        PaperProps: {
         sx: {
          maxHeight: 300,
          overflowY: 'auto',
          '& .MuiMenuItem-root': {
           '&.Mui-selected': {
            color: theme.palette.common.black,
            fontWeight: 'bold',
            backgroundColor: 'howick.orange'
           },
           typography: theme.typography.body2
          }
         }
        }
       }}>
       <MenuItem dense value='' disabled sx={{ color: 'text.secondary', typography: theme.typography.body2 }}>
        {t('select_filter.label')}
       </MenuItem>
       {filterOptions.map(option => (
        <MenuItem key={option.id} value={option.id}>
         {option?.fullLabel || option?.label}
        </MenuItem>
       ))}
      </Select>
     )}
     <TextField
      {...field}
      fullWidth
      placeholder={placeholder}
      error={!!fieldError}
      size={size}
      label={t('search.label')}
      disabled={!selectedFilter}
      sx={{
       '& .MuiInputBase-root': {
        flexDirection: isMobile ? 'row' : 'row'
       },
       '& .MuiInputBase-input::placeholder': {
        color: 'text.secondary',
        typography: isDesktop ? theme.typography.body1 : theme.typography.body2
       },
       '& .MuiInputBase-input': {
        paddingLeft: isMobile ? 1 : 'inherit',
        typography: isDesktop ? theme.typography.body1 : theme.typography.body2
       },
       '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: themeMode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[500]
       },
       '& .Mui-disabled:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[400]
       }
      }}
      {...other}
      InputProps={{
       ...(!isMobile && {
        startAdornment: (
         <InputAdornment position='start' sx={{ mr: 1, ml: 0, height: '100%', width: isMobile ? '100%' : 'auto' }}>
          <Select
           value={selectedFilter}
           onChange={e => {
            dispatch(setSelectedFilter(e.target.value))
            setError('')
           }}
           displayEmpty
           size={size}
           sx={{
            minWidth: isMobile ? '100%' : 120,
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiSelect-select': {
             paddingRight: isMobile ? 'unset' : 0,
             paddingLeft: isMobile ? 4.5 : 0,
             paddingTop: isMobile ? undefined : 0,
             paddingBottom: isMobile ? 'unset' : 0
            },
            boxShadow: 'none',
            borderRight: isMobile ? 'none' : '2px solid',
            borderBottom: isMobile ? '2px solid' : 'none',
            borderRadius: RADIUS.FORM.borderRadius,
            borderColor: 'divider',
            //    paddingRight: 1,
            marginRight: 1,
            color: selectedFilter === '' ? 'text.secondary' : 'text.primary'
           }}
           MenuProps={{
            PaperProps: {
             sx: {
              width: 'auto',
              maxHeight: 300,
              overflowY: 'auto',
              '& .MuiMenuItem-root': {
               typography: isDesktop ? theme.typography.body1 : theme.typography.body2,
               '&.Mui-selected': {
                color: theme.palette.common.black,
                fontWeight: 'bold',
                backgroundColor: 'howick.orange'
               }
              }
             }
            }
           }}>
           <MenuItem dense value='' disabled sx={{ color: 'text.secondary' }}>
            {t('select_filter.label')}
           </MenuItem>
           {filterOptions?.map(option => (
            <MenuItem key={option?.id} value={option?.id}>
              {option?.fullLabel || option?.label}
            </MenuItem>
           ))}
          </Select>
         </InputAdornment>
        )
       }),
       endAdornment: searchKey?.length > 0 && (
        <InputAdornment position={KEY.END}>
         <Button onClick={clearSearchKey} color='error' size='small' startIcon={<Icon icon={ICON_NAME.TRASH} />}>
          {t('clear.label')}
         </Button>
        </InputAdornment>
       )
      }}
     />
     <Box sx={{ minHeight: '20px' }}>
      {(fieldError || error || helperText) && (
       <Typography variant={TYPOGRAPHY.CAPTION} color='text.disabled' sx={{ marginLeft: 1 }}>
        {fieldError ? fieldError.message : error || helperText}
       </Typography>
      )}
     </Box>
    </Stack>
   )}
  />
 )
}
