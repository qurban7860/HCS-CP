import { useMemo } from 'react'
import { fDate, parseAddress } from 'util'

export default function useMachineDefaultValues(machineData, customer, site, softwareVersion) {
   /**
    * we need a flag that should set as a the day when the customer renewed the
    * portal/cloud license, right now we only have one date for this whichis the supportDateExpiry;
    *
    * it cannot be the createdAt, but for the sake of showing it. I will set it up to this date.
    *
    */
   const newDate = new Date()
   newDate.setFullYear(newDate.getFullYear() + 5)
   const supportExpiry = machineData?.supportExpireDate ===  '' || machineData?.supportExpireDate === null ? fDate(newDate) : fDate(machineData?.supportExpireDate)

 return useMemo(() => {
  return {
   id                      : machineData?._id || '',
   serialNo                : machineData?.serialNo || '',
   name                    : machineData?.name || '',
   description             : machineData?.description || '',
   alias                   : machineData?.alias || [],
   profile                 : machineData?.profile?.default?.size || '',
   profiles                : machineData?.machineProfiles || [],
   parentSerialNo          : machineData?.parentMachine || '',
   previousMachine         : machineData?.parentMachine?.name || '',
   supplier                : machineData?.supplier?.name || '',
   category                : machineData?.machineModel?.category || '',
   machineModel            : machineData?.machineModel?.name || '',
   customer                : machineData?.customer?.name || '',
   customerId              : machineData?.customer?._id || '',
   customerCountry         : customer?.mainSite?.address?.country || '',
   clientCode              : machineData?.customer?.clientCode || '',
   financialCompany        : machineData?.financialCompany?.name || '',
   parentConnection        : machineData?.parentMachines || [],
   machineConnection       : machineData?.machineConnections || [],
   transferredHistory      : machineData?.transferredHistory || [],
   transferredMachine      : machineData?.transferredToMachine?.serialNo || '',
   transferredCustomer     : machineData?.transferredToMachine?.customer?.name || '',
   status                  : machineData?.status?.name || '',
   hlc                     : softwareVersion && softwareVersion.hlc || '',
   plc                     : softwareVersion && softwareVersion.plc || '',
   workOrderRef            : machineData?.workOrderRef || '',
   installationObj         : machineData?.instalationSite || '',
   installationSite        : parseAddress(machineData?.instalationSite?.address) || '',
   installationSiteId      : machineData?.instalationSite?._id || '',
   billingSiteObj          : machineData?.billingSite || '',
   billingSite             : parseAddress(machineData?.billingSite?.address) || '',
   mainSiteName            : customer?.mainSite?.name || '',
   mainSiteLat             : site?.lat || '',
   mainSiteLong            : site?.long || '',
   mainSitePhone           : customer?.mainSite?.phoneNumbers || '',
   mainSiteAddress         : parseAddress(customer?.mainSite?.address) || '',
   mainSiteStreet          : customer?.mainSite?.address?.street || '',
   mainSiteSuburb          : customer?.mainSite?.address?.suburb || '',
   mainSiteCity            : customer?.mainSite?.address?.city || '',
   mainSiteRegion          : customer?.mainSite?.address?.region || '',
   mainSiteCountry         : customer?.mainSite?.address?.country || '',
   installationSiteName    : machineData?.instalationSite?.name || '',
   installationSiteStreet  : machineData?.instalationSite?.address?.street || '',
   installationSiteSuburb  : machineData?.instalationSite?.address?.suburb || '',
   installationSitePostCode: machineData?.instalationSite?.address?.postCode || '',
   installationSiteCity    : machineData?.instalationSite?.address?.city || '',
   installationSiteRegion  : machineData?.instalationSite?.address?.region || '',
   installationSiteState   : machineData?.instalationSite?.address?.state || '',
   installationSiteCountry : machineData?.instalationSite?.address?.country || '',
   billingSiteCountry      : machineData?.billingSite?.address?.country || '',
   installationSiteLat     : machineData?.instalationSite?.lat || '',
   installationSiteLong    : machineData?.instalationSite?.long || '',
   billingSiteName         : machineData?.billingSite?.name || '',
   billingSiteLat          : machineData?.billingSite?.lat || '',
   billingSiteLong         : machineData?.billingSite?.long || '',
   isPortalSynced          : machineData?.machineIntegrationSyncStatus?.syncStatus || false,
   portalSyncedDate        : fDate(machineData?.machineIntegrationSyncStatus?.syncDate) || '',
   portalSyncIp            : machineData?.machineIntegrationSyncStatus?.syncIP || '',
   installationDate        : fDate(machineData?.installationDate) || '',
   manufactureDate         : fDate(machineData?.manufactureDate) || '',
   purchaseDate            : fDate(machineData?.purchaseDate) || '',
   transferredDate         : fDate(machineData?.transferredDate) || '',
   shippingDate            : fDate(machineData?.shippingDate) || '',
   landmark                : machineData?.siteMilestone || '',
   projectManager          : machineData?.projectManager || '',
   supportManager          : machineData?.supportManager || '',
   accountManager          : machineData?.accountManager || '',
   supportExpireDate       : supportExpiry,
   isActive                : machineData?.isActive || false,
   createdIP               : machineData?.createdIP || '',
   updatedIP               : machineData?.updatedIP || '',
   createdBy               : machineData?.createdBy?.name || '',
   updatedBy               : machineData?.updatedBy?.name || '',
   createdAt               : fDate(machineData?.createdAt) || '',
   updatedAt               : fDate(machineData?.updatedAt) || ''
  }
 }, [machineData])
}
