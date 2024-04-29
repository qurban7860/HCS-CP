import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { useSettingContext } from 'component/setting'
import { EmptyContent } from 'component'

TableNoData.propTypes = {
  isNotFound: PropTypes.bool
}

export default function TableNoData({ isNotFound }) {
  const { themeMode } = useSettingContext()
  return (
    <>
      {isNotFound ? (
        <TableBody>
          <TableRow>
            <TableCell colSpan={12}>
              <EmptyContent
                title="Not Found"
                description="The data you are looking for is not found. Try to use a different keyword."
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
