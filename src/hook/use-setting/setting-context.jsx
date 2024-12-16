import PropTypes from 'prop-types'
import { createContext, useContext, useMemo, useCallback } from 'react'
import { useLocalStorage } from 'hook'
import { themePreset } from 'theme'
import { localStorageSpace } from 'util'
import { KEY } from 'constant'

const initialState = {
 ...themePreset,
 // Mode
 onToggleMode: () => {},
 onChangeMode: () => {},
 // Direction
 onToggleDirection: () => {},
 onChangeDirection: () => {},
 onToggleLanguage: () => {},
 // Layout
 onToggleLayout: () => {},
 onChangeLayout: () => {},
 // Contrast
 onToggleContrast: () => {},
 onChangeContrast: () => {},
 presetOption: [],
 // Reset
 onResetSetting: () => {}
}

export const SettingContext = createContext(initialState)

export const useSettingContext = () => {
 const context = useContext(SettingContext)
 if (!context) throw new Error('useSettingContext must be use inside SettingProvider')
 return context
}

SettingProvider.propTypes = {
 children: PropTypes.node
}

export function SettingProvider({ children }) {
 const [settings, setSettings] = useLocalStorage('settings', themePreset)
 const storageAvailable = localStorageSpace()
 const langStorage = storageAvailable ? localStorage.getItem('i18nextLng') : ''

 const onToggleMode = useCallback(() => {
  const themeMode = settings.themeMode === KEY.LIGHT ? KEY.DARK : KEY.LIGHT
  setSettings({ ...settings, themeMode })
 }, [setSettings, settings])

 const onChangeMode = useCallback(
  event => {
   const themeMode = event.target.value
   setSettings({ ...settings, themeMode })
  },
  [setSettings, settings]
 )

 const onToggleContrast = useCallback(() => {
  const themeContrast = settings.themeContrast === 'default' ? 'bold' : 'default'
  setSettings({ ...settings, themeContrast })
 }, [setSettings, settings])

 const onChangeContrast = useCallback(
  event => {
   const themeContrast = event.target.value
   setSettings({ ...settings, themeContrast })
  },
  [setSettings, settings]
 )

 const onToggleLanguage = useCallback(() => {
  const themeLanguage = settings.themeLanguage === 'en' ? 'ar' : 'en'
  setSettings({ ...settings, themeLanguage })
 }, [setSettings, settings, langStorage])

 const onResetSetting = useCallback(() => {
  setSettings(themePreset)
 }, [setSettings])

 const memoizedValue = useMemo(
  () => ({
   ...settings,
   onToggleMode,
   onChangeMode,
   onToggleLanguage,
   onChangeContrast,
   onToggleContrast,
   onResetSetting
  }),
  [settings, onToggleMode, onChangeMode, onToggleContrast, onResetSetting]
 )

 return <SettingContext.Provider value={memoizedValue}>{children}</SettingContext.Provider>
}
