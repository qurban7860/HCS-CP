import { useEffect, memo, Fragment, useLayoutEffect, useState } from 'react'
import { Trans } from 'react-i18next'
import { t } from 'i18next'
import debounce from 'lodash/debounce'
import { useParams } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { useSettingContext, useTempFilter, useTable, getComparator, useUIMorph, snack, Icon, ICON_NAME } from 'hook'
import {
  getCustomer,
  setSelectedContactCard,
  setUserInviteDialog,
  resetContact,
  getContact,
  getContacts,
  ChangeContactPage,
  setContactFilterBy,
  setContactFormVisibility,
  resetSelectedContactCard,
  resetContacts,
  getCustomerRoles,
  addAndInviteSecurityUser,
  resetUserInvite,
  resetUserInvites,
  getUserInviteByEmail
} from 'store/slice'
import { ContactCard, fieldsContactConfig } from 'section/crm/contact'
import { useContactDefaultValues } from 'section/crm'
import { CommonFieldsCard } from 'section/common'
import { useTheme, Grid, Typography } from '@mui/material'
import { DropdownDefault, AuditBox, CustomerDialog, SearchBox, UserInviteSuccessDialog } from 'component'
import { GStyledScrollableHeightLockGrid, GStyledStickyGrid, GStyledLoadingButton, GStyledIconLoadingButton } from 'theme/style'
import { delay } from 'util'
import { ICON, MARGIN, NAV, SPACING } from 'config/layout'
import { KEY, TYPOGRAPHY, FLEX_DIR, INVITATION_STATUS } from 'constant'
import ContactAddForm from './contact-add-form'


const ContactTab = () => {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false)
  const { contact, contacts, initial, isLoading, selectedContactCard, fromDialog, contactFormVisibility } = useSelector(state => state.contact)
  const { customer, customerDialog } = useSelector(state => state.customer)
  const { securityUsers, userInviteDialog, userInviteContactDetails, userInvite } = useSelector(state => state.user)
  const { customerRoles } = useSelector(state => state.role)
  const isUserInvitePending = userInvite ? userInvite?.some(invite => invite.invitationStatus === INVITATION_STATUS.PENDING) : false

  const { isDesktop, isMobile } = useUIMorph()
  const { id } = useParams()
  const { themeMode } = useSettingContext()
  const { order, orderBy } = useTable({ defaultOrderBy: KEY.CREATED_AT, defaultOrder: 'asc' })
  const theme = useTheme()

  useEffect(() => {
    const debounceFetch = debounce(() => {
      if (id !== customer?._id) {
        dispatch(getCustomer(id))
      }
    }, 300)
    debounceFetch()
    return () => debounceFetch.cancel();
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
        const firstContact = contacts[0];
        if (firstContact) {
          dispatch(resetSelectedContactCard());
          dispatch(getContact(id, firstContact?._id));
          dispatch(setSelectedContactCard(firstContact?._id));
        }
      }
    }, 300);
    debounceFetch();
    return () => debounceFetch.cancel();
  }, [contacts, fromDialog, dispatch, id]);

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
      if (contacts.length > 0 && fromDialog && selectedContactCard) {
        dispatch(getContact(id, selectedContactCard))
        dispatch(setSelectedContactCard(selectedContactCard))
      }
    }, 300)
    debounceFetch()
    return () => debounceFetch.cancel()
  }, [contacts, fromDialog, selectedContactCard, dispatch, id])

  useLayoutEffect(() => {
    dispatch(resetContact())
    dispatch(resetContacts())
    dispatch(resetUserInvite())
    dispatch(setUserInviteDialog(false))
    dispatch(resetUserInvites())
  }, [dispatch])

  const { filterName, handleFilterName, filteredData } = useTempFilter(
    getComparator(order, orderBy),
    contacts,
    initial,
    ChangeContactPage,
    setContactFilterBy
  );

  const handleContactCard = (event, contactId) => {
    event.preventDefault()
    dispatch(setSelectedContactCard(contactId))
    dispatch(resetContact())
    dispatch(getContact(id, contactId))
  }

  const userData = {
    customer: customer,
    contact: contact,
    name: `${contact?.firstName} ${contact?.lastName}`,
    email: contact?.email,
    phone: contact?.phone,
    password: '',
    isInvite: true,
    isActive: true,
  };

  const handleSwitchLayout = () => {
    delay(200).then(() => dispatch(setContactFormVisibility(!contactFormVisibility)))
  }

  const handleOpenConfirmDialog = async () => {
    await dispatch(setUserInviteDialog(true))
  }

  const handleAddAndSendUserInvite = async () => {
    setIsConfirming(true)
    const customerUserRole = customerRoles.find(role => role?.name === KEY.CUSTOMER_USER)
    const updateUserData = !userInviteContactDetails?.roles?.length ? { ...userData, roles: [customerUserRole] } : userInviteContactDetails
    const response = await dispatch(addAndInviteSecurityUser(updateUserData))
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
    filteredData.map((contact) => (
      <ContactCard
        key={contact?._id}
        selectedCardId={selectedContactCard}
        value={defaultValues}
        handleContactCard={handleContactCard}
        c={contact}
      />
    ));

  const renderMobileView = () => (
    <DropdownDefault
      filteredData={contacts}
      selectedCard={selectedContactCard}
      i18nKey={'contact.contacts.label'}
      onChange={(e) => handleContactCard(e, e.target.value)}
    />
  );

  const renderNoContacts = () => (
    <Typography
      variant={TYPOGRAPHY.OVERLINE1}
      color="text.secondary"
      align="center"
      sx={{ mt: 2 }}
    >
      <Trans i18nKey="no_found.label" values={{ value: 'contact' }} />
    </Typography>
  )

  const renderList = () => {
    if (filteredData?.length > 0) {
      return isDesktop ? renderDesktopView() : renderMobileView();
    } else {
      return renderNoContacts()
    }
  };

  const contactHasActiveUser = securityUsers?.some(user => user.email === contact?.email && user.isActive)

  return (
    <Fragment>
      <Fragment>
        <Grid container columnSpacing={SPACING.COLUMN_SPACING} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
          <GStyledStickyGrid item xs={12} md={3}>
            {contacts.length >= 5 && (
              <Grid item xs={12}>
                <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} increasedFilterSize mt={0} />
              </Grid>
            )}
            <GStyledScrollableHeightLockGrid isMobile={isMobile} mode={themeMode} totalCount={contacts?.length}>
              <Grid container gap={2} p={1} height={'auto'} sx={{ maxHeight: NAV.H_MAX_SIDE_PANEL, overflow: 'auto', mt: 1, mb: 2 }}>
                {renderList()}
              </Grid>
            </GStyledScrollableHeightLockGrid>
            {!contactFormVisibility && (
              <Grid item xs={12} display={'flex'} justifyContent={'right'} mt={2}>
                <GStyledIconLoadingButton
                  loading={isLoading}
                  bgColor={contactFormVisibility ? theme.palette.howick.orange : theme.palette.howick.darkBlue}
                  textColor={contactFormVisibility ? theme.palette.common.black : theme.palette.common.white}
                  type={'button'}
                  variant={KEY.CONTAINED}
                  mode={themeMode}
                  onClick={handleSwitchLayout}
                  sx={{ transition: 'ease-in-out width 0.3s' }}
                >
                  <Fragment>
                    <Icon icon={ICON_NAME.ADD} sx={{ ...ICON.SIZE_XS }} />{' '}
                    {t('add_new_contact.label').toUpperCase()}
                  </Fragment>
                </GStyledIconLoadingButton>
              </Grid>
            )}
          </GStyledStickyGrid>
          <Grid item xs={12} md={9} sx={{ transition: 'ease-in-out width 0.3s' }}>
            {contactFormVisibility ? (
              <ContactAddForm />
            ) : (
              <CommonFieldsCard
                defaultValues={defaultValues}
                fieldsConfig={fieldsContactConfig}
                isLoading={isLoading}
                contactHasActiveUser={contactHasActiveUser}
                handleUserInvite={handleOpenConfirmDialog}
                isUserInvitePending={isUserInvitePending}
                withStatusIcon
                isContactsPage
              />
            )}
          </Grid>
        </Grid>
        {!contactFormVisibility && <AuditBox value={defaultValues} />}
      </Fragment>
      {customerDialog && <CustomerDialog />}
      {userInviteDialog && (
        <UserInviteSuccessDialog
          setIsConfirming={setIsConfirming}
          isSubmitSuccessful={isSubmitSuccessful}
          onConfirm={handleAddAndSendUserInvite}
          isLoading={isConfirming}
          userData={userData}
          title={t('invitation_portal_access.label')}
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