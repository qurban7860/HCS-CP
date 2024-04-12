import * as Yup from 'yup'
import { pastDate, future5yearDate } from 'util'
import { RESPONSE, LABEL } from 'constant'

const {
  SCHEMA: { MACHINE: MACHINE_RESPONSE }
} = RESPONSE

const {
  SCHEMA: { MACHINE: MACHINE_LABEL }
} = LABEL

export const machineSchema = Yup.object().shape({
  serialNo: Yup.string().max(6).required().label(MACHINE_LABEL.SERIAL_NUMBER),
  name: Yup.string().max(250),
  parentSerialNo: Yup.object()
    .shape({
      serialNo: Yup.string()
    })
    .nullable(),
  profile: Yup.object().shape({
    default: Yup.object().shape({
      _id: Yup.string(),
      size: Yup.string(),
      name: Yup.string()
    }),
    sets: Yup.array().of(
      Yup.object().shape({
        _id: Yup.string(),
        size: Yup.string(),
        name: Yup.string()
      })
    )
  }),
  previousMachine: Yup.string(),
  supplier: Yup.object()
    .shape({
      serialNo: Yup.string()
    })
    .nullable(),
  machineModel: Yup.object()
    .shape({
      name: Yup.string()
    })
    .nullable(),
  customer: Yup.object()
    .shape({
      name: Yup.string()
    })
    .nullable()
    .required(MACHINE_RESPONSE.CUSTOMER_REQUIRED),
  status: Yup.object()
    .shape({
      name: Yup.string()
    })
    .nullable(),
  workOrderRef: Yup.string().max(50),
  purchaseDate: Yup.date().typeError().nullable().label(MACHINE_LABEL.PURCHASE_DATE).required(),
  shippingDate: Yup.date()
    .typeError(MACHINE_RESPONSE.DATE_VALID)
    .max(future5yearDate, MACHINE_RESPONSE.SHIPPING_DATE_MAX(future5yearDate))
    .min(pastDate, MACHINE_RESPONSE.SHIPPING_DATE_MIN(pastDate))
    .nullable()
    .label(MACHINE_LABEL.SHIPPING_DATE),
  installationDate: Yup.date()
    .typeError(MACHINE_RESPONSE.DATE_VALID)
    .max(future5yearDate, MACHINE_RESPONSE.INSTALLATION_DATE_MAX(future5yearDate))
    .min(pastDate, MACHINE_RESPONSE.INSTALLATION_DATE_MIN(pastDate))
    .nullable()
    .label(MACHINE_LABEL.INSTALLATION_DATE),
  supportExpireDate: Yup.date().typeError(MACHINE_RESPONSE.DATE_VALID).nullable().label(MACHINE_LABEL.SUPPORT_EXPIRY_DATE),
  installationSite: Yup.object()
    .shape({
      name: Yup.string()
    })
    .nullable(),
  billingSite: Yup.object()
    .shape({
      name: Yup.string()
    })
    .nullable(),
  accountManager: Yup.array(),
  projectManager: Yup.array(),
  supportManager: Yup.array(),
  siteMilestone: Yup.string().max(1500),
  description: Yup.string().max(5000),
  isActive: Yup.boolean()
})
