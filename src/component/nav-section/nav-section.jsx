import { memo } from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'
import { hideScrollbarY } from 'theme/style'
import NavList from './nav-list'
import { FLEX_DIR, KEY } from 'constant'

NavSection.propTypes = {
  sx: PropTypes.object,
  data: PropTypes.array
}

function NavSection({ data, sx, ...other }) {
  return (
    <Stack
      direction={FLEX_DIR.ROW}
      spacing={2}
      sx={{
        mx: KEY.AUTO,
        ...hideScrollbarY,
        ...sx
      }}
      {...other}>
      {data.map((group) => (
        <Items key={group.subheader} items={group.items} />
      ))}
    </Stack>
  )
}

export default memo(NavSection)

Items.propTypes = {
  items: PropTypes.array
}

function Items({ items }) {
  return (
    <>
      {items.map((list) => (
        <NavList key={list.title + list.path} data={list} depth={1} hasChild={!!list.children} />
      ))}
    </>
  )
}
