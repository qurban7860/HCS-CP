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

  const getLogsFormattedLabel = (column, activeUnitSystem) => {
    const { label, unit } = column;
    if (!column.convertable) return label;

    let displayLabel = label;
    let displayUnit = null;

    // Metric Length
    if (activeUnitSystem === 'Metric' && ['m', 'mm'].includes(unit?.toLowerCase())) {
      displayUnit = unit;
    }
    // Imperial Length
    else if (activeUnitSystem === 'Imperial' && ['m', 'mm'].includes(unit?.toLowerCase())) {
      displayUnit = 'in';
    }
    // Imperial Weight
    else if (activeUnitSystem === 'Imperial' && unit?.toLowerCase() === 'kg') {
      displayUnit = 'lbs';
    }
    else if (unit?.toLowerCase() === 'msec') {
      displayUnit = 's';
    }
    else if (unit) {
      displayUnit = unit;
    }

    if (displayUnit) {
      return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {displayLabel}
        <Typography variant={TYPOGRAPHY.OVERLINE0} p={0} sx={{ textTransform: 'none', ml: 0.5 }}>
        ({displayUnit})
        </Typography>
      </span>
      );
    }
    return displayLabel;
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
                            {getLogsFormattedLabel(headCell, unitType)}
                          </Typography>
                          {/* {headCell?.unit && <Typography variant={TYPOGRAPHY.OVERLINE0} p={0} sx={{ textTransform: 'none', ml: 0.5 }}>
                            {` (${getLogsFormattedLabel(headCell, unitType)})`}
                          </Typography>} */}
                        </span>
                      </Tooltip>
                    ) : (
                      <span style={{ display: 'flex' }}>
                        <Typography variant={TYPOGRAPHY.OVERLINE0} p={0}>
                          {getLogsFormattedLabel(headCell, unitType)}
                        </Typography>
                        {/* {headCell?.unit && <Typography variant={TYPOGRAPHY.OVERLINE0} p={0} sx={{ textTransform: 'none', ml: 0.5 }}>
                          {` (${getLogsFormattedLabel(headCell, unitType)})`}
                        </Typography>} */}
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
  unitType: PropTypes.string,
  onSort: PropTypes.func
}

export default LogsHeader
