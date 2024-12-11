import { useEffect, memo, Fragment, useLayoutEffect } from 'react'
import { Trans } from 'react-i18next'
import debounce from 'lodash/debounce'
import { useParams } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { useSettingContext, useFilter, useTable, getComparator } from 'hook'
import { getCustomer, setSelectedContactCard, resetContact, getContact, getContacts, ChangeContactPage, setContactFilterBy, resetSelectedContactCard, resetContacts } from 'store/slice'
import { useContactDefaultValues } from 'section/crm'
import { ContactCard, fieldsContactConfig } from 'section/crm/contact'
import { CommonFieldsCard } from 'section/common'
import { useMediaQuery, Grid, Typography } from '@mui/material'
import { DropdownDefault, AuditBox, CustomerDialog, SearchBox } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledScrollableHeightLockGrid } from 'theme/style'
import { MARGIN } from 'config'
import { KEY, TYPOGRAPHY, FLEX_DIR } from 'constant'

const ContactTab = () => {
 const { contact, contacts, initial, isLoading, selectedContactCard, fromDialog } = useSelector(state => state.contact)
 const { customer, customerDialog } = useSelector(state => state.customer)
 const { id } = useParams()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

 const { themeMode } = useSettingContext()
 const { order, orderBy } = useTable({
  defaultOrderBy: KEY.CREATED_AT,
  defaultOrder: KEY.DESC
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
 }, [dispatch, contacts])

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (contacts.length > 0 && fromDialog) {
    dispatch(getContact(id, selectedContactCard))
    dispatch(setSelectedContactCard(selectedContactCard))
   }
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [dispatch, contacts])

 const { filterName, handleFilterName, filteredData } = useFilter(getComparator(order, orderBy), contacts, initial, ChangeContactPage, setContactFilterBy)

 const handleContactCard = (event, contactId) => {
  event.preventDefault()
  dispatch(setSelectedContactCard(contactId))
  dispatch(resetContact())
  dispatch(getContact(id, contactId))
 }

 const renderDesktopView = () =>
  filteredData.map((contact, index) => <ContactCard key={contact?._id} selectedCardId={selectedContactCard || index} value={defaultValues} handleContactCard={handleContactCard} c={contact} />)

 const renderMobileView = () => (
  <DropdownDefault filteredData={filteredData} selectedCard={selectedContactCard} i18nKey={'contact.contacts.label'} onChange={e => handleContactCard(e, e.target.value)} />
 )

 const renderNoContacts = () => (
  <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.secondary' align='center' sx={{ mt: 2 }}>
   <Trans i18nKey='no_found.label' values={{ value: 'contact' }} />
  </Typography>
 )

 const renderContent = () => {
  if (contacts?.length > 0) {
   return isDesktop ? renderDesktopView() : renderMobileView()
  } else {
   return renderNoContacts()
  }
 }

 useLayoutEffect(() => {
  dispatch(resetContact())
  dispatch(resetContacts())
 }, [])

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
       <GStyledScrollableHeightLockGrid mode={themeMode} totalCount={contacts?.length}>
        <Grid container gap={2} p={1} height={isDesktop ? 100 : 'auto'}>
         {renderContent()}
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
