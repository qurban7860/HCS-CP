import { Fragment, memo, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { Box, Switch, Typography, FormControlLabel, Button, MenuItem, Checkbox, Menu } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTablePaginationCustom, GStyledMachineChip } from 'theme/style'
import { normalizer, charAtText } from 'util'
import { KEY, TYPOGRAPHY } from 'constant'

function TablePaginationCustom({
 count,
 data,
 dense,
 component,
 onChangeDense,
 rowsPerPage,
 rowsPerPageOptions = [10, 20, 50, 100],
 columnFilterButtonData = [],
 columnButtonClickHandler = () => {},
 sx,
 ...other
}) {
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
    <Fragment>
     <Box sx={{ flexGrow: 1, pl: 2 }}>
      <Button
       startIcon={<Icon icon={ICON_NAME.COLUMN} />}
       variant='outlined'
       onClick={e => setAnchorEl(e.currentTarget)}
       sx={{
        mr: 1,
        color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[0],
        border: `1px solid ${themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[0]}`
       }}>
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
         width: '25ch',
         maxHeight: 300,
         overflowY: 'auto'
        }
       }}>
       {columnFilterButtonData?.map(column => (
        <MenuItem dense sx={{ p: 0 }} key={column.id} onClick={() => handleColumnClick(column)}>
         <Checkbox checked={column.checked} disabled={column?.alwaysShow} />
         {normalizer(column.label) === 'machine' ? (
          <Icon title={'Machine'} icon={ICON_NAME.FRAMA} dimension={20} color={theme.palette.grey[400]} />
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
      {/* <IconTooltip title={'Legend'} icon={ICON_NAME.LEGEND} color={theme.palette.grey[600]} cursor tooltipColor={theme.palette.howick.darkBlue} /> */}
     </Box>
    </Fragment>
   )}
   <GStyledTablePaginationCustom
    labelRowsPerPage='Rows:'
    data={data}
    count={count}
    mode={themeMode}
    rowsPerPage={rowsPerPage}
    rowsPerPageOptions={rowsPerPageOptions}
    component={component}
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

TablePaginationCustom.propTypes = {
 sx: PropTypes.object,
 data: PropTypes.number,
 count: PropTypes.number,
 dense: PropTypes.bool,
 component: PropTypes.elementType,
 onChangeDense: PropTypes.func,
 rowsPerPage: PropTypes.number,
 rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
 columnFilterButtonData: PropTypes.array,
 columnButtonClickHandler: PropTypes.func
}

export default memo(TablePaginationCustom)
