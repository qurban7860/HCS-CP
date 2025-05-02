import { t } from 'i18next'
import { PATH_CUSTOMER } from 'route/path'
import { KEY } from 'constant'

export const fieldsKeyConfig = [
    {
        key: 'serialNo',
        heading: 'machine_serial_number.label',
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
        heading: 'profile.label',
        value: defaultValues =>
            Array.isArray(defaultValues?.profiles) && defaultValues?.profiles.length > 0 && defaultValues?.profiles[0]?.flange + 'X' + defaultValues?.profiles[0]?.web || "",
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
        key: 'supportExpireDate',
        type: 'supportExpireChip',
        value: defaultValues => defaultValues?.supportExpireDate
    },
    {
        key: 'customer',
        heading: 'organization.label',
        value: defaultValues => defaultValues?.customer,
        type: 'link',
        additionalProps: (defaultValues, handleCustomerDialog, themeMode) => ({
            country: defaultValues?.customerCountry,
            customerLink: PATH_CUSTOMER.customers.view(defaultValues?.customerId)
        }),
        linkProps: {
            country: defaultValues => defaultValues?.customerCountry,
            href: '#',
            underline: 'none',
            color: themeMode => (themeMode === KEY.LIGHT ? 'howick.midBlue' : 'howick.orange'),
            onClick: (event, customerId, handleCustomerDialog) => handleCustomerDialog(event, customerId)
        },
        truncate: 21
    },
    {
        key: 'status',
        heading: 'status.label',
        value: defaultValues => defaultValues?.status
    },
    {
        key: 'hlc',
        heading: 'hmi_version.label',
        value: defaultValues => defaultValues?.hlc
    },
    {
        key: 'plc',
        heading: 'plc_version.label',
        value: defaultValues => defaultValues?.plc
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
    // {
    //     key: 'description',
    //     heading: 'description.label',
    //     value: defaultValues => defaultValues?.description,
    //     gridSize: 12
    // }
]
