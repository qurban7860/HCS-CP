import { useRef, useEffect } from 'react'
import { useSettingContext, snack } from 'hook'
import { Autocomplete, Box, Typography } from '@mui/material'
import { RHFTextField } from 'component/hook-form'
import { useTheme } from '@mui/material/styles'
import { GStyledMachineChip, GStyledScrollChipBox } from 'theme/style'
import { TYPOGRAPHY, KEY, REGEX, RESPONSE, COLOR } from 'constant'

const AutocompleteScrollChipContainer = ({ list, setList, handleInputChange, renderInput }) => {
 const chipContainerRef = useRef(null)
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const serialNoRegEx = new RegExp(REGEX.SERIAL_NO)

 useEffect(() => {
  if (chipContainerRef.current) {
   chipContainerRef.current.scrollLeft = chipContainerRef.current.scrollWidth
  }
 }, [list])

 const validateSerialNumbers = (value) => {
  return value.every((serialNumber) => serialNumber.length === 5 && serialNoRegEx.test(serialNumber))
 }

 const handleValidateSerialNumbers = (event, value) => {
  if (validateSerialNumbers(value)) {
   return setList(value)
  } else {
   snack('Serial Number provided is invalid', { variant: COLOR.ERROR })
   return []
  }
 }

 return (
  <Box sx={{ width: '100%' }}>
   <Autocomplete
    multiple
    freeSolo
    options={[]}
    value={list}
    onChange={handleValidateSerialNumbers}
    onInputChange={handleInputChange}
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
       <GStyledMachineChip key={index + 1} label={<Typography variant={TYPOGRAPHY.H6}>{option}</Typography>} mode={themeMode} {...getTagProps({ index })} />
      ))}
     </Box>
    )}
    renderInput={renderInput}
   />
  </Box>
 )
}

export default AutocompleteScrollChipContainer
