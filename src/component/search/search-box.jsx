import { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, InputAdornment, Button, Box } from '@mui/material'
import { useIcon, ICON_NAME } from 'hook'
import { BUTTON, KEY } from 'constant'

const SearchBox = ({ term, handleSearch, mode }) => {
  const [isSearchEmpty, setIsSearchEmpty] = useState(true)
  const { Icon: WebIcon, iconSrc: searchSrc } = useIcon(ICON_NAME.SEARCH)

  const handleInputChange = (event) => {
    setIsSearchEmpty(event.target.value === '')
  }

  return (
    <Box display="flex" alignItems="center">
      <TextField
        variant="filled"
        value={term}
        size="small"
        fullWidth
        onChange={(e) => {
          handleSearch(e)
          handleInputChange(e)
        }}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <WebIcon icon={searchSrc} />
            </InputAdornment>
          ),

          endAdornment: !isSearchEmpty && (
            <InputAdornment position="end">
              <Button
                variant="filled"
                color="primary"
                size="small"
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
          style: {
            backgroundColor: mode === KEY.LIGHT ? 'common.white' : 'howick.bronze',
            color: mode === KEY.LIGHT ? 'common.black' : 'common.white',
            padding: '0px 10px'
          }
        }}
        sx={{
          backgroundColor: mode === KEY.LIGHT ? 'common.white' : 'grey.700',
          marginTop: 5,
          marginBottom: 0,
          width: '300px'
        }}
      />
    </Box>
  )
}

SearchBox.propTypes = {
  term: PropTypes.string,
  handleSearch: PropTypes.func
}

export default SearchBox
