import PropTypes from 'prop-types'
import { TableBody, TableCell, TableRow } from '@mui/material'
import { useSettingContext } from 'component/setting'
import { EmptyContent } from 'component'
import { FALLBACK } from 'constant'

const TableNoData = ({ isNotFound }) => {
  const { themeMode } = useSettingContext()
  return (
    <>
      {isNotFound ? (
        <TableBody>
          <TableRow>
            <TableCell colSpan={12}>
              <EmptyContent
                {...FALLBACK.NO_DATA}
                sx={{
                  color: themeMode === 'dark' ? 'text.secondary' : 'grey.700'
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          <TableRow>
            <TableCell colSpan={12} sx={{ p: 0 }} />
          </TableRow>
        </TableBody>
      )}
    </>
  )
}

TableNoData.propTypes = {
  isNotFound: PropTypes.bool
}

export default TableNoData
