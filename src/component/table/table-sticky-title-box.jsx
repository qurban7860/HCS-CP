import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { Typography } from '@mui/material'
import { GStyledSpanBox, GStyledStickyBox } from 'theme/style'
import { KEY, TYPOGRAPHY } from 'constant'

const TableStickyTitleBox = ({ user, title }) => {
 const { themeMode } = useSettingContext()
 return (
  <GStyledStickyBox>
    <GStyledSpanBox>
    <Typography variant={TYPOGRAPHY.H3} color={themeMode === KEY.LIGHT ? 'common.black' : 'howick.bronze'}>
        {title?.toUpperCase()}
    </Typography>
    </GStyledSpanBox>
  </GStyledStickyBox>
 )
}

TableStickyTitleBox.propTypes = {
 user: PropTypes.object,
 title: PropTypes.string
}

export default TableStickyTitleBox
