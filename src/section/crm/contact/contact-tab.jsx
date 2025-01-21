import { useEffect, memo, Fragment, useLayoutEffect, useState } from 'react'
import { Trans } from 'react-i18next'
import { t } from 'i18next'
import debounce from 'lodash/debounce'
import { useParams } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { useSettingContext, useTempFilter, useTable, getComparator, useUIMorph, snack } from 'hook'
import { getCustomer, setSelectedContactCard, setUserInviteDialog, resetContact, getContact, getContacts, ChangeContactPage, setContactFilterBy, resetSelectedContactCard, resetContacts, getCustomerRoles, addAndInviteSecurityUser } from 'store/slice'
import { ContactCard, fieldsContactConfig } from 'section/crm/contact'
import { useContactDefaultValues } from 'section/crm'
import { CommonFieldsCard } from 'section/common'
import { Grid, Typography } from '@mui/material'
import { DropdownDefault, AuditBox, CustomerDialog, SearchBox, UserInviteSuccessDialog } from 'component'
import { GStyledScrollableHeightLockGrid, GStyledStickyGrid, GStyledLoadingButton } from 'theme/style'
import { MARGIN, NAV, SPACING } from 'config/layout'
import { KEY, TYPOGRAPHY, FLEX_DIR } from 'constant'

const ContactTab = () => {
const [isConfirming, setIsConfirming]                                            = useState(false)
const [isSubmitSuccessful, setIsSubmitSuccessful]                                = useState(false)
const { contact, contacts, initial, isLoading, selectedContactCard, fromDialog } = useSelector(state => state.contact)
const { customer, customerDialog }                                               = useSelector(state => state.customer)
const { securityUsers, userInviteDialog, userInviteContactDetails }              = useSelector(state => state.user)
const { customerRoles }                                                          = useSelector(state => state.role)

 const { isDesktop, isMobile } = useUIMorph()
 const { id }                  = useParams()
 const { themeMode }           = useSettingContext()
 const { order, orderBy }      = useTable({
                                            defaultOrderBy: KEY.CREATED_AT,
                                            defaultOrder  : 'asc'
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
   if (!customerRoles.length) {
    dispatch(getCustomerRoles())
   }
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [customerRoles, dispatch])

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
  dispatch(setUserInviteDialog(false))
 }, [])

 const { filterName, handleFilterName, filteredData } = useTempFilter(getComparator(order, orderBy), contacts, initial, ChangeContactPage, setContactFilterBy)

 const handleContactCard = (event, contactId) => {
  event.preventDefault()
  dispatch(setSelectedContactCard(contactId))
  dispatch(resetContact())
  dispatch(getContact(id, contactId))
 }

// handle add this contact as a user via invite user then send invite
// click the button that opens up the confirmation dialog (success card?)
// close the confirm dialog then sends an invite via the id generated

// params neaded: customerId, contactId, fullName, email, roles (a dropdown to select), isActive

const userData = {
    customer  : customer,
    contact   : contact,
    name      : `${contact?.firstName} ${contact?.lastName}`,
    email     : contact?.email,
    phone     : contact?.phone,
    password  : '',
    isInvite  : true,
    isActive  : true,
}

const handleOpenConfirmDialog = async () => {
    await dispatch(setUserInviteDialog(true))
}

 const handleAddAndSendUserInvite = async () => {
    // get the id of the recently added user
    setIsConfirming(true)
    const customerUserRole = customerRoles.find((role) => role?.name === KEY.CUSTOMER_USER)
    const updateUserData = !userInviteContactDetails?.roles?.length ? { ...userData, roles: [customerUserRole] } : userInviteContactDetails
    const response = await dispatch(addAndInviteSecurityUser(updateUserData))
    console.log(' updateUserData', updateUserData)
    // check if the response is successful
    if (!response.status >= 200 && response.status < 300) {
        snack('Error occured', { variant: 'error' })
        setIsConfirming(false)
        return
    }
    setIsSubmitSuccessful(true)
    setUserInviteDialog(false)
    setIsConfirming(false)
    snack(t('invite_sent.label'), { variant: 'success' })
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

 const contactHasActiveUser = securityUsers?.some(user => user.email === contact?.email && user.isActive)

 return (
  <Fragment>
   <Grid container columnSpacing={SPACING.COLUMN_SPACING} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
    <GStyledStickyGrid item xs={12} md={3}>
     {contacts.length >= 5 && (
      <Grid item xs={12}>
       <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} mt={0} />
      </Grid>
     )}
     <GStyledScrollableHeightLockGrid isMobile={isMobile} mode={themeMode} totalCount={contacts?.length}>
      <Grid container gap={2} p={1} height={'auto'} sx={{ maxHeight: NAV.H_MAX_SIDE_PANEL, overflow: 'auto' }}>
       {renderList()}
      </Grid>
     </GStyledScrollableHeightLockGrid>
    </GStyledStickyGrid>

    <Grid item xs={12} md={9}>
     <CommonFieldsCard defaultValues={defaultValues} fieldsConfig={fieldsContactConfig} isLoading={isLoading} contactHasActiveUser={contactHasActiveUser} handleUserInvite={handleOpenConfirmDialog}  withStatusIcon isContactsPage />
    </Grid>
   </Grid>
   <AuditBox value={defaultValues} />
   {customerDialog && <CustomerDialog />}
   {userInviteDialog && (
     <UserInviteSuccessDialog
      setIsConfirming={setIsConfirming}
      isSubmitSuccessful={isSubmitSuccessful}
      onConfirm={handleAddAndSendUserInvite}
      isLoading={isConfirming}
      userData={userData}
      title={'Invitation for Portal Access'}
      enableRoleDropdown
      action={
       <GStyledLoadingButton loading={isConfirming} color={KEY.INHERIT} type={'button'} variant={KEY.CONTAINED} mode={themeMode}>
        {t('confirm.label').toUpperCase()}
       </GStyledLoadingButton>
      }
     />
    )}
  </Fragment>
 )
}

export default memo(ContactTab)
