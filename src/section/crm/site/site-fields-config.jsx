export const fieldsSiteConfig = [
    {
        key: 'address',
        heading: 'address.label',
        value: defaultValues => defaultValues?.address,
        gridSize: 12,
        additionalProps: defaultValues => ({
            isNoBg: false
        })
    },
    {
        key: 'primaryBillingContactFullName',
        heading: 'billing_contact.label',
        value: defaultValues => defaultValues?.primaryBillingContactFullName,
        gridSize: 4,
        additionalProps: defaultValues => ({
            isNoBg: false
        })
    },
    {
        key: 'primaryTechnicalContactFullName',
        heading: 'technical_contact.label',
        value: defaultValues => defaultValues?.primaryTechnicalContactFullName,
        gridSize: 4,
        additionalProps: defaultValues => ({
            isNoBg: false
        })
    },
    {
        key: 'phone',
        heading: 'phone_number.label',
        additionalProps: defaultValues => ({
            phoneChips: defaultValues?.phone,
            isNoBg: false
        }),
        gridSize: 4
    },
    {
        key: 'lat',
        heading: 'latitude.label',
        value: defaultValues => defaultValues?.lat,
        additionalProps: defaultValues => ({
            isNoBg: false
        }),
        gridSize: 4
    },
    {
        key: 'long',
        heading: 'longitude.label',
        value: defaultValues => defaultValues?.long,
        additionalProps: defaultValues => ({
            isNoBg: false
        }),
        gridSize: 4
    }
]
