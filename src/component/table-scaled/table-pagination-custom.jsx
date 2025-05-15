import { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { useMediaQuery, Box, Switch, Typography, FormControlLabel, Button, MenuItem, Checkbox, Menu, TablePagination } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { KEY, TYPOGRAPHY } from 'constant'
import { normalizer } from 'util'

function TablePaginationCustom({
    count,
    page,
    dense,
    component,
    onChangeDense,
    rowsPerPage,
    onChangePage,
    onChangeRow,
    disabledColumn,
    rowsPerPageOptions = [10, 20, 50, 100],
    tableColumns = [],
    onChangeColumn = () => { },
    noPaginationBar = false,
    nodeBeforeColum,
    nodeAfterColum,
    nodeBeforePagination,
    nodeAfterPagination,
    sx,
    ...other
}) {
    const theme = useTheme()
    const { themeMode } = useSettingContext()
    const [anchorEl, setAnchorEl] = useState(null)
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    const handleColumnClick = column => {
        if (!column.alwaysShow) {
            onChangeColumn(column.id, !column.checked)
        }
    }

    const handleClose = () => setAnchorEl(null)

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', md: 'center' },
                color: themeMode === KEY.LIGHT ? theme.palette.grey[900] : theme.palette.grey[0],
                background: themeMode === KEY.LIGHT ? theme.palette.background.default : theme.palette.grey[800],
                ...sx
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    width: { xs: '100%', md: 'auto' },
                    gap: { xs: 1, md: 0 },
                    mb: { xs: 1, md: 0 }
                }}>
                {nodeBeforeColum}
                {Array.isArray(tableColumns) && tableColumns?.length > 0 && <Box
                    sx={{
                        pl: { xs: 0, md: 2 },
                        width: '100%',
                        mb: { xs: 1, md: 0 },
                        mr: { md: 1 }
                    }}>
                    <Button
                        fullWidth
                        startIcon={<Icon icon={ICON_NAME.COLUMN} />}
                        variant='outlined'
                        disabled={disabledColumn}
                        onClick={e => setAnchorEl(e.currentTarget)}
                        sx={{
                            color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[0],
                            border: `1px solid ${themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[0]}`
                        }}>
                        <Typography variant={TYPOGRAPHY.BODY2}>{t('column.columns.label')}</Typography>
                    </Button>
                    <Menu id='column-menu' anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose} PaperProps={{ style: { width: isDesktop ? '25ch' : '100%', maxHeight: 300, overflowY: 'auto' } }}>
                        {tableColumns?.map(column => (
                            <MenuItem dense sx={{ p: 0 }} key={column.id} onClick={() => handleColumnClick(column)}>
                                <Checkbox checked={column.checked} disabled={column?.alwaysShow || false} />
                                {
                                    normalizer(column.label) === 'date' ?
                                        (<Icon icon={ICON_NAME.CALENDAR_CLOCK} dimension={20} c color={theme.palette.grey[400]} />) :
                                        (column?.icon && <Icon icon={column?.icon} dimension={20} c color={theme.palette.grey[400]} />)
                                }
                                &nbsp;
                                {column.fullLabel || column.label}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>}

                {nodeAfterColum}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                {nodeBeforePagination}
                {!noPaginationBar && (
                    <TablePagination
                        count={count}
                        mode={themeMode}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={onChangePage}
                        onRowsPerPageChange={onChangeRow}
                        rowsPerPageOptions={rowsPerPageOptions}
                        labelRowsPerPage={t('row.label') + ':'}
                        component={component}
                        showLastButton
                        showFirstButton
                        {...other}
                        sx={{
                            borderTop: 'none',
                            '.MuiTablePagination-toolbar': { height: '20px', width: '!important 200px' },
                            width: { xs: '100%', md: 'auto' }
                        }}
                    />
                )}
                {nodeAfterPagination}
            </Box>
            {onChangeDense && (
                <FormControlLabel
                    label='Dense'
                    control={<Switch checked={dense} onChange={onChangeDense} />}
                    sx={{
                        pl: 2, py: 1.5,
                        position: { md: 'absolute', right: 0 }
                    }}
                />
            )}
        </Box>
    )
}

TablePaginationCustom.propTypes = {
    sx: PropTypes.object,
    count: PropTypes.number,
    page: PropTypes.number,
    dense: PropTypes.bool,
    disabledColumn: PropTypes.bool,
    component: PropTypes.elementType,
    onChangeDense: PropTypes.func,
    rowsPerPage: PropTypes.number,
    onChangePage: PropTypes.func,
    onChangeRow: PropTypes.func,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    tableColumns: PropTypes.array,
    onChangeColumn: PropTypes.func,
    noPaginationBar: PropTypes.bool,
    nodeBeforeColum: PropTypes.node,
    nodeAfterColum: PropTypes.node,
    nodeBeforePagination: PropTypes.node,
    nodeAfterPagination: PropTypes.node,
}

export default memo(TablePaginationCustom)
