import { ICON as ICON_SIZE } from 'config'

export const ICON = {
  //  default
  size: ICON_SIZE.DEFAULT_SIZE,
  variant: 'overline',
  badge: 'body2',

  // default icons
  warning: 'mdi:alert-circle-outline',

  // ------------------------------------------------------------
  // @root - src/components/IconPopover -ViewFormFields
  // isOnline
  ONLINE: {
    icon: 'mdi:circle',
    color: '#008000',
    heading: 'Online',
  },
  OFFLINE: {
    icon: 'mdi:circle',
    color: '#bdbdbd',
    heading: 'Offline',
  },

  // isAPPROVED
  APPROVED: {
    icon: 'mdi:check-decagram',
    color: '#008000',
    heading: 'Approved',
  },
  NOTAPPROVED: {
    icon: 'mdi:alert-decagram',
    color: '#FF0000',
    heading: 'Not Approved',
  },

  REQUIRED: {
    icon: 'mdi:required-circle',
    color: '#008000',
    heading: 'Required',
  },
  NOTREQUIRED: {
    icon: 'mdi:required-circle',
    color: '#FF0000',
    heading: 'Not Required',
  },
  // ------------------------------------------------------------
  SEARCHBTN: {
    color: 'green',
    heading: (btnName) => btnName,
  },
  // ------------------------------------------------------------
  // isActive -Documents
  DOCUMENT_ACTIVE: {
    icon: 'basil:document-solid',
    color: 'green',
    heading: 'Active',
  },
  DOCUMENT_INACTIVE: {
    icon: 'basil:document-solid',
    color: 'red',
    heading: 'Inactive',
  },
  // ------------------------------------------------------------
  // MultiAuth
  MULTIAUTH_ACTIVE: {
    icon: 'tabler:2fa',
    color: '#008000',
    heading: 'MFA Enabled',
  },
  MULTIAUTH_INACTIVE: {
    icon: 'tabler:2fa',
    color: '#FF0000',
    heading: 'MFA Disabled',
  },

  // ------------------------------------------------------------
  // @root - customerAccess
  ALLOWED: {
    icon: 'mingcute:user-follow-2-fill',
    color: '#008000',
    heading: 'Customer Allowed',
  },
  DISALLOWED: {
    icon: 'mingcute:user-x-line',
    color: '#878787',
    heading: 'Customer Not Allowed',
  },
  VIEW_VERSIONS: {
    icon: 'mdi:archive-eye',
    color: 'primary.main',
    heading: 'View all Versions',
    width: '16px',
  },
  // ------------------------------------------------------------
  VIEW_PROFILE_SETS: {
    icon: 'mdi:application-cog-outline',
    color: 'primary.main',
    heading: 'View Profile Sets',
    width: '16px',
  },
  // ------------------------------------------------------------
  // Back Link
  BACK_LINK: {
    icon: 'vaadin:arrow-backward',
    color: 'blue',
    heading: 'Back',
  },

  // ------------------------------------------------------------
  // map icon
  MAP: {
    icon: 'mdi:google-maps',
    color: 'red',
    heading: 'Open Map',
  },

  // @root - Settings - settings
  // document settings
  DOCUMENT_TYPE: {
    icon: 'lucide:list-todo',
    heading: 'Document Type',
  },
  DOCUMENT_CATEGORY: {
    icon: 'ic:round-category',
    heading: 'Document Category',
  },

  USER_LOCK: {
    icon: 'mingcute:lock-fill',
    color: '#FF0000',
    heading: 'Lock User',
  },
  USER_UNLOCK: {
    icon: 'mingcute:unlock-fill',
    color: '#008000',
    heading: 'Unlock User',
  },
  // @root - GoogleMaps - map marker
  MAP_MARKER: {
    url: '/logo/howick_map-marker.svg',
  },
}
