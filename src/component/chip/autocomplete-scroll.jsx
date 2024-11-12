import { useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { Autocomplete, Box, Typography, Chip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { TYPOGRAPHY, KEY, REGEX } from 'constant'

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
  <Box
   sx={{
    width: {
     xs: '350px',
     sm: '600px',
     md: '800px',
     lg: '900px'
    }
   }}>
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
       //    border: `1px solid ${themeMode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[900]}`,
       padding: '4px'
      }}>
      {value.map((option, index) => {
       const { key, ...tagProps } = getTagProps({ index })
       return (
        <Chip
         key={index + 1}
         label={<Typography variant={TYPOGRAPHY.H6}>{option}</Typography>}
         {...tagProps}
         sx={{
          margin: theme.spacing(0.2),
          borderRadius: theme.spacing(0.4),
          color: themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black,
          backgroundColor: themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[300]
         }}
        />
       )
      })}
     </Box>
    )}
    renderInput={renderInput}
   />
  </Box>
 )
}

AutocompleteScrollChipContainer.propTypes = {
 name: PropTypes.string,
 list: PropTypes.array,
 handleInputChange: PropTypes.func,
 renderInput: PropTypes.func
}

export default AutocompleteScrollChipContainer
