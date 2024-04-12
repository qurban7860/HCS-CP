import PropTypes from 'prop-types'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import useLocale from './use-locale'

ThemeLocalization.propTypes = {
  children: PropTypes.node,
}

export default function ThemeLocalization({ children }) {
  const outerTheme = useTheme()
  const { currentLang } = useLocale()
  const theme = createTheme(outerTheme, currentLang.systemValue)

  return <ThemeProvider theme={theme}> {children} </ThemeProvider>
}
