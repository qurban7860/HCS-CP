import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { Typography } from '@mui/material'
import { GStyledSpanBox } from 'theme/style'
import { KEY } from 'constant'

const TableTitleBox = ({ user, title }) => {
 const { themeMode } = useSettingContext()
 return (
  <GStyledSpanBox>
   <Typography variant='h3' color={themeMode === KEY.LIGHT ? 'common.black' : 'howick.bronze'}>
    {title?.toUpperCase()}
   </Typography>
  </GStyledSpanBox>
 )
}

TableTitleBox.propTypes = {
 user: PropTypes.object,
 title: PropTypes.string
}

export default TableTitleBox
