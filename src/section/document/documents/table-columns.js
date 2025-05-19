
export const tableColumns = [
    { id: '_id', label: 'ID', searchable: true },
    { id: 'displayName', label: 'Name', alwaysShow: true, checked: true },
    { id: 'referenceNumber', label: 'Ref. No.', alwaysShow: true, checked: true, searchable: true },
    { id: 'stockNumber', label: 'Stock No.', checked: true, searchable: true },
    { id: 'docCategory.name', label: 'Category', checked: true, searchable: true },
    { id: 'docType.name', label: 'Type', checked: true, searchable: true },
    { id: 'documentVersions[0].versionNo', label: 'Version', checked: true, align: 'right' },
    { id: 'isActive', label: 'active', checked: false, align: 'center' },
    { id: 'createdAt', label: 'created at', checked: false, align: "right" },
]

export const drawingTableColumns = [
    { id: 'document._id', label: 'ID', searchable: true },
    { id: 'document.displayName', label: 'Name', alwaysShow: true, checked: true },
    { id: 'document.referenceNumber', label: 'Ref. No.', alwaysShow: true, checked: true, searchable: true },
    { id: 'document.stockNumber', label: 'Stock No.', checked: true, searchable: true },
    { id: 'documentCategory.name', label: 'Category', checked: true, searchable: true },
    { id: 'documentType.name', label: 'Type', checked: true, searchable: true },
    // { id: 'documentVersions[0].versionNo', label: 'Version', checked: true, align: 'right' },
    { id: 'document.isActive', label: 'active', checked: false, align: 'center' },
    { id: 'createdAt', label: 'created at', checked: false, align: "right" },
]