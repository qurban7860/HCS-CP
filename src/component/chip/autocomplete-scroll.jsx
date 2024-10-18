import { useRef, useEffect, useCallback } from 'react'
import { useSettingContext, snack } from 'hook'
import { Autocomplete, Box, Typography, Chip } from '@mui/material'
import { RHFTextField } from 'component/hook-form'
import { useTheme } from '@mui/material/styles'
import { GStyledMachineChip, GStyledScrollChipBox } from 'theme/style'
import { TYPOGRAPHY, KEY, REGEX, RESPONSE, COLOR } from 'constant'

const AutocompleteScrollChipContainer = ({ name, list, handleInputChange, renderInput }) => {
 const chipContainerRef = useRef(null)
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const serialNoRegEx = new RegExp(REGEX.SERIAL_NO)

 useEffect(() => {
  if (chipContainerRef.current) {
   chipContainerRef.current.scrollLeft = chipContainerRef.current.scrollWidth
  }
 }, [list])

 return (
  <Box sx={{ width: '100%' }}>
   <Autocomplete
    multiple
    freeSolo
    options={[]}
    name={name}
    onChange={handleInputChange}
    renderTags={(value, getTagProps) => (
     <Box
      ref={chipContainerRef}
      sx={{
       display: 'flex',
       alignItems: 'center',
       overflowX: 'auto',
       maxHeight: 40,
       whiteSpace: 'nowrap',
       '&::-webkit-scrollbar': {
        height: '6px'
       },
       '&::-webkit-scrollbar-thumb': {
        backgroundColor: themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[900]
       },
       border: `1px solid ${themeMode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[900]}`,
       padding: '4px'
      }}>
      {value.map((option, index) => (
       <Chip
        key={index}
        label={<Typography variant={TYPOGRAPHY.H6}>{option}</Typography>}
        {...getTagProps({ index })}
        sx={{
         margin: theme.spacing(0.2),
         borderRadius: theme.spacing(0.4),
         color: themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black,
         backgroundColor: themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[300]
        }}
       />
      ))}
     </Box>
    )}
    renderInput={renderInput}
   />
  </Box>
 )
}

export default AutocompleteScrollChipContainer
