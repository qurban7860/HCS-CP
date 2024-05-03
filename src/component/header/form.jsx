import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { useSettingContext } from 'component/setting'
import { KEY, LABEL, VARIANT } from 'constant'
import { StyledHeaderBox } from './style'

const { TYPOGRAPHY } = VARIANT

const FormHeader = ({ label, textSize }) => {
  const { themeMode } = useSettingContext()
  return (
    <StyledHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2}>
      <Typography variant={textSize} color="common.white" gutterBottom>
        {label}
      </Typography>
    </StyledHeaderBox>
  )
}

FormHeader.propTypes = {
  label: PropTypes.string,
  textSize: PropTypes.oneOf(Object.values(TYPOGRAPHY))
}
FormHeader.defaultProps = {
  label: LABEL.HEADER,
  textSize: TYPOGRAPHY.H6
}

export default FormHeader
