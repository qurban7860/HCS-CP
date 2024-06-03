import PropTypes from 'prop-types'
import { useIcon, useSettingContext } from 'hook'
import { Typography } from '@mui/material'
import { GStyledSpanBox } from 'theme/style'
import { KEY, LABEL, VARIANT } from 'constant'
import { StyledHeaderBox } from './style'

const { TYPOGRAPHY } = VARIANT

const FormHeader = ({ label, textSize = 'overline2', icon }) => {
  const { themeMode } = useSettingContext()

  const { Icon: LocIcon, iconSrc: framaSrc } = useIcon(icon)

  return (
    <StyledHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2}>
      {icon ? (
        <GStyledSpanBox>
          <LocIcon
            icon={framaSrc}
            color="common.white"
            sx={{
              alignItems: 'center',
              alignContent: 'center'
            }}
          />
          &nbsp; &nbsp;
          <Typography variant="overline2" color="common.white" gutterBottom>
            {label}
          </Typography>
        </GStyledSpanBox>
      ) : (
        <Typography variant={textSize} color="common.white" gutterBottom>
          {label}
        </Typography>
      )}
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
