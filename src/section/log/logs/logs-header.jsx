import PropTypes from 'prop-types'
import { t } from 'i18next'
import { ICON_NAME, useSettingContext } from 'hook'
import { TableHead, TableRow, TableSortLabel, Typography, Tooltip } from '@mui/material'
import { IconTooltip } from 'component'
import { useTheme } from '@mui/material/styles'
import { normalizer } from 'util'
import { KEY, TYPOGRAPHY } from 'constant'
import { StyledHeaderTableCell } from './style'

const LogsHeader = ({ dataFiltered, columns, orderBy, order, onSort, unitType }) => {
  const { themeMode } = useSettingContext()
  const theme = useTheme()

  const getFormattedLabel = (cellVal, activeUnit) => {
    // Imperial Length
    if (activeUnit === 'Imperial' && (cellVal?.unit === 'mm' || cellVal?.unit === 'm')) {
      return 'in';
    }
    // Imperial Weight
    if (activeUnit === 'Imperial' && cellVal?.unit === 'kg') {
      return 'pound';
    }
    // Fallback to baseUnit or just label
    return cellVal?.unit || '';
  };

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
                align={headCell?.numerical ? 'right' : 'left'}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={{ width: headCell.width, minWidth: headCell.minWidth }}>
                {onSort ? (
                  <TableSortLabel hideSortIcon active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={() => onSort(headCell.id)} sx={{ textTransform: 'capitalize' }}>
                    {normalizer(headCell.label) === 'machine' ? (
                      <IconTooltip
                        title={t('machine.label')}
                        icon={ICON_NAME.FRAMA}
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
                        <span style={{ display: 'flex' }}>
                          <Typography variant={TYPOGRAPHY.OVERLINE0} p={0}>
                            {headCell.label}
                          </Typography>
                          {headCell?.unit && <Typography variant={TYPOGRAPHY.OVERLINE0} p={0} sx={{ textTransform: 'none', ml: 0.5 }}>
                            {` (${getFormattedLabel(headCell, unitType)})`}
                          </Typography>}
                        </span>
                      </Tooltip>
                    ) : (
                      <span style={{ display: 'flex' }}>
                        <Typography variant={TYPOGRAPHY.OVERLINE0} p={0}>
                          {headCell?.label || ''}
                        </Typography>
                        {headCell?.unit && <Typography variant={TYPOGRAPHY.OVERLINE0} p={0} sx={{ textTransform: 'none', ml: 0.5 }}>
                          {` (${getFormattedLabel(headCell, unitType)})`}
                        </Typography>}
                      </span>
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

LogsHeader.propTypes = {
  mode: PropTypes.string,
  dataFiltered: PropTypes.array,
  columns: PropTypes.array,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func
}

export default LogsHeader
