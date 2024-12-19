import { t } from 'i18next'
import { fDate } from 'util'

export const HEADER_ITEMS = [
 { id: 'serialNo', label: t('serial_number.label'), align: 'left', checked: true, value: mach => mach?.serialNo },
 //  { id: 'name', label: t('name.label'), align: 'left', checked: false },
 { id: 'model', label: t('model.label'), align: 'left', checked: true, value: mach => mach?.machineModel?.name },
 { id: 'installationDate', label: t('installation_date.label'), align: 'left', checked: true, value: mach => fDate(mach?.installationDate) },
 { id: 'shippingDate', label: t('shipping_date.label'), align: 'left', checked: true, value: mach => fDate(mach?.shippingDate) },
 { id: 'status', label: t('status.label'), align: 'left', checked: true, value: mach => mach?.status?.name },
 { id: 'isActive', label: t('active.label'), align: 'center', checked: true, width: '5%', value: mach => mach?.isActive }
]
