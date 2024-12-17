import { fDate } from 'util/format'

// filter properties pool shorthand
export const filterProperties = [
 // default
 'name',
 'createdAt',
 'instalationSite.name',
 'installationDate',
 'shippingDate',
 // machine
 'serialNo',
 'machineModel.name',
 // document
 'displayName',
 'machine.serialNo',
 'docType.name',
 'docCategory.name',
 'techParamValue',
 'techParam.code',
 // customer
 'status.name',
 'customer.name',
 'tradingName',
 'mainSite.address.suburb',
 'mainSite.address.street',
 'mainSite.address.city',
 'mainSite.address.country',
 'city',
 // contact
 'firstName',
 'lastName',
 // security
 'email',
 'phone',
 'roles'
]

// filter func pool for special cases and nested properties | will be working on to improve this later
/**
 *
 * @param {string[]} inputSub - input array
 * @param {string} filterName - filter string
 * @returns
 */
export const moduleFilter = (inputSub, filterName) => {
 // eslint-disable-next-line no-unused-vars
 const hello = 'something to write'

 return inputSub?.filter(
  filterParams =>
   filterParams?.name?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.serialNo?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.category?.name.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.machineModel?.name?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.status?.name?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.customer?.name?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.instalationSite?.name?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.instalationSite?.street?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.instalationSite?.city?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.instalationSite?.country?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   // customer
   filterParams?.tradingName?.some(tName => tName.toLowerCase().indexOf(filterName.toLowerCase()) >= 0) ||
   //  contact
   filterParams?.firstName?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.lastName?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.mainSite?.address?.street?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.mainSite?.address?.suburb?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.mainSite?.address?.city?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.mainSite?.address?.country?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   // security
   filterParams?.email?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.phone?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   //  `${filterParams?.roles?.map(obj => obj.name)}`?.join(', ').toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   //  techparam
   filterParams?.techParamValue?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.techParam?.category?.name?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.techParam?.code?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.techParam?.name?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.contactName?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   // documents
   filterParams?.displayName?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.docType?.name?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.docCategory?.name?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   `${filterParams?.documentVersions?.map(obj => obj.versionNo)}`.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.roles
    ?.map(obj => obj.name)
    .join(', ')
    .toLowerCase()
    .indexOf(filterName.toLowerCase()) >= 0 ||
   fDate(filterParams?.createdAt)?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   fDate(filterParams?.installationDate)?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   fDate(filterParams?.shippingDate)?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   // support
   filterParams?.id?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.key?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.expand?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.fields?.customfield_10078?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.fields?.customfield_10069?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.fields?.customfield_10070?.value?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   fDate(filterParams?.fields?.created)?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.fields?.summary?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0 ||
   filterParams?.fields?.status?.name?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0
 )
}
