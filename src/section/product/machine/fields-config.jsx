import { t } from 'i18next'
import { PATH_CUSTOMER } from 'route/path'
import { Link } from '@mui/material'
import { truncate } from 'util'
import { VIEW_FORM, KEY } from 'constant'

export const fieldsKeyConfig = [
 {
  key: 'serialNo',
  heading: 'name.label',
  value: defaultValues => defaultValues?.serialNo,
  gridSize: 4
 },
 {
  key: 'machineModel',
  heading: 'machine_model.label',
  value: defaultValues => defaultValues?.machineModel,
  gridSize: 4
 },
 {
  key: 'profiles',
  heading: 'machine_model.label',
  value: defaultValues =>
   Array.isArray(defaultValues?.profiles) && defaultValues?.profiles.length > 0 ? defaultValues?.profiles[0]?.flange + 'X' + defaultValues?.profiles[0]?.web : t('not_provided.label'),
  gridSize: 4
 }
]

export const fieldsMachineInformationConfig = [
 {
  key: 'name',
  heading: 'name.label',
  value: defaultValues => defaultValues?.name,
  gridSize: 12
 },
 {
  key: 'organization',
  heading: VIEW_FORM.ORGANIZATION,
  value: defaultValues => defaultValues?.customer,
  additionalProps: (defaultValues, handleCustomerDialog, themeMode) => ({
   country: defaultValues?.customerCountry,
   customerLink: PATH_CUSTOMER.customers.view(defaultValues?.customerId),
   onClick: event => handleCustomerDialog(event, defaultValues?.customerId),
   render: value =>
    value ? (
     <Link
      onClick={event => handleCustomerDialog(event, defaultValues?.customerId)}
      href='#'
      underline='none'
      color={themeMode === KEY.LIGHT ? 'theme.palette.howick.midBlue' : 'theme.palette.howick.orange'}>
      {truncate(value, 21)}
     </Link>
    ) : null
  })
 },
 {
  key: 'status',
  heading: 'status.label',
  value: defaultValues => defaultValues?.status
 },
 {
  key: 'workOrderRef',
  heading: 'work_order.label',
  value: defaultValues => defaultValues?.workOrderRef
 },
 {
  key: 'financialCompany',
  heading: 'financing_company.label',
  value: defaultValues => defaultValues?.financialCompany
 },
 {
  key: 'supplier',
  heading: 'supplier.label',
  value: defaultValues => defaultValues?.supplier
 },
 {
  key: 'supportExpireDate',
  heading: 'support_expiration.label',
  value: defaultValues => defaultValues?.supportExpireDate
 },
 {
  key: 'purchaseDate',
  heading: 'purchase_date.label',
  value: defaultValues => defaultValues?.purchaseDate
 },
 {
  key: 'manufactureDate',
  heading: 'manufacture_date.label',
  value: defaultValues => defaultValues?.manufactureDate
 },
 {
  key: 'shippingDate',
  heading: 'shipping_date.label',
  value: defaultValues => defaultValues?.shippingDate
 },
 {
  key: 'installationDate',
  heading: 'installation_date.label',
  value: defaultValues => defaultValues?.installationDate
 },
 {
  key: 'installationSiteName',
  heading: 'installation_site.label',
  value: defaultValues => defaultValues?.installationSiteName
 },
 {
  key: 'billingSiteName',
  heading: 'billing_site.label',
  value: defaultValues => defaultValues?.billingSiteName
 },
 {
  key: 'description',
  heading: 'description.label',
  value: defaultValues => defaultValues?.description,
  gridSize: 12
 }
]
