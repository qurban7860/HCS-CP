import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { TableCell, Link } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { GStyledSpanBox } from 'theme/style'
import { IconTooltip } from 'component'
import { ICON_NAME, Icon, useLimitString } from 'hook'
import { KEY, LABEL } from 'constant'

function LinkTableCell({ align, onClick, param, stringLength, tooltipTitle, openInNewTab, icon }) {
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 return (
  <TableCell
   className='ellipsis-cell'
   align={align}
   color='inherit'
   sx={{
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '400px',
    '&:hover': {
     color: () => alpha(theme.palette.grey[500], 0.98)
    }
   }}>
   <GStyledSpanBox gap={1}>
    <Link onClick={onClick} sx={{ color: themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange }}>
     {useLimitString(param, stringLength || 30)}
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
  </TableCell>
 )
}

LinkTableCell.propTypes = {
 align: PropTypes.string,
 onClick: PropTypes.func,
 param: PropTypes.string,
 stringLength: PropTypes.number,
 isDefault: PropTypes.bool,
 tooltipTitle: PropTypes.string,
 openInNewTab: PropTypes.func,
 icon: PropTypes.string
}

export default LinkTableCell
