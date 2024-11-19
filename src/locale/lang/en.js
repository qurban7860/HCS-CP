import { get } from 'react-hook-form'

const en = {
 account: `account`,
 active_support_ticket: {
  label: `Active Support Ticket`,
  active_support_tickets: {
   label: `Active Support Tickets`
  },
  no_active_tickets_found: {
   label: `No active tickets found`
  }
 },
 register_agreement: 'By clicking "Register" you agree to our <1>Privacy Policy</1>.',
 address: {
  label: `Address`
 },
 additional_notes: {
  label: `Additional Notes`
 },
 app: `app`,
 user: `user`,
 list: `list`,
 edit: `edit`,
 shop: `shop`,
 blog: `blog`,
 post: `post`,
 mail: `mail`,
 chat: `chat`,
 cards: `cards`,
 posts: `posts`,
 billing_contact: {
  label: `Billing Contact`
 },
 close: {
  label: `Close`
 },
 create: `create`,
 column: {
  label: `Column`,
  columns: {
   label: `Columns`
  }
 },
 contact: {
  label: `Contact`,
  contacts: {
   label: `Contacts`
  }
 },
 contact_number: {
  label: `Contact number`
 },
 contact_person_name: {
  label: `Name of Contact Person`
 },
 country: {
  label: `Country`
 },
 dashboard: {
  label: `Dashboard`
 },
 group: {
  label: `Group`
 },
 change_password: {
  label: `Change Password`
 },
 customer: {
  label: `Customer`
 },
 customer_name: {
  label: `Customer Name`
 },
 customer_group: {
  label: `Customer Group`
 },
 customer_note: {
  label: `Customer Note`
 },
 document: {
  local: `document`,
  label: `Document`
 },
 email: {
  label: `Email`
 },
 graph: {
  label: `Graph`,
  graphs: {
   label: `Graphs`
  }
 },
 graph_type: {
  label: `Graph Type`
 },
 full_name: {
  label: `Full Name`
 },
 log: {
  label: `Log`,
  logs: {
   label: `Logs`
  },
  button: {
   get_logs: `Get Logs`
  },
  period: {
   label: `Period`
  }
 },
 login: {
  label: `Login`,
  login_email: {
   label: `Login / Email address`
  }
 },
 login_page: {
  label: `Login Page`
 },
 login_email: {
  label: `Login Email`
 },
 home: {
  local: `home`,
  label: `Home`
 },
 howick_website: {
  label: `Howick Website`
 },
 machine: {
  local: `machine`,
  label: `Machine`,
  machines: {
   label: `Machines`
  }
 },
 next_step: {
  label: `Next Step`,
  next_steps: {
   label: `Next Steps`
  },
  registration_process: {
   title: 'Registration Request has been submitted',
   first: 'Our team will review your registration request',
   second: 'You will receive further instructions within 12-48 hours',
   last: 'Check your email (<1>{{email}}</1>) for the invitation link'
  }
 },
 no_coordinates_provided: {
  label: `No coordinates provided`
 },
 organization: {
  local: `organization`,
  label: `Organization`
 },
 organization_address: {
  local: `organization`,
  label: `Organization address`
 },
 organizations: {
  local: `organizations`,
  label: `Organizations`
 },
 organization_name: {
  label: `Organization name`
 },

 support: {
  local: `support`,
  label: `Support`
 },
 new_password: {
  label: `New Password`
 },
 old_password: {
  label: `Old Password`
 },
 portal: {
  local: `portal`,
  label: `Portal`
 },
 support_tickets: {
  local: `support_tickets`,
  label: `Support Tickets`
 },
 site: {
  local: `site`,
  label: `Site`,
  sites: {
   label: `Sites`
  }
 },
 sites: {
  local: `sites`,
  label: `Sites`
 },
 contacts: {
  local: `contacts`,
  label: `Contacts`
 },
 customer_overview: {
  local: `customer_overview`,
  label: `Customer Overview`
 },
 name: {
  key: `name`,
  label: `Name`
 },
 general: `general`,
 banking: `banking`,
 booking: `booking`,
 profile: {
  local: `profile`,
  label: `Profile`
 },
 display_settings: {
  label: `Display Settings`
 },
 logout: {
  label: `Logout`
 },
 language: {
  label: `Language`
 },
 legend: {
  label: `Legend`,
  legends: {
   label: `Legends`
  }
 },
 note: {
  label: `Note`
 },
 notifications: {
  label: `Notifications`,
  no_notif: `You have no new notifications`
 },
 search: {
  label: `Search`
 },
 select_filter: {
  label: `Select Filter`
 },
 password: {
  label: `Password`,
  confirm_password: {
   label: `Confirm Password`
  },
  set_password: {
   label: `Set Password`
  },
  set_new_password: {
   label: `Set New Password`
  },
  password_updated: {
   label: `Password Updated`
  }
 },
 phone_number: {
  label: `Phone Number`,
  phone_numbers: {
   label: `Phone Numbers`
  }
 },
 product: `product`,
 production: {
  label: `Production`,
  production_total: { label: `Production Total` },
  production_rate: { label: `Production Rate` }
 },
 invoice: `invoice`,
 register: {
  label: `Register`
 },
 remember_me: {
  label: `Remember me`
 },
 required: {
  label: `Required`
 },
 reset_password: {
  label: `Reset Password`
 },
 responses: {
  label: `Responses`,
  messages: {
   pre_reset: 'Enter your email address below and we will send you instructions on how to reset your password.',
   check_email: `Check your E-mail for the password reset link.`
  },
  success: {
   logged_in: 'Logged in',
   logged_out: 'Logged out',
   register_request_submitted: 'Registration request submitted',
   details_updated: 'User details updated, navigating you to the Login page...',
   password_updated: 'Password updated',
   reset_request_submitted: 'Password reset request submitted'
  },
  error: {
   form_check_errors: 'Please check the form for errors',
   invalid_credentials: 'Invalid credentials',
   machine_serial_invalid: 'Machine serial number provided is invalid',
   something_went_wrong: 'Something went wrong',
   unable_to_process_request: 'Unable to process your request',
   unable_save_details: 'Unable to save details',
   unable_read_error_message: 'Unable to read error message',
   unable_logout: 'Unable to logout',
   unexpected_error: 'An unexpected error occurred'
  }
 },
 save: {
  label: `Save`
 },
 send_reset_password_request: {
  label: `Send Reset Password Request`
 },
 submit: {
  label: `Submit`
 },
 submitted_details: {
  label: `Submitted Details`
 },
 technical_contact: {
  label: `Technical Contact`
 },
 details: `details`,
 checkout: `checkout`,
 calendar: `calendar`,
 analytics: `analytics`,
 ecommerce: `e-commerce`,
 management: `management`,
 menu_level: `menu level`,
 menu_level_2a: `menu level 2a`,
 menu_level_2b: `menu level 2b`,
 menu_level_3a: `menu level 3a`,
 menu_level_3b: `menu level 3b`,
 menu_level_4a: `menu level 4a`,
 menu_level_4b: `menu level 4b`,
 item_disabled: `item disabled`,
 item_label: `item label`,
 item_caption: `item caption`,
 item_external_link: `item external link`,
 description: `description`,
 other_cases: `other cases`,
 item_by_roles: `item by roles`,
 only_admin_can_see_this_item: `Only admin can see this item`,
 app_customer_tagline: `Portal for convenient and efficient management of machines, their updates and support.`
}

export default en
