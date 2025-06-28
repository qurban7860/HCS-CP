import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { TableBody, TableCell } from '@mui/material'
import { LinkTableCell } from 'component'
import { fDateTime } from 'util'
import { StyledTableRow } from './style'

const LogsRow = ({ index, onViewRow, columns, row, selected, order, onSort, unit }) => {
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
        <StyledTableRow index={index} mode={themeMode} selected={selected} sx={{ cursor: 'unset' }}>
          {/* <LinkTableCell align='left' onClick={onViewRow} param={fDateTime(date)} /> */}
          <TableCell align='left'>{fDateTime(date)}</TableCell>
          {columns?.map((column, index) => {
            if (['date', 'createdBy.name', 'createdAt'].includes(column.id) || !column?.checked) return null
            const columnValue = lowercaseRow?.[column.id.toLocaleLowerCase()]
            const isMeter = column?.unit === 'm';
            const isMiliMeter = column?.unit === 'mm';
            const isKg = column?.unit === 'kg';
            const isNumerical = column?.numerical
            let cellValue = columnValue || '';
            const value = parseFloat(columnValue);

            if (columnValue && !isNaN(columnValue)) {
              if (unit === 'Imperial' && (isMeter || isMiliMeter)) {
                // Convert mm to inches
                cellValue = (value / 25.4).toLocaleString(undefined, {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                });
              } else if (unit === 'Metric' && isMeter) {
                // Convert mm to meters
                cellValue = (value / 1000).toLocaleString(undefined, {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                });
              } else if (unit === 'Imperial' && isKg) {
                // Convert kg to pounds
                cellValue = (value * 2.20462).toLocaleString(undefined, {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                });
              } else if (isNumerical) {
                // Keep as-is with formatting
                cellValue = value.toLocaleString(undefined, {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                });
              }
            }
            return (
              <TableCell
                key={index}
                //    onClick={onViewRow} sx={{ cursor: 'pointer' }}
                align={column?.numerical ? 'right' : 'left'}>
                {cellValue}
              </TableCell>
            )
          })}
        </StyledTableRow>
      </TableBody>
    </Fragment>
  )
}

LogsRow.propTypes = {
  mode: PropTypes.string,
  index: PropTypes.number,
  orderBy: PropTypes.string,
  onViewRow: PropTypes.func,
  dataFiltered: PropTypes.array,
  columns: PropTypes.array,
  order: PropTypes.string,
  onSort: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  unit: PropTypes.string,
}

export default LogsRow
