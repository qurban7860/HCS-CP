import PropTypes from 'prop-types'
import { Icon, useSettingContext } from 'hook'
import { Typography } from '@mui/material'
import { GStyledSpanBox } from 'theme/style'
import { KEY, LABEL, VARIANT } from 'constant'
import { StyledHeaderBox } from './style'

const { TYPOGRAPHY } = VARIANT

const FormHeader = ({ label = LABEL.HEADER, textSize = TYPOGRAPHY.H6, icon, nodeLabel }) => {
 const { themeMode } = useSettingContext()

 return (
  <StyledHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2}>
   {icon ? (
    <GStyledSpanBox>
     <Icon
      icon={icon}
      color='common.white'
      sx={{
       alignItems: 'center',
       alignContent: 'center'
      }}
     />
     &nbsp; &nbsp;
     <Typography variant={TYPOGRAPHY.OVERLINE2} color='common.white' gutterBottom>
      {label}
     </Typography>
    </GStyledSpanBox>
   ) : nodeLabel ? (
    label
   ) : (
    <Typography variant={textSize} color='common.white' gutterBottom>
     {label}
    </Typography>
   )}
  </StyledHeaderBox>
 )
}

FormHeader.propTypes = {
 label: PropTypes.any,
 textSize: PropTypes.oneOf(Object.values(TYPOGRAPHY)),
 icon: PropTypes.string,
 nodeLabel: PropTypes.node
}

export default FormHeader
