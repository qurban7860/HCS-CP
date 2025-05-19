import { Fragment } from 'react'
import PropTypes from 'prop-types'
import DocumentViewForm from './document-view-form'

export default function DocumentViewLayout({ isDrawingPage }) {

  return (
    <Fragment>
      <DocumentViewForm isDrawingPage={isDrawingPage} />
    </Fragment>
  )
}

DocumentViewLayout.prototype = {
  isDrawingPage: PropTypes.bool
}
