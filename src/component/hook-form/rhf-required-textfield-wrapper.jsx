import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Icon, ICON_NAME } from 'hook'
import { useTheme, alpha, Box, Typography } from '@mui/material'
import { TYPOGRAPHY } from 'constant'

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
     //  color: 'common.white',
     //  backgroundColor: condition ? theme.palette.error.main : theme.palette.burnIn.altDark,
     borderRadius: '0.2em'
    }}>
    {condition ? <Typography variant={TYPOGRAPHY.OVERLINE0}>{t('required.label')}</Typography> : ''}
   </Box>
  </Box>
 )
}

RHFRequiredTextFieldWrapper.propTypes = {
 condition: PropTypes.any,
 children: PropTypes.node
}

export default RHFRequiredTextFieldWrapper
