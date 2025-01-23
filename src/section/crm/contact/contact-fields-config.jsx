export const fieldsContactConfig = [
 {
  type : 'title',
  key  : 'personalInformation',
  title: 'personal_information.label'
 },
 {
  key     : 'firstName',
  heading : 'first_name.label',
  value   : defaultValues => defaultValues?.firstName,
  gridSize: 6
 },
 {
  key     : 'lastName',
  heading : 'last_name.label',
  value   : defaultValues => defaultValues?.lastName,
  gridSize: 6
 },
 {
  key     : 'loginEmail',
  heading : 'email.label',
  value   : defaultValues => defaultValues?.email,
  gridSize: 6
 },
 {
  key            : 'phoneNumbers',
  heading        : 'phone_number.label',
  additionalProps: defaultValues => ({
   phoneChips: defaultValues?.phoneNumbers
  }),
  gridSize: 6
 },
 {
  key     : 'title',
  heading : 'title.label',
  value   : defaultValues => defaultValues?.title,
  gridSize: 6
 },
//  {
//   key     : 'department',
//   heading : 'department.label',
//   value   : defaultValues => defaultValues?.department,
//   gridSize: 6
//  },
//  {
//   key            : 'contactTypes',
//   heading        : 'contact_type.contact_types.label',
//   additionalProps: defaultValues => ({
//    userRolesChip: defaultValues?.contactTypes
//   }),
//   gridSize: 6
//  },
//  {
//   key     : 'reportTo',
//   heading : 'report_to.label',
//   value   : defaultValues => defaultValues?.reportTo,
//   gridSize: 6
//  },
 {
  type : 'title',
  key  : 'addressInformation',
  title: 'address_information.label'
 },
 {
  key     : 'street',
  heading : 'address.street.label',
  value   : defaultValues => defaultValues?.street,
  truncate: 50
 },
 {
  key    : 'suburb',
  heading: 'address.suburb.label',
  value  : defaultValues => defaultValues?.suburb
 },
 {
  key    : 'city',
  heading: 'address.city.label',
  value  : defaultValues => defaultValues?.city
 },
 {
  key    : 'postCode',
  heading: 'address.post_code.label',
  value  : defaultValues => defaultValues?.postCode
 },
 {
  key    : 'region',
  heading: 'address.region.label',
  value  : defaultValues => defaultValues?.region
 },
 {
  key    : 'state',
  heading: 'address.state.label',
  value  : defaultValues => defaultValues?.state
 },
 {
  key    : 'country',
  heading: 'address.country.label',
  value  : defaultValues => defaultValues?.country
 }
]
