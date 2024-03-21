import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Tooltip, ListItemText, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useLocale } from 'locale'
import { RoleBasedGuard } from 'auth'
import { Iconify } from 'component/iconify'
import { StyledItem, StyledIcon } from './style'

const NavItem = forwardRef(({ item, depth, open, active, isExternalLink, ...other }, ref) => {
  const { translate } = useLocale()
  const theme = useTheme()
  const { title, path, icon, info, children, disabled, caption, roles } = item

  const subItem = depth !== 1

  const renderContent = (
    <StyledItem ref={ref} open={open} depth={depth} active={active} disabled={disabled} {...other}>
      {icon && <StyledIcon>{icon}</StyledIcon>}

      <ListItemText
        primary={`${translate(title)}`}
        primaryTypographyProps={{
          noWrap: true,
          component: 'span',
          variant: active ? 'h6' : 'h5',
          fontWeight: active && 'bold',
          color: theme.palette.text.primary,
        }}
        sx={{ margin: 0.5 }}
      />

      {info && (
        <Box component="span" sx={{ ml: 1, lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {caption && (
        <Tooltip title={`${translate(caption)}`} arrow>
          <Box component="span" sx={{ ml: 0.5, lineHeight: 0 }}>
            <Iconify icon="eva:info-outline" width={16} />
          </Box>
        </Tooltip>
      )}

      {!!children && <Iconify icon={subItem ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'} width={16} sx={{ ml: 0.5, flexShrink: 0 }} />}
    </StyledItem>
  )

  const renderItem = () => {
    // ExternalLink
    if (isExternalLink)
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      )

    // Default
    return (
      <Link component={RouterLink} to={path} underline="none">
        {renderContent}
      </Link>
    )
  }

  return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>
})

NavItem.propTypes = {
  open: PropTypes.bool,
  active: PropTypes.bool,
  item: PropTypes.object,
  depth: PropTypes.number,
  isExternalLink: PropTypes.bool,
}

export default NavItem
