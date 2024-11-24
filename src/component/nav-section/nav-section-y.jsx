import { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'
import { hideScrollbarY, hideScrollbarX } from 'theme/style'
import NavList from './nav-list'
import { FLEX_DIR, KEY } from 'constant'

NavSectionY.propTypes = {
 sx: PropTypes.object,
 data: PropTypes.array,
 handleCloseNavItem: PropTypes.func
}

function NavSectionY({ data, sx, handleCloseNavItem, ...other }) {
 return (
  <Stack
   spacing={2}
   sx={{
    ...hideScrollbarY,
    ...sx
   }}
   {...other}>
   {data.map(group => (
    <Items key={group.subheader} items={group.items} handleCloseNavItem={handleCloseNavItem} />
   ))}
  </Stack>
 )
}

export default memo(NavSectionY)

Items.propTypes = {
 items: PropTypes.array,
 handleCloseNavItem: PropTypes.func
}

function Items({ items, handleCloseNavItem }) {
 return (
  <Fragment>
   {items.map(list => (
    <NavList key={list.title + list.path} data={list} depth={1} hasChild={!!list.children} handleCloseNavItem={handleCloseNavItem} />
   ))}
  </Fragment>
 )
}
