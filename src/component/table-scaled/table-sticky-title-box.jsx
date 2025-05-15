import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { Typography } from '@mui/material'
import { GStyledSpanBox, GStyledStickyBox } from 'theme/style'
import { KEY, TYPOGRAPHY } from 'constant'
import { Icon } from 'hook'

const TableStickyTitleBox = ({ subTitle, headingTitle, icon }) => {
  const { themeMode } = useSettingContext()
  return (
    <GStyledStickyBox sx={{ backgroundColor: 'background.default', mb: 2 }} >
      <GStyledSpanBox>
        {icon && <Icon icon={icon} />}
        <Typography variant={TYPOGRAPHY.H3} color={themeMode === KEY.LIGHT ? 'common.black' : 'howick.bronze'} sx={{ ml: icon ? 1 : 0 }}>
          {headingTitle?.toUpperCase()}
        </Typography>
      </GStyledSpanBox>
      {subTitle && <Typography variant={TYPOGRAPHY.BODY1} color={'grey.500'}>{subTitle}</Typography>}
    </GStyledStickyBox>
  )
}

TableStickyTitleBox.propTypes = {
  subTitle: PropTypes.string,
  headingTitle: PropTypes.string,
  icon: PropTypes.string
}

export default TableStickyTitleBox
