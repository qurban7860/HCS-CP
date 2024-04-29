import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { EmptyContent } from 'component'

TableNoData.propTypes = {
  isNotFound: PropTypes.bool
}

export default function TableNoData({ isNotFound }) {
  return (
    <>
      {isNotFound ? (
        <TableBody>
          <TableRow>
            <TableCell colSpan={12}>
              <EmptyContent
                title="Empty"
                sx={{
                  color: 'grey.200'
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
