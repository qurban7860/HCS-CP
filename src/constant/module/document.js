export const allowedImageExtensions = ['png', 'jpeg', 'jpg', 'gif', 'bmp', 'webp']
export const allowedDocumentExtension = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']
export const document = {
  icon: {
    pdf: 'bxs:file-pdf',
    doc: 'mdi:file-word',
    docx: 'mdi:file-word',
    xls: 'mdi:file-excel',
    xlsx: 'mdi:file-excel',
    ppt: 'mdi:file-powerpoint',
    pptx: 'mdi:file-powerpoint',
    img: 'mdi:file-image',
  },
  color: {
    pdf: '#f44336',
    doc: '#448aff',
    docx: '#448aff',
    xls: '#388e3c',
    xlsx: '#388e3c',
    ppt: '#e65100',
    pptx: '#e65100',
    img: '#0f8c20',
  },
}

export const fileTypesArray = [
  'png',
  'jpeg',
  'jpg',
  'gif',
  'bmp',
  'webp',
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
]

export const fileTypesMessage = `
Only the following formats are accepted:
.png,
.jpeg,
.jpg,
.gif,
.bmp,
.webp,
.pdf,
.doc,
.docx,
.xls,
.xlsx,
.ppt,
.pptx
`

export const allowedExtensions = [
  'png',
  'jpeg',
  'jpg',
  'gif',
  'bmp',
  'webp',
  'djvu',
  'heic',
  'heif',
  'ico',
  'jfif',
  'jp2',
  'jpe',
  'jpeg',
  'jpg',
  'jps',
  'mng',
  'nef',
  'nrw',
  'orf',
  'pam',
  'pbm',
  'pcd',
  'pcx',
  'pef',
  'pes',
  'pfm',
  'pgm',
  'picon',
  'pict',
  'png',
  'pnm',
  'ppm',
  'psd',
  'raf',
  'ras',
  'rw2',
  'sfw',
  'sgi',
  'svg',
  'tga',
  'tiff',
  'psd',
  'jxr',
  'wbmp',
  'x3f',
  'xbm',
  'xcf',
  'xpm',
  'xwd',
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'csv',
  'txt',
  'odp',
  'ods',
  'odt',
  'ott',
  'rtf',
  'txt',
  'json',
  'xlsm',
]

// NOTE: These are the constants for the document upload radio buttons for adding a document

// Values for the radio buttons
export const DocRadioValue = {
  new: 'new',
  newVersion: 'newVersion',
  existing: 'existingVersion',

  // documentAddForm in documents
  customer: 'customer',
  machine: 'machine',
}
// Labels for the radio buttons
export const DocRadioLabel = {
  new: 'New Document',
  existing: 'Upload New File Against Existing Document',
  newVersion: 'New Version',
  currentVersion: 'Current Version',

  // documentAddForm in documents
  customer: 'Customer',
  machine: 'Machine',
}
// Radio button options - 'DocRadioLabel & DocRadioValue are confusing, so I have separted them'
export const DocRadioNewVersion = {
  value: 'newVersion',
  label: 'New Version',
}

export const DocRadioNewDocument = {
  value: 'new',
  label: 'New Document',
}

export const DocRadioExistingDocument = {
  value: 'existingVersion',
  label: 'Upload New File Against Existing Document',
  currLabel: 'Current Version',
}

// Snackbars constants
export const Snacks = {
  docSaved: 'Document Upload Successfully!',
  docUpdated: 'Document Update Successfully!',
  docVersionUpdated: 'Document Version Update Successfully!',
  failedSaveDoc: 'Failed to Save the Document',

  // @root - DocumentCategoryAddForm - documents dashboard
  addedDocCategory: 'Document Category ADD Successfully!', // Add Success message
  updatedDocCategory: 'Document Category Update Successfully!', // Update Success message
  deletedDocCategory: 'Document Category Delete Successfully!', // Delete Success message
  failedSaveDocCategory: 'Failed to Save Document Category', // Add Failed message

  // @root - DocumentAddForm - machine documents
  addedMachineDoc: 'Machine Document Upload Successfully!', // Upload Success message
  updatedMachineDoc: 'Machine Document Update Successfully!', // Update Success message
  updatedVersionMachineDoc: 'Machine Document Version Update Successfully!', // Update Success message
  deletedMachineDoc: 'Machine Document Delete Successfully!', // Delete Success message

  addedDoc: 'Document Uploaded Successfully!', // Upload Success message
  updatedDoc: 'Document Update Successfully!', // Update Success message
  deletedDoc: 'Document Deleted Successfully!', // Delete Success message

  failedDoc: 'Failed to Upload Document', // Update Failed message
  failedUpdateDoc: 'Failed to Update Document', // Update Failed message
  failedDeleteDoc: 'Failed to Delete Document', // Delete Failed message

  addedDrawing: 'Drawing Uploaded Successfully!', // Upload Success message
  updatedDrawing: 'Drawing Update Successfully!', // Update Success message
  deletedDrawing: 'Drawing Deleted Successfully!', // Delete Success message

  failedDrawing: 'Failed to Upload Drawing', // Update Failed message
  failedUpdateDrawing: 'Failed to Update Drawing', // Update Failed message
  failedDeleteDrawing: 'Failed to Deleted Drawing', // Delete Failed message

  // documentAddForm -documents dashboard
  fileRequired: 'File is required',
  fileMaxSize: 'File size should be less than 10MB',
  fileMaxCount: 'Maximum 20 files can be uploaded at a time.',
  docMaxSize: 'Document Name must not exceed 40 characters',

  // @root - DocumentViewForm - documents dashboard
  // preview
  UNEXPECTED: 'Unexpected error occurred',
  DOC_REQUIRED: 'File is required',
}

// @root - DocumentViewForm - documents dashboard
export const FORMLABELS = {}
