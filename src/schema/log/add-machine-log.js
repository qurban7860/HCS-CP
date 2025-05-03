import * as Yup from 'yup'

export const addLogSchema = Yup.object().shape({
  customer: Yup.string().label('Customer').required(),
  machine: Yup.object().nullable(),
  logType: Yup.object()
    .nullable()
    .required('Log Type is required')
    .shape({
      type: Yup.string().required('Log Type is required')
    }),
  dateFrom: Yup.date()
    .nullable()
    .test('dateFromTest', 'Start Date must be earlier than End Date', function (value) {
      const { dateTo } = this.parent
      return value && (!dateTo || value < dateTo)
    }),
  dateTo: Yup.date()
    .nullable()
    .test('dateToTest', 'End Date must be later than Start Date', function (value) {
      const { dateFrom } = this.parent
      return value && (!dateFrom || value > dateFrom)
    })
})
