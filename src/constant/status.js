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
 OPEN                : 'open',
 IN_PROGRESS         : 'in progress',
 WAITING_FOR_CUSTOMER: 'waiting for customer',
 WAITING_FOR_SUPPORT : 'waiting for support',
 UNDER_REVIEW        : 'under review',
 UNDER_INVESTIGATION : 'under investigation',
 PENDING             : 'pending',
 CLOSED              : 'closed',
 RESOLVED            : 'resolved',
 CANCELLED           : 'canceled',               // wrong spelling
 COMPLETED           : 'completed'
}

export const INVITATION_STATUS = {
 PENDING  : "PENDING",
 APPROVED : "APPROVED",
 REJECTED : "REJECTED",
 CANCELLED: "CANCELLED",
 "EXPIRED": "EXPIRED",
 "NEW"    : "NEW",
}

export const COMPLETED_STATUSES = [SUPPORT_STATUS.CLOSED, SUPPORT_STATUS.RESOLVED, SUPPORT_STATUS.CANCELLED, SUPPORT_STATUS.COMPLETED]
