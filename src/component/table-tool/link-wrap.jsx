import PropTypes from 'prop-types'
import { ICON_NAME, useLimitString, useSettingContext } from 'hook'
import { useMediaQuery, Link, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledSpanBox } from 'theme/style'
import { IconTooltip } from 'component'
import { KEY, LABEL, TYPOGRAPHY } from 'constant'

function LinkWrap({ align, onClick, param, stringLength, tooltipTitle, openInNewTab, icon }) {
 const theme = useTheme()
 const { themeMode } = useSettingContext()
 const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

 return (
  <GStyledSpanBox gap={1}>
   <Link onClick={onClick} sx={{ color: themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.common.white }}>
    <Typography variant={isMobile ? TYPOGRAPHY.BODY2 : TYPOGRAPHY.H6}>{useLimitString(param, stringLength || 30)}</Typography>
   </Link>
   {openInNewTab && (
    <IconTooltip
     onClick={openInNewTab}
     title={tooltipTitle || LABEL.VIEW_IN_NEW_TAB}
     icon={icon || ICON_NAME.OPEN_IN_NEW}
     placement={KEY.RIGHT}
     color={theme.palette.grey[500]}
     dimension={15}
     px={0}
     iconOnly
    />
   )}
  </GStyledSpanBox>
 )
}

LinkWrap.propTypes = {
 align: PropTypes.string,
 onClick: PropTypes.func,
 param: PropTypes.string,
 stringLength: PropTypes.number,
 isDefault: PropTypes.bool,
 tooltipTitle: PropTypes.string,
 openInNewTab: PropTypes.func,
 icon: PropTypes.string
}

export default LinkWrap
