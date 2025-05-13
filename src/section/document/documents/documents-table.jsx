import { Fragment, useEffect, useReducer, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { useNavigate, useParams } from 'react-router-dom'
import { changePage, changeRowsPerPage, getDocuments, resetDocuments } from 'store/slice/document/document/document'
import { Grid } from '@mui/material'
import { MARGIN } from 'config/layout'
import { DynamicTable } from 'component/table-scaled'
import { FLEX_DIR } from 'constant'
import { tableColumns } from './table-columns'

const DocumentsTable = () => {
    const { machineId } = useParams()
    const { documents, page, rowsPerPage, isLoading } = useSelector(state => state.document)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getDocuments({ machine: machineId, page, pageSize: rowsPerPage }))
        return () => {
            dispatch(resetDocuments())
        }
    }, [dispatch, machineId, page, rowsPerPage])

    const onChangePage = async (e, newPage) => {
        await dispatch(changePage(newPage))
    }

    const onChangeRows = async e => {
        await dispatch(changePage(0))
        await dispatch(changeRowsPerPage(parseInt(e.target.value, 10)))
    }

    return (
        <Fragment>
            <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
                <Grid item xs={12} sm={12}>
                    <Grid container mb={2}>
                        <DynamicTable
                            columnsData={tableColumns}
                            data={documents?.data || []}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            totalCount={documents?.totalCount || 0}
                            isLoading={isLoading}
                            onChangePage={onChangePage}
                            onChangeRow={onChangeRows}
                        // onViewRow={}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}

DocumentsTable.propTypes = {
    isDrawingsPage: PropTypes.bool,
}

export default DocumentsTable
