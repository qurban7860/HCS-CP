const _GEN5_LOG_TYPES_ARR = ['ERP', 'PRODUCTION', 'COIL']

const _GEN5_LOG_TYPES = {
 ERP: {
  name: 'erp',
  type: 'ERP',
  disabled: false,
  versions: ['v1.5.X', 'v1.4.X', 'v1.1.66'],
  formats: {
   'v1.1.66': ['date', 'operator', 'coilBatchName', 'ccThickness', 'coilLength', 'frameSet', 'componentLabel', 'webWidth', 'flangeHeight', 'profileShape', 'componentLength', 'waste', 'time'],
   'v1.4.X': [
    'date',
    'operator',
    'coilBatchName',
    'ccWidth',
    'coilThickness',
    'coilLength',
    'frameSet',
    'componentLabel',
    'webWidth',
    'flangeHeight',
    'profileShape',
    'componentLength',
    'waste',
    'time',
    'componentWeight'
   ],
   'v1.5.X': [
    'timestamp',
    'operator',
    'coilBatchName',
    'coilWidth',
    'coilThickness',
    'coilLength',
    'frameSet',
    'componentLabel',
    'flangeHeight',
    'webWidth',
    'profileShape',
    'componentLength',
    'waste',
    'time',
    'mode',
    'measurementUnit',
    'componentWeight',
    'lineSpeed'
   ]
  },
  tableColumns: [
   { id: 'date', label: 'Date - Time', alwaysShow: true, defaultShow: true },
   { id: 'machineSerialNo', label: 'Machine', alwaysShow: true, defaultShow: true, page: 'logsPage', searchable: true },
   { id: '_id', label: 'ID', searchable: true },
   { id: 'componentLabel', label: 'Component Label', defaultShow: true, searchable: true },
   { id: 'frameSet', label: 'Frame Set', defaultShow: true, searchable: true },
   { id: 'componentLength', label: 'Component Length', alwaysShow: true, defaultShow: true, searchable: true, numerical: true },
   { id: 'waste', label: 'Waste', alwaysShow: true, defaultShow: true, searchable: true, numerical: true },
   { id: 'flangeHeight', label: 'Flange Height', defaultShow: true, searchable: true, numerical: true },
   { id: 'webWidth', label: 'Web Width', defaultShow: true, searchable: true, numerical: true },
   { id: 'profileShape', label: 'Profile Shape', defaultShow: true, searchable: true },
   { id: 'coilLength', label: 'Coil Length', defaultShow: true, searchable: true, numerical: true },
   { id: 'componentWeight', label: 'Component Weight', searchable: true, numerical: true },
   { id: 'coilBatchName', label: 'Coil Batch Name', searchable: true },
   { id: 'coilThickness', label: 'Coil Thickness', searchable: true, numerical: true },
   { id: 'coilWidth', label: 'Coil Width', searchable: true, numerical: true },
   { id: 'lineSpeed', label: 'Line Speed', searchable: true, numerical: true },
   { id: 'mode', label: 'Mode', searchable: true },
   { id: 'time', label: 'Time' },
   { id: 'operator', label: 'Operator', searchable: true }
  ],
  numericalLengthValues: ['coilLength', 'coilWidth', 'coilThickness', 'flangeHeight', 'webWidth', 'componentLength', 'waste']
 },
 PRODUCTION: {
  name: 'production',
  type: 'PRODUCTION',
  disabled: true,
  versions: ['v1.4.5']
 },
 COIL: {
  name: 'coil',
  type: 'COIL',
  disabled: true,
  versions: ['v1.4.5']
 }
}

export const LOG_TYPE_CONFIG = {
 gen5: _GEN5_LOG_TYPES_ARR.map(type => _GEN5_LOG_TYPES[type])
}

export const GET_LOG_TYPE_CONFIG = generation => {
 if (generation === 5) {
  return LOG_TYPE_CONFIG
 } else if (generation === 6) {
  return []
 }
 return null
}

/**
 *
 * @param {number} generation
 * @param {string} type - log type 'erp', 'production', 'coil'
 * @returns {object} - log type config object
 */
export const getLogTypeConfigForGenerationAndType = (generation, type) => {
 if (!generation) {
  return null
 }

 if (generation === 5) {
  if (!type) {
   return null
  }

  if (_GEN5_LOG_TYPES_ARR.includes(type)) {
   return _GEN5_LOG_TYPES[type]
  }
  throw new Error(`Invalid log type: ${type}`)
 }
}

export const logGraphTypes = [
 {
  name: 'Production Total (m)',
  key: 'production_total'
 },
 {
  name: 'Production Rate (m/hr)',
  key: 'productionRate'
 }
]
