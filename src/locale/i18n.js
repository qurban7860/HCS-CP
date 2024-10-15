import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { localStorageSpace } from 'util'
import { defaultLang } from './config-lang'
import { en, fr, cn, ar, vn, ru, kr, pt } from './lang'

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
      en: { translations: en },
      fr: { translations: fr },
      vn: { translations: vn },
      cn: { translations: cn },
      ar: { translations: ar },
      ru: { translations: ru },
      kr: { translations: kr },
      pt: { translations: pt }
    },
    lng,
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
