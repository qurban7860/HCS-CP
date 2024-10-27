import PropTypes from 'prop-types'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { TableHead, TableRow, TableSortLabel, Typography } from '@mui/material'
import { IconTooltip } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledMachineChip, GStyledTooltip } from 'theme/style'
import { StyledHeaderTableCell } from './style'
import { normalizer, charAtText } from 'util'
import { TYPOGRAPHY } from 'constant'

const LogsHeader = ({ dataFiltered, columns, orderBy, order, onSort }) => {
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
        align={headCell?.numerical ? 'right' : 'left'}
        sortDirection={orderBy === headCell.id ? order : false}
        sx={{ width: headCell.width, minWidth: headCell.minWidth }}>
        {onSort ? (
         <TableSortLabel hideSortIcon active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={() => onSort(headCell.id)} sx={{ textTransform: 'capitalize' }}>
          {normalizer(headCell.label) === 'machine' ? (
           <IconTooltip title={'Machine'} icon={ICON_NAME.FRAMA} color={theme.palette.grey[700]} iconOnly cursor />
          ) : normalizer(headCell.label) === 'date' ? (
           <IconTooltip title={'Date'} icon={ICON_NAME.CALENDAR_CLOCK} color={theme.palette.grey[700]} iconOnly cursor />
          ) : (
           <GStyledMachineChip
            mode={themeMode}
            size='small'
            label={
             <GStyledTooltip disableFocusListener title={headCell.label} tooltipcolor='#103996' placement={'top'}>
              <Typography variant={TYPOGRAPHY.OVERLINE1} p={0}>
               {charAtText(headCell.label)}
              </Typography>
             </GStyledTooltip>
            }
           />
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
