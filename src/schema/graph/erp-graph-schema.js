import * as Yup from 'yup';

export const erpGraphSchema = Yup.object().shape({
  customer: Yup.string().label('Customer'),

  machine: Yup.object().nullable(),

  logPeriod: Yup.string()
    .oneOf(['Hourly', 'Daily', 'Monthly', 'Quarterly', 'Yearly'])
    .label('Log Period'),

  logGraphType: Yup.object().nullable(),

  dateFrom: Yup.date()
    .nullable()
    .test('dateFromTest', 'Date From must be earlier than Date To', function (value) {
      const { dateTo } = this.parent;
      return value && (!dateTo || value <= dateTo);
    }),

  dateTo: Yup.date()
    .nullable()
    .test('dateToTest', 'Date To must be later than Date From', function (value) {
      const { dateFrom } = this.parent;
      return value && (!dateFrom || value >= dateFrom);
    })
});
