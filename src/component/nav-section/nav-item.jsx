import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { Icon, ICON_NAME } from 'hook'
import { Box, Tooltip, ListItemText, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useLocale } from 'locale'
import { RoleBasedGuard } from 'auth'
import { Iconify } from 'component/iconify'
import { StyledItem, StyledIcon } from './style'
import { KEY, TYPOGRAPHY } from 'constant'

const NavItem = forwardRef(({ item, depth, open, active, isExternalLink, ...other }, ref) => {
  const { translate } = useLocale()
  const { title, path, icon, info, children, disabled, caption, roles } = item
  const theme = useTheme()

  const subItem = depth !== 1

  const renderContent = (
    <StyledItem ref={ref} open={open} depth={depth} active={active} disabled={disabled} {...other}>
      {icon && (
        <StyledIcon>
          <Icon icon={icon}></Icon>
        </StyledIcon>
      )}

      <ListItemText
        primary={`${translate(title)}`}
        disabled={disabled}
        primaryTypographyProps={{
          noWrap: true,
          component: 'span',
          variant: TYPOGRAPHY.BODY1,
          fontWeight: active && KEY.BOLD,
          color: theme.palette.text.primary
        }}
      />

      {info && (
        <Box component="span" sx={{ ml: 1, lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {caption && (
        <Tooltip title={`${translate(caption)}`} arrow>
          <Box component="span" sx={{ ml: 0.5, lineHeight: 0 }}>
            <Icon icon={ICON_NAME.INFO} width={16} />
          </Box>
        </Tooltip>
      )}

      {!!children && <Iconify icon={subItem ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'} width={16} sx={{ ml: 0.5, flexShrink: 0 }} />}
    </StyledItem>
  )

  const renderItem = () => {
    if (isExternalLink)
      return (
        <Link href={path} target="_blank" rel="noopener" underline={KEY.NONE}>
          {renderContent}
        </Link>
      )

    return (
      <Link
        component={RouterLink}
        to={!disabled && path}
        underline={KEY.NONE}
        sx={{
          cursor: disabled && 'not-allowed'
        }}>
        {renderContent}
      </Link>
    )
  }

  return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>
})

NavItem.propTypes = {
  open: PropTypes.bool,
  active: PropTypes.any,
  item: PropTypes.object,
  depth: PropTypes.number,
  isExternalLink: PropTypes.bool
}

export default NavItem
