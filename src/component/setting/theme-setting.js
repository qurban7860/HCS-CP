import PropTypes from 'prop-types'
import ThemeContrast from './theme-contrast'
import ThemeRtlLayout from './theme-rtl-layout'
import ThemeColorPresets from './theme-color-preset'
import SettingsDrawer from './drawer'

// ----------------------------------------------------------------------

ThemeSettings.propTypes = {
  children: PropTypes.node,
}

export default function ThemeSettings({ children }) {
  return (
    <ThemeColorPresets>
      <ThemeContrast>
        <ThemeRtlLayout>
          {children}
          <SettingsDrawer />
        </ThemeRtlLayout>
      </ThemeContrast>
    </ThemeColorPresets>
  )
}
