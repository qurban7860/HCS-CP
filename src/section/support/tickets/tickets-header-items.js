import { t } from 'i18next'
import { fDate } from 'util/format'

export const HEADER_ITEMS = [
 { id: 'fields.created', label: t('created.label'), align: 'left', checked: true, value: fields => fDate(fields?.created) },
 { id: 'key', label: t('ticket_number.label'), align: 'left', checked: true, width: '10%' },
 { id: 'fields.summary', label: t('issue.label'), align: 'left', checked: true, value: fields => fields?.summary },
 { id: 'fields.customfield_10069', label: t('machine.label'), align: 'left', checked: true, width: '8%', value: fields => fields?.customfield_10069 },
 { id: 'fields.customfield_10070.value', label: t('machine_model.label'), align: 'left', checked: true, value: fields => fields?.customfield_10070?.value },
 { id: 'fields.status.statusCategory.name', label: t('status.label'), align: 'left', width: '10%', checked: true, value: fields => fields?.status?.statusCategory?.name }
]
