import React from 'react'
import PropTypes from 'prop-types'
import { ListSubheader } from '@mui/material'

ListItemHeader.propTypes = {
  header: PropTypes.string,
}

function ListItemHeader({ header }) {
  return (
    <ListSubheader component="div" id="nested-list-subheader">
      {header}
    </ListSubheader>
  )
}

export default ListItemHeader
