import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import { useSettingContext } from 'hook'
import { setSelectedSearchFilter } from 'store/slice'
import { Box, Stack } from '@mui/material'
import { RHFFilteredSearchBar } from 'component/hook-form'
import { GStyledLoadingButton, GStyledControllerCardContainer } from 'theme/style'
import { NAV } from 'config/layout'

const DocumentsTableController = ({ methods }) => {
  const { selectedSearchFilter } = useSelector(state => state.log)
  const { themeMode } = useSettingContext()

  const { watch } = methods
  const { tableColumns } = watch()

  return (
    <GStyledControllerCardContainer height={NAV.H_NAV_DOCUMENT_CONTROLLER}>
      <Stack spacing={2}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: 'auto' } }}>
            <RHFFilteredSearchBar
              name='filteredSearchKey'
              filterOptions={tableColumns}
              setSelectedFilter={setSelectedSearchFilter}
              selectedFilter={selectedSearchFilter}
              placeholder='Looking for something?...'
              helperText={selectedSearchFilter === '_id' ? 'to search by ID, you must enter the complete ID' : ''}
              fullWidth
            />
          </Box>
          <Box sx={{ justifyContent: 'flex-end', display: 'flex' }}>
            <GStyledLoadingButton mode={themeMode} type={'submit'} variant='contained' size='large' sx={{ mt: 0.7 }}>
              {t('log.button.get_logs').toUpperCase()}
            </GStyledLoadingButton>
          </Box>
        </Stack>
      </Stack>
    </GStyledControllerCardContainer>
  )
}

DocumentsTableController.propTypes = {
  methods: PropTypes.object,
}

export default DocumentsTableController
