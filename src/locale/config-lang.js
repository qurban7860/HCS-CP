// @mui
import { enUS, frFR, zhCN, viVN, arSA, koKR, ruRU, ptPT } from '@mui/material/locale'

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.

export const allLang = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/asset/svg/flag/us.svg'
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: '/asset/svg/flag/fr.svg'
  },
  {
    label: 'Portuguese',
    value: 'pt',
    systemValue: ptPT,
    icon: '/asset/svg/flag/pt.svg'
  },
  {
    label: 'Russian',
    value: 'ru',
    systemValue: ruRU,
    icon: '/asset/svg/flag/ru.svg'
  },
  {
    label: 'Chinese',
    value: 'cn',
    systemValue: zhCN,
    icon: '/asset/svg/flag/cn.svg'
  },
  {
    label: 'Korean',
    value: 'kr',
    systemValue: koKR,
    icon: '/asset/svg/flag/kr.svg'
  }
]

export const defaultLang = allLang[0] // English
