import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { TableBody, TableCell } from '@mui/material'
import { LinkTableCell } from 'component'
import { fDateTime } from 'util'
import { StyledTableRow } from './style'

const LogsTable = ({ index, onViewRow, columns, row, selected, order, onSort }) => {
 const { themeMode } = useSettingContext()

 row = { ...row, machineSerialNo: row?.machine?.serialNo }
 const { date } = row
 const lowercaseRow = {}
 Object.entries(row).forEach(([key, value]) => {
  if (typeof key === 'string') lowercaseRow[key.toLocaleLowerCase()] = value
 })

 return (
  <Fragment>
   <TableBody>
    <StyledTableRow index={index} mode={themeMode} selected={selected}>
     <LinkTableCell align='left' onClick={onViewRow} param={fDateTime(date)} />
     {columns?.map((column, index) => {
      if (['date', 'createdBy.name', 'createdAt'].includes(column.id) || !column?.checked) return null
      const cellValue = lowercaseRow?.[column.id.toLocaleLowerCase()] || ''
      return (
       <TableCell key={index} onClick={onViewRow} sx={{ cursor: 'pointer' }} align={column?.numerical ? 'right' : 'left'}>
        {cellValue}
       </TableCell>
      )
     })}
    </StyledTableRow>
   </TableBody>
  </Fragment>
 )
}

LogsTable.propTypes = {
 mode: PropTypes.string,
 index: PropTypes.number,
 orderBy: PropTypes.string,
 onViewRow: PropTypes.func,
 dataFiltered: PropTypes.array,
 columns: PropTypes.array,
 order: PropTypes.string,
 onSort: PropTypes.func,
 row: PropTypes.object,
 selected: PropTypes.bool
}

export default LogsTable
