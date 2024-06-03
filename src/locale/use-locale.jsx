import { useTranslation } from 'react-i18next'
import { useSettingContext } from 'hook'
import { localStorageSpace } from 'util'
import { allLang, defaultLang } from './config-lang'

function useLocale() {
  const { i18n, t: translate } = useTranslation()

  const { onChangeDirectionByLang } = useSettingContext()

  const storageAvailable = localStorageSpace()

  const langStorage = storageAvailable ? localStorage.getItem('i18nextLng') : ''

  const currentLang = allLang.find((_lang) => _lang.value === langStorage) || defaultLang

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang)
    onChangeDirectionByLang(newlang)
  }

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text, options) => translate(text, options),
    currentLang,
    allLang
  }
}

export default useLocale
