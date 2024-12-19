import { useEffect, memo, Fragment, useLayoutEffect } from 'react'
import { Trans } from 'react-i18next'
import debounce from 'lodash/debounce'
import { useParams } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { useSettingContext, useTempFilter, useTable, getComparator, useUIMorph } from 'hook'
import { getCustomer, setSelectedContactCard, resetContact, getContact, getContacts, ChangeContactPage, setContactFilterBy, resetSelectedContactCard, resetContacts } from 'store/slice'
import { useContactDefaultValues } from 'section/crm'
import { ContactCard, fieldsContactConfig } from 'section/crm/contact'
import { CommonFieldsCard } from 'section/common'
import { Grid, Typography } from '@mui/material'
import { DropdownDefault, AuditBox, CustomerDialog, SearchBox } from 'component'
import { GStyledScrollableHeightLockGrid } from 'theme/style'
import { MARGIN } from 'config'
import { KEY, TYPOGRAPHY, FLEX_DIR } from 'constant'

const ContactTab = () => {
 const { contact, contacts, initial, isLoading, selectedContactCard, fromDialog } = useSelector(state => state.contact)
 const { customer, customerDialog } = useSelector(state => state.customer)
 const { isDesktop, isMobile } = useUIMorph()
 const { id } = useParams()

 const { themeMode } = useSettingContext()
 const { order, orderBy } = useTable({
  defaultOrderBy: KEY.CREATED_AT,
  defaultOrder: 'asc'
 })

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (id !== customer?._id) {
    dispatch(getCustomer(id))
   }
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [id, dispatch])

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (id && !contacts.length) {
    dispatch(getContacts(id, customer?.isArchived))
   }
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [id, contacts, dispatch])

 const defaultValues = useContactDefaultValues(contact, customer)

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (contacts.length > 0 && !fromDialog) {
    dispatch(resetSelectedContactCard())
    dispatch(getContact(id, contacts[0]?._id))
    dispatch(setSelectedContactCard(contacts[0]?._id))
   }
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [contacts, fromDialog])

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (contacts.length > 0 && fromDialog) {
    dispatch(getContact(id, selectedContactCard))
    dispatch(setSelectedContactCard(selectedContactCard))
   }
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [contacts, fromDialog])

 useLayoutEffect(() => {
  dispatch(resetContact())
  dispatch(resetContacts())
 }, [])

 const { filterName, handleFilterName, filteredData } = useTempFilter(getComparator(order, orderBy), contacts, initial, ChangeContactPage, setContactFilterBy)

 const handleContactCard = (event, contactId) => {
  event.preventDefault()
  dispatch(setSelectedContactCard(contactId))
  dispatch(resetContact())
  dispatch(getContact(id, contactId))
 }

 const renderDesktopView = () =>
  filteredData.map((contact, index) => <ContactCard key={contact?._id} selectedCardId={selectedContactCard || index} value={defaultValues} handleContactCard={handleContactCard} c={contact} />)

 const renderMobileView = () => <DropdownDefault filteredData={contacts} selectedCard={selectedContactCard} i18nKey={'contact.contacts.label'} onChange={e => handleContactCard(e, e.target.value)} />

 const renderNoContacts = () => (
  <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.secondary' align='center' sx={{ mt: 2 }}>
   <Trans i18nKey='no_found.label' values={{ value: 'contact' }} />
  </Typography>
 )

 const renderList = () => {
  if (contacts?.length > 0) {
   return isDesktop ? renderDesktopView() : renderMobileView()
  } else {
   return renderNoContacts()
  }
 }

 return (
  <Fragment>
   <Grid container columnSpacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
    <Grid item xs={12} md={3}>
     <Grid container gap={2}>
      <Grid item xs={12} md={12}>
       {contacts.length >= 5 && (
        <Grid item xs={12}>
         <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} mt={0} />
        </Grid>
       )}
       <GStyledScrollableHeightLockGrid isMobile={isMobile} mode={themeMode} totalCount={contacts?.length}>
        <Grid container gap={2} p={1} height={'auto'} sx={{ maxHeight: 600, overflow: 'auto' }}>
         {renderList()}
        </Grid>
       </GStyledScrollableHeightLockGrid>
      </Grid>
     </Grid>
    </Grid>

    <Grid item xs={12} md={9}>
     <CommonFieldsCard defaultValues={defaultValues} fieldsConfig={fieldsContactConfig} isLoading={isLoading} withStatusIcon />
    </Grid>
   </Grid>
   <AuditBox value={defaultValues} />
   {customerDialog && <CustomerDialog />}
  </Fragment>
 )
}

export default memo(ContactTab)
