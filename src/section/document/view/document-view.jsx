import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'store'
import DocumentViewForm from './document-view-form'

export default function DocumentViewLayout({ isDrawingPage }) {

  const { document } = useSelector(state => state.document)

  return (
    <Fragment>
      <DocumentViewForm isDrawingPage={isDrawingPage} />
    </Fragment>
  )
}

DocumentViewLayout.prototype = {
  isDrawingPage: PropTypes.bool
}
