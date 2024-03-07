import React from 'react'
import PropTypes from 'prop-types'
import { ListItemText, ListItemIcon, ListItemButton } from '@mui/material'
import { Iconify } from 'component/iconify'

ListItem.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  content: PropTypes.string,
}

function ListItem({ onClick, icon, content }) {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemIcon>
        <Iconify icon={icon} />
      </ListItemIcon>
      <ListItemText primary={content} />
    </ListItemButton>
  )
}

export default ListItem
