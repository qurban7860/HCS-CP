import { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, ICON_NAME } from 'hook'
import { TextField, InputAdornment, Button, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { IconTooltip } from 'component'
import { GStyledSpanBox } from 'theme/style'
import { BUTTON, COLOR, FLEX, KEY, LABEL, SIZE, VARIANT } from 'constant'

const SearchBox = ({ term, handleSearch, mode, onReload, mt = 5 }) => {
 const [isSearchEmpty, setIsSearchEmpty] = useState(true)
 const theme = useTheme()

 const handleInputChange = event => {
  setIsSearchEmpty(event.target.value === '')
 }

 return (
  <Box display={FLEX.FLEX} justifyContent={FLEX.SPACE_BETWEEN} mt={mt}>
   <TextField
    variant={VARIANT.FILLED}
    value={term}
    size={SIZE.SMALL}
    fullWidth
    onChange={e => {
     handleSearch(e)
     handleInputChange(e)
    }}
    placeholder={''}
    // placeholder={LABEL.SEARCH}
    InputProps={{
     startAdornment: (
      <InputAdornment position={KEY.START}>
       <Icon icon={ICON_NAME.SEARCH} />
      </InputAdornment>
     ),

     endAdornment: !isSearchEmpty && (
      <InputAdornment position={KEY.END}>
       <Button
        variant={VARIANT.FILLED}
        color={COLOR.PRIMARY}
        size={SIZE.SMALL}
        onClick={() => {
         handleSearch({
          target: {
           value: ''
          }
         })
         setIsSearchEmpty(true)
        }}>
        {BUTTON.CLEAR}
       </Button>
      </InputAdornment>
     ),
     sx: {
      color: mode === KEY.LIGHT ? 'common.black' : 'common.white',
      padding: '0px 10px'
     }
    }}
    sx={{
     backgroundColor: mode === KEY.LIGHT ? 'grey.200' : 'grey.700',
     color: mode === KEY.LIGHT ? 'common.black' : 'common.white',
     marginBottom: 0,
     width: '500px',
     '&.MuiInputBase-root': {
      '&.MuiInputBase-adornedStart': {
       color: mode === KEY.LIGHT ? 'common.black' : 'common.white'
      }
     }
    }}
   />
   {onReload && (
    <IconTooltip
     icon={ICON_NAME.REFRESH}
     title={LABEL.RELOAD}
     placement={KEY.TOP}
     variant={VARIANT.CONTAINED}
     tooltipColor={mode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.bronze}
     color={mode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}
     dimension={25}
     onClick={onReload}
    />
   )}
  </Box>
 )
}

SearchBox.propTypes = {
 term: PropTypes.string,
 handleSearch: PropTypes.func,
 mode: PropTypes.string,
 mt: PropTypes.number,
 onReload: PropTypes.func
}

export default SearchBox
