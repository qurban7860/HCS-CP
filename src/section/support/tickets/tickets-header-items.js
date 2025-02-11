import { fDate } from 'util'

export const HEADER_ITEMS = [
 { id: 'issueType.name', label: '', align: 'left', checked: true, value: () => {} },
 { id: 'ticketNo', label: 'ticket_number.label', align: 'left', checked: true, width: '10%', value: (field) => field?.ticketNo },
 { id: 'summary', label: 'summary.label', align: 'left', checked: true, allowColumn : true, width: '30%', value: (field) => field?.summary },
 { id: 'machine.serialNo', label: 'machine.label', align: 'left', checked: true, width: '8%', allowColumn : true, value: (field) => field?.machine?.serialNo },
 { id: 'machine.machineModel.name', label: 'machine_model.label', align: 'left', checked: true, allowColumn : true, value: (field) => field?.machine?.machineModel?.name },
 { id: 'status.name', label: 'status.label', align: 'left', checked: true, allowColumn : true, width: '10%', value: (field) => field?.status?.name },
 { id: 'priority.name', label: 'priority.label', align: 'left', checked: true, allowColumn : true, width: '10%', value: (field) => field?.priority?.name },
 { id: 'createdAt', label: 'created_at.label', align: 'right', checked: true, value: (field) => fDate(field?.createdAt) },
]
