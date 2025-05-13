import { useEffect, useMemo, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { useTable, getComparator, useSettingContext } from 'hook'
import { Grid, Table, TableContainer } from '@mui/material'
import { SkeletonTable } from 'component'
import { TableHeader, TableRow, TableNoData, TablePaginationCustom, tableColumnsReducer } from './index'
import { GStyledTableHeaderBox, GStyledStickyDiv } from 'theme/style'
import { MARGIN, NAV } from 'config/layout'
import { FLEX_DIR, KEY } from 'constant'
import { applySort } from 'util'

const DynamicTable = ({
    columnsData,
    data,
    page,
    rowsPerPage,
    totalCount,
    isLoading,
    onChangePage,
    onChangeRow,
    onViewRow,
    dense,
    component,
    onChangeDense,
    disabledColumn,
    rowsPerPageOptions,
    hover = true,
    onColumnClick,
    noPaginationBar,
    nodeBeforeColum,
    nodeAfterColum,
    nodeBeforePagination,
    nodeAfterPagination
}) => {
    const [tableData, setTableData] = useState([])
    const memoizedColumnsData = useMemo(() => columnsData, [columnsData]);
    const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, memoizedColumnsData)
    const { themeMode } = useSettingContext()

    useEffect(() => {
        dispatchTableColumns({ type: 'setUpInitialColumns' });
        setTableData(data || [])
    }, [data])

    const { order, orderBy, selected, onSort } = useTable({
        defaultOrderBy: KEY.CREATED_AT,
        defaultOrder: KEY.DESC
    })

    const dataFiltered = applySort({
        inputData: tableData,
        comparator: getComparator(order, orderBy)
    })

    const handleChangeColumn = (columnId, newCheckState) => {
        dispatchTableColumns({ type: 'updateColumnCheck', columnId, newCheckState })
    }

    const isNotFound = !isLoading && !dataFiltered.length

    return (
        <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
            <Grid item xs={12} sm={12}>
                <Grid container mb={2}>
                    <Grid item xs={12} sm={12} mb={2} bgcolor='background.paper'>
                        {/* <GStyledStickyDiv top={NAV.T_STICKY_DOCUMENT_TABLE_HEADER} zIndex={9}> */}
                        <GStyledTableHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={1} />
                        <TablePaginationCustom
                            count={totalCount || 0}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onChangePage={onChangePage}
                            onChangeRow={onChangeRow}
                            tableColumns={tableColumns}
                            onChangeColumn={handleChangeColumn}
                            dense={dense}
                            onChangeDense={onChangeDense}
                            disabledColumn={disabledColumn}
                            rowsPerPageOptions={rowsPerPageOptions}
                            onColumnClick={onColumnClick}
                            component={component}
                            noPaginationBar={noPaginationBar}
                            nodeBeforeColum={nodeBeforeColum}
                            nodeAfterColum={nodeAfterColum}
                            nodeBeforePagination={nodeBeforePagination}
                            nodeAfterPagination={nodeAfterPagination}
                        />
                        {/* </GStyledStickyDiv> */}
                        <TableContainer sx={{ height: NAV.H_LOG_TABLE, overflow: 'auto' }}>
                            <Table>
                                <TableHeader columns={tableColumns} dataFiltered={dataFiltered} orderBy={orderBy} order={order} onSort={onSort} />
                                {(isLoading ? [...Array(rowsPerPage)] : dataFiltered).map((row, index) =>
                                    row ? (
                                        <TableRow
                                            key={row._id}
                                            row={row}
                                            hover={hover}
                                            columns={tableColumns}
                                            onViewRow={onViewRow}
                                            mode={themeMode}
                                            index={index}
                                            dataFiltered={dataFiltered}
                                            selected={selected.includes(row._id)}
                                        />
                                    ) : (
                                        !isNotFound && <SkeletonTable key={index} sx={{ height: 60 }} />
                                    )
                                )}
                                <TableNoData isNotFound={isNotFound} />
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

DynamicTable.propTypes = {
    data: PropTypes.array,
    columnsData: PropTypes.array,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    page: PropTypes.number,
    totalCount: PropTypes.number,
    rowsPerPage: PropTypes.number,
    onViewRow: PropTypes.func,
    onChangeRow: PropTypes.func,
    onChangePage: PropTypes.func,
    onChangeDense: PropTypes.func,
    onColumnClick: PropTypes.func,
    dense: PropTypes.bool,
    hover: PropTypes.bool,
    isLoading: PropTypes.bool,
    disabledColumn: PropTypes.bool,
    component: PropTypes.node,
    nodeAfterColum: PropTypes.node,
    noPaginationBar: PropTypes.node,
    nodeBeforeColum: PropTypes.node,
    nodeAfterPagination: PropTypes.node,
    nodeBeforePagination: PropTypes.node,
}

export default DynamicTable
