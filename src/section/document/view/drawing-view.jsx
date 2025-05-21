import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { useParams } from 'react-router-dom'
import { getDrawing, resetDrawing } from 'store/slice/document/document'

import DocumentViewForm from './document-view-form'

export default function DrawingViewLayout() {

  const { drawing } = useSelector(state => state.document)
  const { id, machineId } = useParams();
  console.log({ drawing })
  useEffect(() => {
    dispatch(getDrawing({ id, machine: machineId }))
    return () => {
      dispatch(resetDrawing())
    }
  }, [dispatch, id])

  return (
    <Fragment>
      <DocumentViewForm isDrawingPage document={drawing} />
    </Fragment>
  )
}
