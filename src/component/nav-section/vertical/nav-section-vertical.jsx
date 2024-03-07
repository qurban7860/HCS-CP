import PropTypes from 'prop-types'
import { List, Stack } from '@mui/material'
import { useLocale } from 'locale'
import { StyledSubheader } from './style'
import NavList from './nav-list'

NavSectionVertical.propTypes = {
  sx: PropTypes.object,
  data: PropTypes.array,
}

function NavSectionVertical({ data, sx, ...other }) {
  const { translate } = useLocale()

  return (
    <Stack sx={sx} {...other}>
      {data.map((group) => {
        const key = group.subheader || group.items[0].title

        return (
          <List key={key} disablePadding sx={{ px: 2 }}>
            {group.subheader && (
              <StyledSubheader disableSticky>{`${translate(group.subheader)}`}</StyledSubheader>
            )}

            {group.items.map((list) => (
              <NavList
                key={list.title + list.path}
                data={list}
                depth={1}
                hasChild={!!list.children}
                sx={{}}
              />
            ))}
          </List>
        )
      })}
    </Stack>
  )
}

export default NavSectionVertical
