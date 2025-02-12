import PropTypes from 'prop-types'
import { t } from 'i18next'
import { ICON_NAME, useSettingContext } from 'hook'
import { TableHead, TableRow, TableSortLabel, Typography } from '@mui/material'
import { IconTooltip } from 'component'
import { useTheme } from '@mui/material/styles'
import { normalizer } from 'util'
import { KEY, TYPOGRAPHY } from 'constant'
import { StyledHeaderTableCell } from './style'

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
            <IconTooltip
              title={t('machine.label')}
              icon={ICON_NAME.FRAMA}
              color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[300]}
              tooltipColor={theme.palette.howick.midBlue}
              iconOnly
              cursor
            />
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

LogsHeader.propTypes = {
 mode: PropTypes.string,
 dataFiltered: PropTypes.array,
 columns: PropTypes.array,
 orderBy: PropTypes.string,
 order: PropTypes.string,
 onSort: PropTypes.func
}

export default LogsHeader
