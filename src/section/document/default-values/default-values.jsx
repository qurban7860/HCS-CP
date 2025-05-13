import { useMemo } from 'react'
import { fDate } from 'util'

export function useDefaultValues({ customer, machine, document }) {
    return useMemo(() => {
        return {
            customer: customer || null,
            machine: machine && machine?._id || null,
            displayName: document?.displayName || '',
            documentName: document?.documentName?.name || '',
            documentCategory: document?.docCategory?.name || '',
            documentType: document?.docType?.name || '',
            referenceNumber: document?.referenceNumber || '',
            stockNumber: document?.stockNumber || '',
            customerAccess: document?.customerAccess,
            isActiveVersion: document?.isActiveVersion,
            documentVersion: document?.documentVersions?.[0]?.versionNo ?? '',
            documentVersionLength: document?.documentVersions?.length > 1,
            versionPrefix: document?.versionPrefix || '',
            description: document?.description,
            files: document?.files || [],
            isActive: document?.isActive,
            createdAt: fDate(document?.createdAt) || '',
            createdByFullName: document?.createdBy?.name || '',
            createdIP: document?.createdIP || '',
            updatedAt: fDate(document?.updatedAt) || '',
            updatedByFullName: document?.updatedBy?.name || '',
            updatedIP: document?.updatedIP || '',
        }
    }, [customer, machine, document])
}

