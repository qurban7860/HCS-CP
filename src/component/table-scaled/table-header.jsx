import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { TableHead, TableRow, TableSortLabel, Typography, Tooltip } from '@mui/material'
import { IconTooltip } from 'component'
import { useTheme } from '@mui/material/styles'
import { KEY, TYPOGRAPHY } from 'constant'
import { StyledHeaderTableCell } from './style'

const DocumentsHeader = ({ dataFiltered, columns, orderBy, order, onSort }) => {
  const { themeMode } = useSettingContext()
  const theme = useTheme()

  return (
    <TableHead>
      <TableRow>
        {dataFiltered.length > 0 &&
          columns?.map((headCell, index) => {
            if (!headCell?.checked) return null
            return (
              <StyledHeaderTableCell
                key={headCell.id}
                mode={themeMode}
                align={headCell?.align || 'left'}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={{ width: headCell.width, minWidth: headCell.minWidth }}>
                {onSort ? (
                  <TableSortLabel hideSortIcon active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={() => onSort(headCell.id)} sx={{ textTransform: 'capitalize' }}>
                    {headCell?.icon ? (
                      <IconTooltip
                        title={headCell?.label || ''}
                        icon={headCell.icon || ''}
                        color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[300]}
                        tooltipColor={theme.palette.howick.midBlue}
                        iconOnly
                        cursor
                      />
                    ) : headCell.tooltip ? (
                      <Tooltip
                        placement="top"
                        title={headCell.fullLabel || headCell.label}
                      >
                        <span>
                          <Typography variant={TYPOGRAPHY.OVERLINE0} p={0}>
                            {headCell.label}
                          </Typography>
                        </span>
                      </Tooltip>
                    ) : (
                      <Typography variant={TYPOGRAPHY.OVERLINE0} p={0}>
                        {headCell.label}
                      </Typography>
                    )}
                  </TableSortLabel>
                ) : (
                  headCell.label
                )}
              </StyledHeaderTableCell>
            )
          })}
      </TableRow>
    </TableHead>
  )
}

DocumentsHeader.propTypes = {
  mode: PropTypes.string,
  dataFiltered: PropTypes.array,
  columns: PropTypes.array,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func
}

export default DocumentsHeader
