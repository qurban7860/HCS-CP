import * as yup from 'yup'

export const ContactSchema = yup.object().shape({
    firstName   : yup.string().max(40).required(),
    lastName    : yup.string().max(40),
    title       : yup.string(),
    contactTypes: yup.array(),
    email       : yup.string().trim('The contact name cannot include leading and trailing spaces').email('Email must be a valid email address'),
    street      : yup.string(),
    suburb      : yup.string(),
    city        : yup.string(),
    region      : yup.string(),
    postcode    : yup.string(),
    isActive    : yup.boolean(),
    country     : yup.object().nullable(),
    phoneNumbers: yup.array().of(
        yup.object().shape({type: yup.string().label("Number Type").when('contactNumber', {
          is  : (contactNumber) => !!contactNumber,
          then: yup.string().required('Type is required when contact number is defined'),
        }).nullable(),
        countryCode: yup.string().label("Country Code")
          .when('contactNumber', {
            is  : (contactNumber) => !!contactNumber,
            then: yup.string().required('Country code is required when contact number is defined'),
          })
          .nullable(),
        contactNumber: yup.string().label("Contact Number").nullable(),
        extensions   : yup.string().label("Extension").nullable(),
      })
    ),
})
