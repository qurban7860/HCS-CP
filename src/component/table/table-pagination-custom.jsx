import { Fragment, memo, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { useMediaQuery, Box, Switch, Typography, FormControlLabel, Button, MenuItem, Checkbox, Menu } from '@mui/material'
import { ColorizedStatusTextBox } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledTablePaginationCustom, GStyledMachineChip, GStyledSpanBox } from 'theme/style'
import { KEY, TYPOGRAPHY } from 'constant'
import { STATUS_TYPES, ROLE_TYPES } from 'config'
import { normalizer, charAtText, removeWord } from 'util'

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
    currentFilterRole,
    showFilterRole = false,
    handleFilterRole,
    showFilterCategory = false,
    currentFilterCategory,
    handleFilterCategory,
    categoryTypes,
    rowsPerPageOptions = [10, 20, 50, 100],
    columnFilterButtonData = [],
    columnButtonClickHandler = () => { },
    noPaginationToolbar = false,
    sx,
    ...other
}) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [filterStatusAnchorEl, setFilterStatusAnchorEl] = useState(null)
    const [filterRoleAnchorEl, setFilterRoleAnchorEl] = useState(null)
    const [filterCategoryAnchorEl, setFilterCategoryAnchorEl] = useState(null)

    const { themeMode } = useSettingContext()
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    const handleColumnClick = column => {
        if (!column.alwaysShow) {
            columnButtonClickHandler(column.id, !column.checked)
        }
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleFilterStatusClose = () => {
        setFilterStatusAnchorEl(null)
    }

    const handleFilterRoleClose = () => {
        setFilterRoleAnchorEl(null)
    }

    const handleFilterCategoryClose = () => {
        setFilterCategoryAnchorEl(null)
    }

    const filteredRowsPerPageOptions = rowsPerPageOptions.filter(option => option <= data?.length)
    const isPaginationDisabled = data?.length <= rowsPerPage

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
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    width: { xs: '100%', md: 'auto' },
                    gap: { xs: 1, md: 0 },
                    mb: { xs: 1, md: 0 }
                }}>
                {columnFilterButtonData?.length > 0 && (
                    <Box
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
                            disabled={disabled}
                            onClick={e => setAnchorEl(e.currentTarget)}
                            sx={{
                                color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[0],
                                border: `1px solid ${themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[0]}`
                            }}>
                            <Typography variant={TYPOGRAPHY.BODY2}>{t('column.columns.label')}</Typography>
                        </Button>
                        <Menu id='column-menu' anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose} PaperProps={{ style: { width: isDesktop ? '27ch' : '100%', maxHeight: 300, overflowY: 'auto' } }}>
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
                                            size={KEY.SMALL}
                                            label={
                                                <Typography variant={TYPOGRAPHY.OVERLINE0} p={0}>
                                                    {charAtText(column.fullLabel || column.label)}
                                                </Typography>
                                            }
                                            disabled
                                        />
                                    )}
                                    &nbsp;
                                    {column.fullLabel || column.label} {column?.unit ? ` (${column?.unit})` : ''}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                )}

                {showFilterStatus && (
                    <Box
                        sx={{
                            pl: { xs: 0, md: 2 },
                            width: '100%',
                            mb: { xs: 1, md: 0 },
                            mr: { md: 1 }
                        }}>
                        <Button
                            fullWidth
                            startIcon={<Icon icon={ICON_NAME.STATUS_FILTER} />}
                            variant='outlined'
                            onClick={e => setFilterStatusAnchorEl(e.currentTarget)}
                            sx={{
                                color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[0],
                                border: `1px solid ${themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[0]}`
                            }}>
                            <GStyledSpanBox>
                                <Typography variant={TYPOGRAPHY.BODY2}>{t('status.label') + ': '}</Typography>
                                <ColorizedStatusTextBox status={currentFilterStatus} />
                                {!filterStatusAnchorEl ? <Icon icon={ICON_NAME.CHEVRON_DOWN} /> : <Icon icon={ICON_NAME.CHEVRON_UP} />}
                            </GStyledSpanBox>
                        </Button>
                        <Menu
                            id='status-menu'
                            anchorEl={filterStatusAnchorEl}
                            open={!!filterStatusAnchorEl}
                            onClose={handleFilterStatusClose}
                            PaperProps={{ style: { width: isDesktop ? '25ch' : '90%', maxHeight: 300, overflowY: 'auto' } }}>
                            {STATUS_TYPES?.map(column => (
                                <MenuItem dense sx={{ p: 1 }} key={column.id} onClick={e => handleFilterStatus(e, column.value)} value={column.value}>
                                    <Typography variant={TYPOGRAPHY.BODY2}>{column.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                )}

                {showFilterRole && (
                    <Box
                        sx={{
                            pl: { xs: 0, md: 2 },
                            width: '100%',
                            mb: { xs: 1, md: 0 }
                        }}>
                        <Button
                            fullWidth
                            startIcon={<Icon icon={ICON_NAME.BADGE} />}
                            variant='outlined'
                            onClick={e => setFilterRoleAnchorEl(e.currentTarget)}
                            sx={{
                                color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[0],
                                border: `1px solid ${themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[0]}`
                            }}>
                            <GStyledSpanBox>
                                <Typography variant={TYPOGRAPHY.BODY2}>{t('role.label') + ': '}</Typography>
                                <ColorizedStatusTextBox role={currentFilterRole} />
                                {!filterRoleAnchorEl ? <Icon icon={ICON_NAME.CHEVRON_DOWN} /> : <Icon icon={ICON_NAME.CHEVRON_UP} />}
                            </GStyledSpanBox>
                        </Button>
                        <Menu
                            id='role-menu'
                            anchorEl={filterRoleAnchorEl}
                            open={!!filterRoleAnchorEl}
                            onClose={handleFilterRoleClose}
                            PaperProps={{ style: { width: isDesktop ? '25ch' : '90%', maxHeight: 300, overflowY: 'auto' } }}>
                            {ROLE_TYPES?.map(column => (
                                <MenuItem dense sx={{ p: 1 }} key={column.id} onClick={e => handleFilterRole(e, column.value)} value={column.value}>
                                    <Typography variant={TYPOGRAPHY.BODY2}>{column.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                )}

                {showFilterCategory && (
                    <Box
                        sx={{
                            pl: { xs: 0, md: 2 },
                            width: '100%',
                            mb: { xs: 1, md: 0 }
                        }}>
                        <Button
                            fullWidth
                            startIcon={<Icon icon={ICON_NAME.CATEGORY} />}
                            variant='outlined'
                            onClick={e => setFilterCategoryAnchorEl(e.currentTarget)}
                            sx={{
                                color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[0],
                                border: `1px solid ${themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[0]}`
                            }}>
                            <GStyledSpanBox>
                                <Typography variant={TYPOGRAPHY.BODY2}>{t('category.label') + ': '}</Typography>
                                <Typography variant={isDesktop ? TYPOGRAPHY.OVERLINE1 : TYPOGRAPHY.OVERLINE}>&nbsp;{removeWord(currentFilterCategory, 'machine')}</Typography>
                                {!filterCategoryAnchorEl ? <Icon icon={ICON_NAME.CHEVRON_DOWN} /> : <Icon icon={ICON_NAME.CHEVRON_UP} />}
                            </GStyledSpanBox>
                        </Button>
                        <Menu
                            id='category-menu'
                            anchorEl={filterCategoryAnchorEl}
                            open={!!filterCategoryAnchorEl}
                            onClose={handleFilterCategoryClose}
                            PaperProps={{ style: { width: isDesktop ? '25ch' : '90%', maxHeight: 300, overflowY: 'auto' } }}>
                            {categoryTypes?.map(column => (
                                <MenuItem dense sx={{ p: 1 }} key={column._id} onClick={e => handleFilterCategory(e, normalizer(column.name))} value={column.name}>
                                    <Typography variant={TYPOGRAPHY.BODY2}>{removeWord(column.name, 'machine')}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                )}
            </Box>

            {!noPaginationToolbar && (
                <GStyledTablePaginationCustom
                    labelRowsPerPage={t('row.label') + ':'}
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
                        borderTop: 'none',
                        width: { xs: '100%', md: 'auto' }
                    }}
                />
            )}

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
    data: PropTypes.any,
    count: PropTypes.number,
    dense: PropTypes.bool,
    disabled: PropTypes.bool,
    currentFilterStatus: PropTypes.any,
    showFilterStatus: PropTypes.bool,
    handleFilterStatus: PropTypes.func,
    showFilterRole: PropTypes.bool,
    currentFilterRole: PropTypes.any,
    handleFilterRole: PropTypes.func,
    showFilterCategory: PropTypes.bool,
    currentFilterCategory: PropTypes.any,
    handleFilterCategory: PropTypes.func,
    categoryTypes: PropTypes.array,
    component: PropTypes.elementType,
    onChangeDense: PropTypes.func,
    rowsPerPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    columnFilterButtonData: PropTypes.array,
    columnButtonClickHandler: PropTypes.func,
    noPaginationToolbar: PropTypes.bool
}

export default memo(TablePaginationCustom)
