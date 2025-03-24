import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { useMediaQuery, useTheme, Box, Stack, Typography } from '@mui/material'
import { GStyledSpanBox } from 'theme/style'
import { truncate } from 'util/truncate'
import { TYPOGRAPHY, KEY } from 'constant'

const CommentListItem = ({ truncatedName, secondary, icon, date, format }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

 return (
  <Stack>
   <Box>
    <GStyledSpanBox>
     <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'common.white'} variant={TYPOGRAPHY.SUBTITLE2} sx={{ mr: .5 }}>
      {truncate(truncatedName, 50)}
     </Typography>
      {icon && icon}
     <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem', ml: 1 }} title={format}>
      {date}
     </Typography>
    </GStyledSpanBox>
   </Box>
   <Box sx={{ flexWrap: 'wrap', overflowY: 'hidden', overflowX: 'auto', paddingY: 1 }}>
    {secondary}
   </Box>
  </Stack>
 )
}

CommentListItem.propTypes = {
 truncatedName: PropTypes.string.isRequired,
 secondary    : PropTypes.node,
 icon         : PropTypes.node,
 format       : PropTypes.string,
 date         : PropTypes.string
}

export default CommentListItem
