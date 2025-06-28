import * as Yup from 'yup';
import { validateGraphDateRange } from 'section/log/erp/graph/utils/validateGraphDateRange';

export const erpGraphSchema = Yup.object().shape({
  customer: Yup.string().label('Customer'),

  machine: Yup.object().nullable().required('Machine is required'),

  logPeriod: Yup.string()
    .oneOf(['Hourly', 'Daily', 'Monthly', 'Quarterly', 'Yearly'])
    .label('Log Period'),

  logGraphType: Yup.object().nullable(),

  dateFrom: Yup.date()
    .nullable()
    .test('dateFromTest', 'Date From must be earlier than Date To', function (value) {
      const { dateTo } = this.parent;
      return value && (!dateTo || value <= dateTo);
    })
    .test('periodRangeTest', function (value) {
      const { dateFrom, dateTo, logPeriod } = this.parent;
      const error = validateGraphDateRange(dateFrom, dateTo, logPeriod);
      return error ? this.createError({ message: error }) : true;
    }),

  dateTo: Yup.date()
    .nullable()
    .test('dateToTest', 'Date To must be later than Date From', function (value) {
      const { dateFrom } = this.parent;
      return value && (!dateFrom || value >= dateFrom);
    })
    .test('periodRangeTest', function (value) {
      const { dateFrom, dateTo, logPeriod } = this.parent;
      const error = validateGraphDateRange(dateFrom, dateTo, logPeriod);
      return error ? this.createError({ message: error }) : true;
    }),
});

export const fetchIndMachineGraphSchema = Yup.object().shape({ 
  logGraphType: Yup.object().nullable().required('Graph Type is required'),
  logPeriod: Yup.string().required('Log Period is required'),

  dateFrom: Yup.date()
    .nullable()
    .test('dateFromTest', 'Start Date must be earlier than or equal to End Date', function (value) {
      const { dateTo } = this.parent;
      return value && (!dateTo || value <= dateTo);
    })
    .test('periodRangeTest', function (value) {
      const { dateFrom, dateTo, logPeriod } = this.parent;
      const error = validateGraphDateRange(dateFrom, dateTo, logPeriod);
      return error ? this.createError({ message: error }) : true;
    }),

  dateTo: Yup.date()
    .nullable()
    .test('dateToTest', 'End Date must be later than or equal to Start Date', function (value) {
      const { dateFrom } = this.parent;
      return value && (!dateFrom || value >= dateFrom);
    })
    .test('periodRangeTest', function (value) {
      const { dateFrom, dateTo, logPeriod } = this.parent;
      const error = validateGraphDateRange(dateFrom, dateTo, logPeriod);
      return error ? this.createError({ message: error }) : true;
    }),
});

