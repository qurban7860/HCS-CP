import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { localStorageSpace } from 'util'
import { defaultLang } from './config-lang'
import enLocales from './lang/en'
import frLocales from './lang/fr'
import vnLocales from './lang/vn'
import cnLocales from './lang/cn'
import arLocales from './lang/ar'

let lng = defaultLang.value

const storageAvailable = localStorageSpace()

if (storageAvailable) {
  lng = localStorage.getItem('i18nextLng') || defaultLang.value
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      fr: { translations: frLocales },
      vn: { translations: vnLocales },
      cn: { translations: cnLocales },
      ar: { translations: arLocales },
    },
    lng,
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
