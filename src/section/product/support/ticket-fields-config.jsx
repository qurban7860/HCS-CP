export const fieldsTicketBasicInfoConfig = [
 {
  type: 'supportDescription',
  key: 'descriptionContents',
  heading: 'description.label',
  value: defaultValues => defaultValues?.descriptionContents,
  gridSize: 12
 },
 {
  key: 'assigneeName',
  heading: 'assignee.label',
  value: defaultValues => defaultValues?.assigneeName,
  gridSize: 6
 },
 {
  key: 'reporterName',
  heading: 'reporter.label',
  value: defaultValues => defaultValues?.reporterName,
  gridSize: 6
 }
]

export const fieldsTicketQuickSpecsConfig = [
 {
  type: 'titleWithDividers',
  key: 'quickSpecs',
  title: 'quick_spec.quick_specs.label'
 },
 {
  key: 'plcVersion',
  heading: 'plc_version.label',
  value: defaultValues => defaultValues?.plcVersion,
  gridSize: 6
 },
 {
  key: 'hmiVersion',
  heading: 'hmi_version.label',
  value: defaultValues => defaultValues?.hmiVersion,
  gridSize: 6
 }
]
