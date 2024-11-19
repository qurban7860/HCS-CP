import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { Box } from '@mui/material'
import { GridViewTitle } from 'component'
import { GStyledTransparentCard, GStyledChowBox, GStyledTopBorderDivider } from 'theme/style'

/**
 *  This is a box component that wraps children with a title
 * @param {string} title - The title of the box
 * @returns  A box with a title and children
 */
const ChowBox = ({ title, children }) => {
 const { themeMode } = useSettingContext()
 return (
  <Box mb={4}>
   <GStyledTransparentCard>
    <GStyledTopBorderDivider mode={themeMode} />
    <GStyledChowBox>
     <GridViewTitle title={title} />
    </GStyledChowBox>
   </GStyledTransparentCard>
   {children}
  </Box>
 )
}

ChowBox.propTypes = {
 title: PropTypes.string,
 children: PropTypes.node
}
export default ChowBox
