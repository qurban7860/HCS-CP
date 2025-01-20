import { Fragment, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { Icon, ICON_NAME, useSettingContext, useResponsive } from 'hook'
import { Box, ListItemText, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useLocale } from 'locale'
import { GStyledTooltip } from 'theme/style'
import { StyledItem, StyledIcon } from './style'
import { KEY, TYPOGRAPHY } from 'constant'

const NavItem = forwardRef(({ item, depth, open, active, isExternalLink, onListItemClick, ...other }, ref) => {
 const { t } = useLocale()
 const { title, path, icon, info, children, disabled, caption } = item
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isMobile = useResponsive('down', 'sm')

 const subItem = depth !== 1

 const renderContent = (
  <StyledItem ref={ref} open={open} depth={depth} active={active} disabled={disabled} {...other}>
   {icon && (
    <GStyledTooltip title={`${t(caption)}`} arrow tooltipcolor={theme.palette.primary.main} color={theme.palette.primary.main}>
     <StyledIcon>
      <Icon
       icon={icon}
       sx={{
        color: active ? (themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black) : themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.common.white,
        '&:hover': {
         color: theme.palette.primary.main
        }
       }}
      />
     </StyledIcon>
    </GStyledTooltip>
   )}

   <ListItemText
    primary={`${t(title)}`}
    disabled={disabled}
    onClick={onListItemClick}
    primaryTypographyProps={{
     noWrap: true,
     component: 'span',
     variant: TYPOGRAPHY.OVERLINE1,
     fontWeight: active && KEY.BOLD,
     color: theme.palette.text.primary
    }}
   />

   {info && (
    <Box component='span' sx={{ ml: 1, lineHeight: 0 }}>
     {info}
    </Box>
   )}

   {/* {caption && (
    <GStyledTooltip title={`${t(caption)}`} arrow tooltipcolor={theme.palette.primary.main} color={theme.palette.primary.main}>
     <Box component='span' sx={{ ml: 0.5, lineHeight: 0 }}>
      <Icon icon={ICON_NAME.INFO} width={16} />
     </Box>
    </GStyledTooltip>
   )} */}

   {!!children && <Icon icon={subItem ? ICON_NAME.CHEVRON_RIGHT : ICON_NAME.CHEVRON_DOWN } width={16} sx={{ ml: 0.5, flexShrink: 0 }} />}
  </StyledItem>
 )

 const renderItem = () => {
  if (isExternalLink)
   return (
    <Link href={path} target='_blank' rel='noopener' underline={'always'}>
     {renderContent}
    </Link>
   )

  return (
   <Link
    component={RouterLink}
    to={!disabled && path}
    underline={'always'}
    sx={{
     cursor: disabled && 'not-allowed',
     transition: 'ease-in-out width .2s',
     textAlign: isMobile ? 'right' : 'center',
     backgroundColor: themeMode === KEY.LIGHT ? (active ? 'howick.midBlue' : 'transparent') : active && 'howick.orange'
    }}>
    {renderContent}
   </Link>
  )
 }

 return <Fragment> {renderItem()} </Fragment>
})

NavItem.displayName = 'NavItem'
NavItem.propTypes = {
 open: PropTypes.bool,
 active: PropTypes.any,
 item: PropTypes.object,
 depth: PropTypes.number,
 isExternalLink: PropTypes.bool,
 onListItemClick: PropTypes.func
}

export default NavItem
