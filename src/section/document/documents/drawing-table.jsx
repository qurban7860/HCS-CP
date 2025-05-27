import { Fragment, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { useNavigate, useParams } from 'react-router-dom'
import { changeDrawingPage, changeDrawingRowsPerPage, getDrawings, resetDrawings } from 'store/slice/document/document/document'
import { Grid } from '@mui/material'
import { MARGIN } from 'config/layout'
import { DynamicTable } from 'component/table-scaled'
import { FLEX_DIR } from 'constant'
import { drawingTableColumns } from './table-columns'
import { PATH_MACHINE } from 'route/path'


const DrawingTable = () => {
    const { machineId } = useParams()
    const { drawings, page, rowsPerPage, isLoading } = useSelector(state => state.document)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getDrawings({ machine: machineId, page, pageSize: rowsPerPage }))
        return () => {
            dispatch(resetDrawings())
        }
    }, [dispatch, machineId, page, rowsPerPage])

    const onChangePage = async (e, newPage) => {
        await dispatch(changeDrawingPage(newPage))
    }

    const onChangeRows = async e => {
        await dispatch(changeDrawingPage(0))
        await dispatch(changeDrawingRowsPerPage(parseInt(e.target.value, 10)))
    }

    return (
        <Fragment>
            <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
                <Grid item xs={12} sm={12}>
                    <Grid container mb={2}>
                        <DynamicTable
                            columnsData={drawingTableColumns}
                            data={drawings?.data || []}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            totalCount={drawings?.totalCount || 0}
                            isLoading={isLoading}
                            onChangePage={onChangePage}
                            onChangeRow={onChangeRows}
                            onViewRow={(row) => navigate(PATH_MACHINE.machines.drawings.view(machineId, row?._id))}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default DrawingTable
