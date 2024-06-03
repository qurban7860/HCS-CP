import PropTypes from 'prop-types'
import ThemeContrast from './theme-contrast'

ThemeSettings.propTypes = {
  children: PropTypes.node,
}

export default function ThemeSettings({ children }) {
  return <ThemeContrast>{children}</ThemeContrast>
}
