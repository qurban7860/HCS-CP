import { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { Box, Switch, TablePagination, FormControlLabel, Button, MenuItem, Checkbox, Menu } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTablePaginationCustom } from 'theme/style'
import { t } from 'i18next'
import { KEY } from 'constant'

TablePaginationCustom.propTypes = {
 sx: PropTypes.object,
 dense: PropTypes.bool,
 onChangeDense: PropTypes.func,
 rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
 columnFilterButtonData: PropTypes.array,
 columnButtonClickHandler: PropTypes.func
}

function TablePaginationCustom({ dense, onChangeDense, rowsPerPageOptions = [10, 20, 50, 100], columnFilterButtonData = [], columnButtonClickHandler = () => {}, sx, ...other }) {
 const [anchorEl, setAnchorEl] = useState(null)
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const handleColumnClick = column => {
  if (!column.alwaysShow) {
   columnButtonClickHandler(column.id, !column.checked)
  }
  handleClose()
 }

 const handleClose = () => {
  setAnchorEl(null)
 }

 return (
  <Box
   sx={{
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: themeMode === KEY.LIGHT ? theme.palette.grey[900] : theme.palette.grey[0],
    background: themeMode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[800],
    ...sx
   }}>
   {columnFilterButtonData?.length > 0 && (
    <Box sx={{ flexGrow: 1, pl: 2 }}>
     <Button
      startIcon={<Icon icon={ICON_NAME.COLUMN} />}
      variant='outlined'
      onClick={e => setAnchorEl(e.currentTarget)}
      sx={{ color: themeMode === KEY.LIGHT ? theme.palette.grey[900] : theme.palette.grey[0], border: `1px solid ${themeMode === KEY.LIGHT ? theme.palette.grey[900] : theme.palette.grey[0]}` }}>
      {t('column.columns.label')}
     </Button>
     <Menu
      id='long-menu'
      MenuListProps={{
       'aria-labelledby': 'long-button'
      }}
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={handleClose}
      PaperProps={{
       style: {
        width: '20ch',
        maxHeight: 300,
        overflowY: 'auto'
       }
      }}>
      {columnFilterButtonData?.map(column => (
       <MenuItem dense sx={{ p: 0 }} key={column.id} onClick={() => handleColumnClick(column)}>
        <Checkbox checked={column.checked} disabled={column?.alwaysShow} />
        {column.label}
       </MenuItem>
      ))}
     </Menu>
    </Box>
   )}
   <GStyledTablePaginationCustom
    labelRowsPerPage='Rows:'
    colSpan={2}
    mode={themeMode}
    rowsPerPageOptions={rowsPerPageOptions}
    component='div'
    showLastButton
    showFirstButton
    {...other}
    sx={{
     '.MuiTablePagination-toolbar': {
      height: '20px',
      width: '!important 200px'
     },
     borderTop: 'none'
    }}
   />
   {onChangeDense && (
    <FormControlLabel
     label='Dense'
     control={<Switch checked={dense} onChange={onChangeDense} />}
     sx={{
      pl: 2,
      py: 1.5,
      position: {
       md: 'absolute',
       right: 0
      }
     }}
    />
   )}
  </Box>
 )
}
export default memo(TablePaginationCustom)
