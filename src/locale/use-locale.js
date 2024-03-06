import { useTranslation } from 'react-i18next'
import { localStorageSpace } from 'util'
import { useSettingsContext } from 'component/setting'
import { allLangs, defaultLang } from './config-lang'

export default function useLocale() {
  const { i18n, t: translate } = useTranslation()

  const { onChangeDirectionByLang } = useSettingsContext()

  const storageAvailable = localStorageSpace()

  const langStorage = storageAvailable ? localStorage.getItem('i18nextLng') : ''

  const currentLang = allLangs.find((_lang) => _lang.value === langStorage) || defaultLang

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang)
    onChangeDirectionByLang(newlang)
  }

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text, options) => translate(text, options),
    currentLang,
    allLangs,
  }
}
