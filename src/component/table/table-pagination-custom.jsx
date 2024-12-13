import { Fragment, memo, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { useMediaQuery, Box, Switch, Typography, FormControlLabel, Button, MenuItem, Checkbox, Menu } from '@mui/material'
import { ColorizedStatusTextBox } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledTablePaginationCustom, GStyledMachineChip, GStyledSpanBox } from 'theme/style'
import { KEY, TYPOGRAPHY } from 'constant'
import { STATUS_TYPES } from 'config'
import { normalizer, charAtText } from 'util'

function TablePaginationCustom({
 count,
 data,
 dense,
 component,
 onChangeDense,
 rowsPerPage,
 disabled,
 currentFilterStatus,
 showFilterStatus = false,
 handleFilterStatus,
 rowsPerPageOptions = [10, 20, 50, 100],
 columnFilterButtonData = [],
 columnButtonClickHandler = () => {},
 sx,
 ...other
}) {
 const [anchorEl, setAnchorEl] = useState(null)
 const [filterStatusAnchorEl, setFilterStatusAnchorEl] = useState(null)

 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

 const handleColumnClick = column => {
  if (!column.alwaysShow) {
   columnButtonClickHandler(column.id, !column.checked)
  }
  handleClose()
 }

 const handleClose = () => {
  setAnchorEl(null)
 }

 const handleFilterStatusClose = () => {
  setFilterStatusAnchorEl(null)
 }

 const filteredRowsPerPageOptions = rowsPerPageOptions.filter(option => option <= data.length)
 const isPaginationDisabled = data.length <= rowsPerPage

 return (
  <Box
   sx={{
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: themeMode === KEY.LIGHT ? theme.palette.grey[900] : theme.palette.grey[0],
    background: themeMode === KEY.LIGHT ? theme.palette.background.default : theme.palette.grey[800],
    ...sx
   }}>
   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    {columnFilterButtonData?.length > 0 && (
     <Fragment>
      <Box sx={{ flexGrow: 1, pl: 2 }}>
       <Button
        startIcon={<Icon icon={ICON_NAME.COLUMN} />}
        variant='outlined'
        disabled={disabled}
        onClick={e => setAnchorEl(e.currentTarget)}
        sx={{
         mr: 1,
         color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[0],
         border: `1px solid ${themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[0]}`
        }}>
        <Typography variant={isDesktop ? TYPOGRAPHY.BODY2 : TYPOGRAPHY.CAPTION}>{t('column.columns.label')}</Typography>
       </Button>
       <Menu
        id='long-menu'
        MenuListProps={{ 'aria-labelledby': 'long-button' }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        PaperProps={{ style: { width: '25ch', maxHeight: 300, overflowY: 'auto' } }}>
        {columnFilterButtonData?.map(column => (
         <MenuItem dense sx={{ p: 0 }} key={column.id} onClick={() => handleColumnClick(column)}>
          <Checkbox checked={column.checked} disabled={column?.alwaysShow} />
          {normalizer(column.label) === 'machine' ? (
           <Icon title={t('machine.label')} icon={ICON_NAME.FRAMA} dimension={20} color={theme.palette.grey[400]} />
          ) : normalizer(column.label) === 'date' ? (
           <Icon icon={ICON_NAME.CALENDAR_CLOCK} dimension={20} c color={theme.palette.grey[400]} />
          ) : (
           <GStyledMachineChip
            mode={themeMode}
            size='small'
            label={
             <Typography variant={TYPOGRAPHY.OVERLINE0} p={0}>
              {charAtText(column.label)}
             </Typography>
            }
            disabled
           />
          )}
          &nbsp;
          {column.label}
         </MenuItem>
        ))}
       </Menu>
      </Box>
     </Fragment>
    )}
    {showFilterStatus && (
     <Fragment>
      <Box sx={{ flexGrow: 1, pl: 2 }}>
       <Button
        startIcon={<Icon icon={ICON_NAME.STATUS_FILTER} />}
        variant='outlined'
        onClick={e => setFilterStatusAnchorEl(e.currentTarget)}
        sx={{
         mr: 1,
         color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[0],
         border: `1px solid ${themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[0]}`
        }}>
        <GStyledSpanBox>
         <Typography variant={isDesktop ? TYPOGRAPHY.BODY2 : TYPOGRAPHY.CAPTION}>{t('status.label') + ':'} </Typography>
         <ColorizedStatusTextBox status={currentFilterStatus} />
         {!filterStatusAnchorEl ? <Icon icon={ICON_NAME.CHEVRON_DOWN} /> : <Icon icon={ICON_NAME.CHEVRON_UP} />}
        </GStyledSpanBox>
       </Button>
       <Menu
        id='long-menu'
        MenuListProps={{ 'aria-labelledby': 'long-button' }}
        anchorEl={filterStatusAnchorEl}
        open={!!filterStatusAnchorEl}
        onClose={handleFilterStatusClose}
        PaperProps={{ style: { width: '25ch', maxHeight: 300, overflowY: 'auto' } }}>
        {STATUS_TYPES?.map(column => (
         <MenuItem dense sx={{ p: 1 }} key={column.id} onClick={e => handleFilterStatus(e, column.value)} value={column.value}>
          <Typography variant={TYPOGRAPHY.BODY2}>{column.label}</Typography>
         </MenuItem>
        ))}
       </Menu>
      </Box>
     </Fragment>
    )}
   </Box>
   <GStyledTablePaginationCustom
    labelRowsPerPage={t('row.label') + ':'}
    data={data}
    count={count}
    mode={themeMode}
    rowsPerPage={rowsPerPage}
    rowsPerPageOptions={isPaginationDisabled ? false : filteredRowsPerPageOptions}
    component={component}
    showLastButton
    showFirstButton
    {...other}
    sx={{ '.MuiTablePagination-toolbar': { height: '20px', width: '!important 200px' }, borderTop: 'none' }}
    {...other}
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

TablePaginationCustom.propTypes = {
 sx: PropTypes.object,
 data: PropTypes.object,
 count: PropTypes.number,
 dense: PropTypes.bool,
 disabled: PropTypes.bool,
 currentFilterStatus: PropTypes.any,
 showFilterStatus: PropTypes.bool,
 handleFilterStatus: PropTypes.func,
 component: PropTypes.elementType,
 onChangeDense: PropTypes.func,
 rowsPerPage: PropTypes.number,
 rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
 columnFilterButtonData: PropTypes.array,
 columnButtonClickHandler: PropTypes.func
}

export default memo(TablePaginationCustom)
