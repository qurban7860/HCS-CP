import { useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Icon, ICON_NAME } from 'hook'
import { TextField, InputAdornment, Button, Box, Grid, Autocomplete } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { IconTooltip } from 'component'
import { BUTTON, KEY, LABEL } from 'constant'

const SearchBox = ({ term, handleSearch, mode, onReload, mt = 5, handleCreateTicket, filterResolvedStatus, onFilterResolvedStatus }) => {
  const [isSearchEmpty, setIsSearchEmpty] = useState(true)
  const theme = useTheme()

  const [resolvedOptions] = useState([
    { value: 'all', label: 'All' },
    { value: 'unresolved', label: 'Open' },
    { value: 'resolved', label: 'Closed' },
  ]);

  const handleInputChange = event => {
    setIsSearchEmpty(event.target.value === '')
  }

  return (
    <Box mt={mt} mb={2}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <TextField
            fullWidth
            value={term}
            onChange={(e) => {
              handleSearch(e)
              handleInputChange(e)
            }}
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              endAdornment: !isSearchEmpty && (
                <InputAdornment position="end">
                  <Button
                    fullWidth
                    onClick={() => {
                      handleSearch({ target: { value: '' } });
                      setIsSearchEmpty(true);
                    }}
                    color="error"
                    size="small"
                    startIcon={<Icon icon="eva:trash-2-outline" />}
                  >
                    {BUTTON.CLEAR}
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: mode === KEY.LIGHT ? 'grey.200' : 'grey.700',
              color: mode === KEY.LIGHT ? 'common.black' : 'common.white',
              marginBottom: 0,
              '& .MuiInputBase-root.MuiInputBase-adornedStart': {
                color: mode === KEY.LIGHT ? 'common.black' : 'common.white',
              },
            }}
          />
        </Grid>

        {filterResolvedStatus && (
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <Autocomplete
              value={resolvedOptions.find((option) => option.value === filterResolvedStatus) || null}
              name="isResolved"
              options={resolvedOptions}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => <TextField {...params} size="small" label="Status" />}
              onChange={(event, newValue) => {
                onFilterResolvedStatus(newValue ? newValue.value : 'unresolved');
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
            />
          </Grid>
        )}

        <Grid item xs />
        
        <Grid item>
          {handleCreateTicket && (
            <IconTooltip
              icon={ICON_NAME.ADD}
              title={t('create_ticket.label')}
              placement={KEY.TOP}
              tooltipColor={mode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.bronze}
              color={theme.palette.howick.midBlue}
              dimension={25}
              onClick={handleCreateTicket}
            />
          )}
          {onReload && (
            <IconTooltip
              icon={ICON_NAME.REFRESH}
              title={LABEL.RELOAD}
              placement={KEY.TOP}
              tooltipColor={mode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.bronze}
              color={theme.palette.howick.midBlue}
              dimension={25}
              onClick={onReload}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

SearchBox.propTypes = {
  term: PropTypes.string,
  handleSearch: PropTypes.func,
  mode: PropTypes.string,
  mt: PropTypes.number,
  onReload: PropTypes.func,
  handleCreateTicket: PropTypes.func,
  filterResolvedStatus: PropTypes.string,
  onFilterResolvedStatus: PropTypes.func,
};

export default SearchBox
