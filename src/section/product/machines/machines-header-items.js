import { fDate } from 'util'

export const HEADER_ITEMS = [
    { id: 'serialNo', label: 'serial_number.label', align: 'left', checked: true, value: mach => mach?.serialNo },
    //  { id: 'name', label: t('name.label'), align: 'left', checked: false },
    { id: 'machineModel.name', label: 'model.label', align: 'left', checked: true, value: mach => mach?.machineModel?.name },
    { id: 'installationDate', label: 'installation_date.label', align: 'left', checked: true, value: mach => fDate(mach?.installationDate) },
    //  { id: 'shippingDate', label: 'shipping_date.label', align: 'left', checked: true, value: mach => fDate(mach?.shippingDate) },
    { id: 'profiles', label: 'profile.label', align: 'left', checked: true, value: mach => mach?.profiles },
    { id: 'status.name', label: 'status.label', align: 'left', checked: true, value: mach => mach?.status?.name },
    { id: 'isActive', label: 'active.label', align: 'center', checked: true, width: '5%', value: mach => mach?.isActive }
]
