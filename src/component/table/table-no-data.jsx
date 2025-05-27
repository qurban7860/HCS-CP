import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { TableBody, TableCell, TableRow } from '@mui/material'
import { EmptyContent } from 'component'
import { FALLBACK } from 'constant'

const TableNoData = ({ isNotFound, ticketNotFound, logNotFound, graphNotFound }) => {
 const { themeMode } = useSettingContext()
 return (
  <Fragment>
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
   ) : logNotFound ? (
    <TableBody>
     <TableRow>
      <TableCell colSpan={12}>
       <EmptyContent
        {...FALLBACK.NO_LOG}
        sx={{
         color: themeMode === 'dark' ? 'text.secondary' : 'grey.700'
        }}
       />
      </TableCell>
     </TableRow>
    </TableBody>
   ) : graphNotFound ? (
    <TableBody>
     <TableRow>
      <TableCell colSpan={12}>
       <EmptyContent
        {...FALLBACK.NO_GRAPH}
        sx={{
         color: themeMode === 'dark' ? 'text.secondary' : 'grey.700'
        }}
       />
      </TableCell>
     </TableRow>
    </TableBody>
   ) : (
    ticketNotFound && (
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
    )
   )}
  </Fragment>
 )
}

TableNoData.propTypes = {
 isNotFound: PropTypes.bool,
 ticketNotFound: PropTypes.bool,
 logNotFound: PropTypes.bool,
 graphNotFound: PropTypes.bool
}

export default TableNoData
