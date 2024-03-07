import React from 'react'
import { Card } from '@mui/material'
import PropTypes from 'prop-types'

TableCard.propTypes = {
  children: PropTypes.node.isRequired, // Validate the children prop
}

const TableCard = ({ children }) => <Card sx={{ my: 3 }}>{children}</Card>

export default TableCard
