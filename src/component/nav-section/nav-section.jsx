import { memo } from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'
import { hideScrollbarY } from 'theme/style'
import NavList from './nav-list'

NavSection.propTypes = {
  sx: PropTypes.object,
  data: PropTypes.array,
}

const _mockData = [
  {
    subheader: 'Subheader 1',
    items: [
      { title: 'Customer', path: '/customer', children: null },
      { title: 'Machine', path: '/machine', children: null },
    ],
  },
  {
    subheader: 'Subheader 2',
    items: [
      { title: 'Document', path: '/document', children: null },
      { title: 'Support', path: '/support', children: null },
    ],
  },
]

function NavSection({ data = _mockData, sx, ...other }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        mx: 'auto',
        ...hideScrollbarY,
        ...sx,
      }}
      {...other}
    >
      {data.map((group) => (
        <Items key={group.subheader} items={group.items} />
      ))}
    </Stack>
  )
}

export default memo(NavSection)

Items.propTypes = {
  items: PropTypes.array,
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
