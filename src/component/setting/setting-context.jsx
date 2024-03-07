import PropTypes from 'prop-types'
import { createContext, useEffect, useContext, useMemo, useCallback } from 'react'
import { useLocalStorage } from 'hook'
import { themePreset } from 'theme'
import { localStorageSpace } from 'util'
import { defaultPreset, getPresets, presetsOption } from 'theme/preset'

const initialState = {
  ...themePreset,
  // Mode
  onToggleMode: () => {},
  onChangeMode: () => {},
  // Direction
  onToggleDirection: () => {},
  onChangeDirection: () => {},
  onChangeDirectionByLang: () => {},
  // Layout
  onToggleLayout: () => {},
  onChangeLayout: () => {},
  // Contrast
  onToggleContrast: () => {},
  onChangeContrast: () => {},
  // Color
  onChangeColorPresets: () => {},
  presetsColor: defaultPreset,
  presetsOption: [],
  // Stretch
  onToggleStretch: () => {},
  // Reset
  onResetSetting: () => {},
}

export const SettingContext = createContext(initialState)

export const useSettingContext = () => {
  const context = useContext(SettingContext)

  if (!context) throw new Error('useSettingContext must be use inside SettingProvider')

  return context
}

SettingProvider.propTypes = {
  children: PropTypes.node,
}

export function SettingProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', themePreset)
  const storageAvailable = localStorageSpace()
  const langStorage = storageAvailable ? localStorage.getItem('i18nextLng') : ''

  const isArabic = langStorage === 'ar'

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang('ar')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArabic])

  // Mode
  const onToggleMode = useCallback(() => {
    const themeMode = settings.themeMode === 'light' ? 'dark' : 'light'
    setSettings({ ...settings, themeMode })
  }, [setSettings, settings])

  const onChangeMode = useCallback(
    (event) => {
      const themeMode = event.target.value
      setSettings({ ...settings, themeMode })
    },
    [setSettings, settings]
  )

  // Direction
  const onToggleDirection = useCallback(() => {
    const themeDirection = settings.themeDirection === 'rtl' ? 'ltr' : 'rtl'
    setSettings({ ...settings, themeDirection })
  }, [setSettings, settings])

  const onChangeDirection = useCallback(
    (event) => {
      const themeDirection = event.target.value
      setSettings({ ...settings, themeDirection })
    },
    [setSettings, settings]
  )

  const onChangeDirectionByLang = useCallback(
    (lang) => {
      const themeDirection = lang === 'ar' ? 'rtl' : 'ltr'
      setSettings({ ...settings, themeDirection })
    },
    [setSettings, settings]
  )

  // Layout
  const onToggleLayout = useCallback(() => {
    const themeLayout = settings.themeLayout === 'vertical' ? 'mini' : 'vertical'
    setSettings({ ...settings, themeLayout })
  }, [setSettings, settings])

  const onChangeLayout = useCallback(
    (event) => {
      const themeLayout = event.target.value
      setSettings({ ...settings, themeLayout })
    },
    [setSettings, settings]
  )

  // Contrast
  const onToggleContrast = useCallback(() => {
    const themeContrast = settings.themeContrast === 'default' ? 'bold' : 'default'
    setSettings({ ...settings, themeContrast })
  }, [setSettings, settings])

  const onChangeContrast = useCallback(
    (event) => {
      const themeContrast = event.target.value
      setSettings({ ...settings, themeContrast })
    },
    [setSettings, settings]
  )

  // Color
  const onChangeColorPresets = useCallback(
    (event) => {
      const themeColorPreset = event.target.value
      setSettings({ ...settings, themeColorPreset })
    },
    [setSettings, settings]
  )

  // Stretch
  const onToggleStretch = useCallback(() => {
    const themeStretch = !settings.themeStretch
    setSettings({ ...settings, themeStretch })
  }, [setSettings, settings])

  // Reset
  const onResetSetting = useCallback(() => {
    setSettings(themePreset)
  }, [setSettings])

  const memoizedValue = useMemo(
    () => ({
      ...settings,
      // Mode
      onToggleMode,
      onChangeMode,
      // Direction
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,
      // Layout
      onToggleLayout,
      onChangeLayout,
      // Contrast
      onChangeContrast,
      onToggleContrast,
      // Stretch
      onToggleStretch,
      // Color
      onChangeColorPresets,
      presetsOption,
      presetsColor: getPresets(settings.themeColorPreset),
      // Reset
      onResetSetting,
    }),
    [
      settings,
      // Mode
      onToggleMode,
      onChangeMode,
      // Direction
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,
      // Layout
      onToggleLayout,
      onChangeLayout,
      onChangeContrast,
      // Contrast
      onToggleContrast,
      // Stretch
      onToggleStretch,
      // Color
      onChangeColorPresets,
      // Reset
      onResetSetting,
    ]
  )

  return <SettingContext.Provider value={memoizedValue}>{children}</SettingContext.Provider>
}
