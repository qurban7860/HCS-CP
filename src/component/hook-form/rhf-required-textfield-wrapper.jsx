import PropTypes from 'prop-types'
import { Icon, ICON_NAME } from 'hook'
import { t } from 'i18next'
import { useTheme, alpha, Box } from '@mui/material'

const RHFRequiredTextFieldWrapper = ({ condition, children }) => {
 const theme = useTheme()
 return (
  <Box sx={{ position: 'relative' }}>
   {children}
   <Box
    sx={{
     position: 'absolute',
     top: 0,
     right: 0,
     color: condition ? alpha(theme.palette.error.main, 0.5) : 'common.white',
     padding: '0.5em 0.5em',
     borderTop: condition ? '.2em solid red' : `.2em solid ${theme.palette.burnIn.altDark}`,
     borderRight: condition ? '.2em solid red' : `.2em solid ${theme.palette.burnIn.altDark}`,
     borderRadius: '0.2em'
    }}>
    {condition ? t('required.label') : <Icon icon={ICON_NAME.CHECK_CIRCLE} color={theme.palette.burnIn.altDark} />}
   </Box>
  </Box>
 )
}

RHFRequiredTextFieldWrapper.propTypes = {
 condition: PropTypes.any,
 children: PropTypes.node
}

export default RHFRequiredTextFieldWrapper
