import { Fragment, useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { useTable, getComparator, useSettingContext } from 'hook'
import { ChangeLogPage, ChangeLogRowsPerPage } from 'store/slice/log/log'
import { Grid, Table, TableContainer } from '@mui/material'
import { TableNoData, SkeletonTable } from 'component'
import { LogsHeader, LogsRow, LogsPagination, tableColumnsReducer } from '.'
import { GStyledTableHeaderBox, GStyledStickyDiv } from 'theme/style'
import { getLogTypeConfigForGenerationAndType } from 'config/log-types'
import { MARGIN, NAV } from 'config/layout'
import { FLEX_DIR, KEY } from 'constant'
import { applySort } from 'util'

const LogsTable = ({ logType, isLogsPage, unitType }) => {
    const [tableData, setTableData] = useState([])
    const { logs, logPage, logsTotalCount, isLoading, logRowsPerPage } = useSelector(state => state.log)
    const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, getLogTypeConfigForGenerationAndType(5, 'ERP').tableColumns)
    const { themeMode } = useSettingContext()

    useEffect(() => {
        setTableData(logs?.data || [])
    }, [logs])

    useEffect(() => {
        const newColumns = logType?.tableColumns
        if (newColumns) {
            dispatchTableColumns({
                type: 'handleLogTypeChange',
                newColumns,
                logsPage: isLogsPage
            })
        }
    }, [logType])

    const { order, orderBy, selected, onSort } = useTable({
        defaultOrderBy: KEY.CREATED_AT,
        defaultOrder: KEY.DESC
    })

    const dataFiltered = applySort({
        inputData: tableData,
        comparator: getComparator(order, orderBy)
    })

    const handleChangePage = async (event, newPage) => {
        await dispatch(ChangeLogPage(newPage))
    }

    const handleChangeRowsPerPage = async event => {
        await dispatch(ChangeLogPage(0))
        await dispatch(ChangeLogRowsPerPage(parseInt(event.target.value, 10)))
    }

    const handleColumnButtonClick = (columnId, newCheckState) => {
        dispatchTableColumns({ type: 'updateColumnCheck', columnId, newCheckState })
    }

    const isNotFound = !isLoading && !dataFiltered.length

    return (
        <Fragment>
            <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
                <Grid item xs={12} sm={12}>
                    <Grid container mb={2}>
                        <Grid item xs={12} sm={12} mb={2} bgcolor='background.paper'>
                            <GStyledStickyDiv top={isLogsPage ? NAV.T_STICKY_LOG_TABLE_HEADER : NAV.T_STICKY_LOG_MACH_TABLE_HEADER} zIndex={9}>
                                <GStyledTableHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2} />
                                <LogsPagination
                                    count={logsTotalCount || 0}
                                    data={logsTotalCount}
                                    page={logPage}
                                    rowsPerPage={logRowsPerPage}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    columnFilterButtonData={tableColumns}
                                    handleColumnButtonClick={handleColumnButtonClick}
                                    unitType={unitType}
                                />
                            </GStyledStickyDiv>
                            <TableContainer sx={{ height: 'calc(100vh - 470px)', overflow: 'auto' }}>
                                <Table>
                                    <LogsHeader columns={tableColumns} dataFiltered={dataFiltered} orderBy={orderBy} order={order} onSort={onSort} unitType={unitType} />
                                    {(isLoading ? [...Array(logRowsPerPage)] : dataFiltered).map((row, index) =>
                                        row ? (
                                            <LogsRow
                                                key={row._id}
                                                row={row}
                                                columns={tableColumns}
                                                // onViewRow={() => handleViewRow(row._id, row)}
                                                mode={themeMode}
                                                index={index}
                                                dataFiltered={dataFiltered}
                                                onSort={onSort}
                                                order={order}
                                                orderBy={orderBy}
                                                selected={selected.includes(row._id)}
                                                unit={unitType}
                                            />
                                        ) : (
                                            !isNotFound && <SkeletonTable key={index} sx={{ height: 60 }} />
                                        )
                                    )}
                                    <TableNoData logNotFound={isNotFound} />
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}

LogsTable.propTypes = {
    logType: PropTypes.object,
    dataForApi: PropTypes.object,
    isLogsPage: PropTypes.bool,
    unitType: PropTypes.string
}

export default LogsTable
