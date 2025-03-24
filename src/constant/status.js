export const STATUS_BASE = {
 ACTIVE  : 'active',
 INACTIVE: 'inactive'
}

export const STATUS = {
 PURCHASED     : 'purchased',
 DE_COMMISIONED: 'decommissioned',
 COMMISSIONED  : 'commissioned',
 FREIGHT       : 'freight',
 SHIPPED       : 'shipped',
 INSTALLED     : 'installed',
 TRANSFERRED   : 'transferred',
 STATUS        : 'status'
}

export const SUPPORT_STATUS = {
 TO_DO      : 'to do',
 IN_PROGRESS: 'in progress',
 CANCELLED  : 'canceled',      // wrong spelling
 DONE       : 'done'
}

export const INVITATION_STATUS = {
 PENDING  : "PENDING",
 APPROVED : "APPROVED",
 REJECTED : "REJECTED",
 CANCELLED: "CANCELLED",
 EXPIRED  : "EXPIRED",
 NEW      : "NEW",
}

export const COMPLETED_STATUSES = [SUPPORT_STATUS.CLOSED, SUPPORT_STATUS.RESOLVED, SUPPORT_STATUS.CANCELLED, SUPPORT_STATUS.COMPLETED]
