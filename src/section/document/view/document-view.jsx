import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { useParams } from 'react-router-dom'
import { getDocument, resetDocument } from 'store/slice/document/document'

import DocumentViewForm from './document-view-form'

export default function DocumentViewLayout() {
  const { document } = useSelector(state => state.document)
  const { id, machineId } = useParams();

  useEffect(() => {
    dispatch(getDocument({ id, machine: machineId }))
    return () => {
      dispatch(resetDocument())
    }
  }, [dispatch, id])

  return (
    <Fragment>
      <DocumentViewForm document={document} />
    </Fragment>
  )
}

