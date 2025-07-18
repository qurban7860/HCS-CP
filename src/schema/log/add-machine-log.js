import * as Yup from 'yup'

export const addLogSchema = Yup.object().shape({
  customer: Yup.string().label('Customer').required(),
  machine: Yup.object().nullable().required(),
  logType: Yup.object()
    .nullable()
    .required('Log Type is required')
    .shape({
      type: Yup.string().required('Log Type is required')
    }),
  dateFrom: Yup.date()
    .nullable()
    .test('dateFromTest', 'Date From must be earlier than Date To', function (value) {
      const { dateTo } = this.parent
      return value && (!dateTo || value <= dateTo)
    }),
  dateTo: Yup.date()
    .nullable()
    .test('dateToTest', 'Date To must be later than Date From', function (value) {
      const { dateFrom } = this.parent
      return value && (!dateFrom || value >= dateFrom)
    })
})
