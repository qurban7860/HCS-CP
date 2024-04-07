import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { palette } from 'theme'

function ThemeHOC(Component) {
  function themeHOC(props) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    )
  }

  return themeHOC
}

export default ThemeHOC
