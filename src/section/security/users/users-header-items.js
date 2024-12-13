import { min } from 'date-fns'
import { t } from 'i18next'

export const HEADER_ITEMS = [
 { id: 'name', label: t('name.label'), align: 'left', checked: true },
 { id: 'email', label: t('email.label'), align: 'left', checked: true },
 { id: 'role', label: t('role.label'), align: 'left', checked: true },
 { id: 'isActive', label: t('active.label'), align: 'center', checked: true, width: '5%' }
]
