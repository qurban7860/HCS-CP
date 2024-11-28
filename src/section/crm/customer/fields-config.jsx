export const fieldsKeyConfig = [
 {
  key: 'name',
  heading: 'organization_name.label',
  value: defaultValues => defaultValues?.name,
  gridSize: 6
 },
 {
  key: 'website',
  heading: 'website.label',
  additionalProps: defaultValues => ({
   link: defaultValues?.website
  }),
  gridSize: 6
 },
 {
  key: 'tradingName',
  heading: 'trading_name.label',
  additionalProps: defaultValues => ({
   chip: defaultValues?.tradingName
  }),
  gridSize: 12
 }
]

export const fieldSiteInformationConfig = [
 {
  key: 'mainSite',
  heading: 'site_name.label',
  value: defaultValues => defaultValues?.mainSite?.name,
  gridSize: 12
 },
 {
  key: 'street',
  heading: 'address.street.label',
  value: defaultValues => defaultValues?.street,
  truncate: 50
 },
 {
  key: 'suburb',
  heading: 'address.suburb.label',
  value: defaultValues => defaultValues?.suburb
 },
 {
  key: 'city',
  heading: 'address.city.label',
  value: defaultValues => defaultValues?.city
 },
 {
  key: 'postCode',
  heading: 'address.post_code.label',
  value: defaultValues => defaultValues?.postCode
 },
 {
  key: 'region',
  heading: 'address.region.label',
  value: defaultValues => defaultValues?.region
 },
 {
  key: 'state',
  heading: 'address.state.label',
  value: defaultValues => defaultValues?.state
 },
 {
  key: 'country',
  heading: 'address.country.label',
  value: defaultValues => defaultValues?.country
 }
]
