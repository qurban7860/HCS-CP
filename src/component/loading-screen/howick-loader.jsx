import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { useTheme } from '@mui/material/styles'
import { GStyledCenterBox } from 'theme/style'
import { StyledAnimatedPath } from './style'
import { KEY } from 'constant'

const HowickLoader = ({ height = '465', width = '467', mode, strokeColor }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 return (
  <GStyledCenterBox>
   <svg version='1.2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 465 467' width={width} height={height}>
    <StyledAnimatedPath
     mode={mode}
     strokeColor={strokeColor}
     fillRule='evenodd'
     d='m190.2 223.7h-162l218.8 218.8v-162zm249.9-101.9l-158.6 158.6v162l159.6-159.6zm-252.4-92.4l-159.7 159.7h162l158.7-158.7z'
    />
   </svg>
  </GStyledCenterBox>
 )
}

HowickLoader.propTypes = {
 height: PropTypes.number,
 width: PropTypes.number,
 mode: PropTypes.string,
 strokeColor: PropTypes.string
}

export default HowickLoader
