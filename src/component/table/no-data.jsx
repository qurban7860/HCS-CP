import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { TableBody, TableCell, TableRow } from '@mui/material'
import { EmptyContent } from 'component'
import { FALLBACK } from 'constant'

const TableNoData = ({ isNotFound, ticketNotFound }) => {
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
      ) : ticketNotFound ? (
        <TableBody>
          <TableRow>
            <TableCell colSpan={12}>
              <EmptyContent
                {...FALLBACK.NO_TICKET}
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
