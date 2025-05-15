import { useMemo } from 'react'
import { fDate } from 'util'

export function useDefaultValues({ document }) {
    return useMemo(() => {
        return {
            displayName: document?.displayName || '',
            docCategory: document?.docCategory?.name || '',
            docType: document?.docType?.name || '',
            referenceNumber: document?.referenceNumber || '',
            stockNumber: document?.stockNumber || '',
            customerAccess: document?.customerAccess,
            isActiveVersion: document?.isActiveVersion,
            versionPrefix: document?.versionPrefix || '',
            version: document?.documentVersions?.[0]?.versionNo ?? '',
            description: document?.description,
            files: document?.documentVersions?.[0]?.files || [],
            createdAt: fDate(document?.createdAt) || '',
            createdByFullName: document?.createdBy?.name || '',
            createdIP: document?.createdIP || '',
            updatedAt: fDate(document?.updatedAt) || '',
            updatedByFullName: document?.updatedBy?.name || '',
            updatedIP: document?.updatedIP || '',
        }
    }, [document])
}

