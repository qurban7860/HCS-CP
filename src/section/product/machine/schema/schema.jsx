import { useMemo } from 'react'
import { fDate, parseAddress } from 'util'

export default function machineSchema(machineData) {
  return useMemo(() => {
    return {
      serialNo: machineData?.serialNo || '',
      name: machineData?.name || '',
      description: machineData?.description || '',
      alias: machineData?.alias || [],
      profile: machineData?.profile?.default?.size || '',
      parentSerialNo: machineData?.parentMachine || '',
      previousMachine: machineData?.parentMachine?.name || '',
      supplier: machineData?.supplier?.name || '',
      category: machineData?.machineModel?.category || '',
      machineModel: machineData?.machineModel?.name || '',
      customer: machineData?.customer?.name || '',
      clientCode: machineData?.customer?.clientCode || '',
      financialCompany: machineData?.financialCompany?.name || '',
      machineConnection: machineData?.machineConnections || [],
      transferredHistory: machineData?.transferredHistory || [],
      transferredMachine: machineData?.transferredToMachine?.serialNo || '',
      transferredCustomer: machineData?.transferredToMachine?.customer?.name || '',
      status: machineData?.status?.name || '',
      workOrderRef: machineData?.workOrderRef || '',
      installationSite: parseAddress(machineData?.instalationSite?.address) || '',
      billingSite: parseAddress(machineData?.billingSite?.address) || '',
      installationSiteCountry: machineData?.instalationSite?.address?.country || '',
      billingSiteCountry: machineData?.billingSite?.address?.country || '',
      installationSiteLat: machineData?.instalationSite?.lat || '',
      installationSiteLong: machineData?.instalationSite?.long || '',
      billingSiteLat: machineData?.instalationSite?.lat || '',
      billingSiteLong: machineData?.instalationSite?.long || '',
      installationDate: fDate(machineData?.installationDate) || '',
      manufactureDate: fDate(machineData?.manufactureDate) || '',
      purchaseDate: fDate(machineData?.purchaseDate) || '',
      transferredDate: fDate(machineData?.transferredDate) || '',
      shippingDate: fDate(machineData?.shippingDate) || '',
      landmark: machineData?.siteMilestone || '',
      projectManager: machineData?.projectManager || '',
      supportManager: machineData?.supportManager || '',
      accountManager: machineData?.accountManager || '',
      supportExpireDate: fDate(machineData?.supportExpireDate) || null,
      description: machineData?.description || '',
      isActive: machineData?.isActive || false,
      createdIP: machineData?.createdIP || '',
      updatedIP: machineData?.updatedIP || '',
      createdBy: machineData?.createdBy?.name || '',
      updatedBy: machineData?.updatedBy?.name || '',
      createdAt: fDate(machineData?.createdAt) || '',
      updatedAt: fDate(machineData?.updatedAt) || ''
    }
  }, [machineData])
}
