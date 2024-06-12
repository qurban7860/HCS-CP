import { useEffect, memo } from 'react'
import { useParams } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { useSettingContext, useFilter, useTable, getComparator } from 'hook'
import {
  getCustomer,
  setSelectedContactCard,
  resetContact,
  getContact,
  getContacts,
  ChangeContactPage,
  setContactFilterBy,
  setFromDialog,
  resetSelectedContactCard
} from 'store/slice'
import { contactDefaultValues } from 'section/crm'
import { Divider, Grid, Card, Typography } from '@mui/material'
import { GCardOption, GStyledTopBorderDivider, GStyledFlexEndBox } from 'theme/style'
import { MotionLazyContainer, GridViewTitle, GridViewField, AuditBox, CustomerDialog, SearchBox } from 'component'
import { ContactCard } from 'section/crm/contact'
import { MARGIN } from 'config'
import { KEY, TITLE, FLEX, TYPOGRAPHY, VIEW_FORM, FLEX_DIR, LABEL, VARIANT, ADDRESS } from 'constant'

const ContactTab = () => {
  const { id } = useParams()
  const { contact, contacts, initial, isLoading, selectedContactCard, fromDialog } = useSelector((state) => state.contact)
  const { customer, customerDialog } = useSelector((state) => state.customer)

  const { themeMode } = useSettingContext()
  const { order, orderBy } = useTable({
    defaultOrderBy: KEY.CREATED_AT,
    defaultOrder: KEY.DESC
  })

  useEffect(() => {
    if (id) {
      dispatch(getCustomer(id))
      dispatch(getContacts(id, customer?.isArchived))
    }
  }, [id, dispatch])

  const defaultValues = contactDefaultValues(contact, customer)

  useEffect(() => {
    if (contacts.length > 0 && !fromDialog) {
      dispatch(resetSelectedContactCard())
      dispatch(getContact(id, contacts[0]?._id))
      dispatch(setSelectedContactCard(contacts[0]?._id))
    }
  }, [dispatch, contacts])

  useEffect(() => {
    if (contacts.length > 0 && fromDialog) {
      dispatch(getContact(id, selectedContactCard))
      dispatch(setSelectedContactCard(selectedContactCard))
    }
  }, [dispatch, contacts])

  const { filterName, handleFilterName, filteredData } = useFilter(
    getComparator(order, orderBy),
    contacts,
    initial,
    ChangeContactPage,
    setContactFilterBy
  )

  const handleContactCard = (event, contactId) => {
    event.preventDefault()
    dispatch(setSelectedContactCard(contactId))
    dispatch(resetContact())
    dispatch(getContact(id, contactId))
  }

  return (
    <MotionLazyContainer display={FLEX.FLEX}>
      {/*  TODO: Make responsive */}
      <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
        <Grid item xs={12} sm={3} sx={{ height: '600px', overflow: KEY.AUTO, scrollBehavior: 'smooth' }}>
          <Grid container mb={2}>
            <Grid item lg={12} sm={12} mb={2}>
              {contacts.length >= 5 && (
                <Grid item sm={12} pb={2}>
                  <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} mt={0} />
                </Grid>
              )}
              <Grid container p={1}>
                {customer?.contacts?.length > 0 ? (
                  filteredData.map((c, index) => (
                    <ContactCard
                      key={index}
                      selectedCardId={selectedContactCard || index}
                      value={defaultValues}
                      handleContactCard={handleContactCard}
                      c={c}
                    />
                  ))
                ) : (
                  <Typography variant={TYPOGRAPHY.OVERLINE1} color="text.no">
                    {LABEL.NO_CONTACT_FOUND}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} lg={9}>
          <Grid container>
            <Grid item sm={12}>
              <Card {...GCardOption}>
                <GStyledTopBorderDivider mode={themeMode} />
                <Grid container spacing={2} px={1.5} mb={10}>
                  <Grid item lg={12}>
                    <GridViewTitle title={TITLE.PERSONAL_INFO} />
                    <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: 5 }} />
                  </Grid>
                  <Grid item lg={12} sm={12}>
                    <Grid container spacing={2} p={2} pb={2}>
                      <GridViewField heading={VIEW_FORM.FIRST_NAME} isLoading={isLoading} children={defaultValues?.firstName} />
                      <GridViewField heading={VIEW_FORM.LAST_NAME} isLoading={isLoading} children={defaultValues?.lastName} />
                      <GridViewField heading={VIEW_FORM.TITLE} isLoading={isLoading} children={defaultValues?.title} />
                      <GridViewField heading={VIEW_FORM.HEADING_EMAIL} isLoading={isLoading} children={defaultValues?.loginEmail} />
                      <GridViewField heading={VIEW_FORM.PHONE} isLoading={isLoading} children={defaultValues?.phone} />
                      <GridViewField heading={VIEW_FORM.DEPARTMENT} isLoading={isLoading} children={defaultValues?.firstName} />
                      <GridViewField heading={VIEW_FORM.CONTACT_TYPES} isLoading={isLoading} userRolesChip={defaultValues?.contactTypes} />
                      <GridViewField heading={VIEW_FORM.REPORT_TO} isLoading={isLoading} children={defaultValues?.loginEmail} />
                    </Grid>
                  </Grid>
                  <Grid item lg={12}>
                    <GridViewTitle title={TITLE.ADDRESS_INFO} />
                    <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: 5 }} />
                  </Grid>
                  <Grid item lg={12} sm={12}>
                    <Grid container spacing={2} p={2} pb={2}>
                      <GridViewField heading={ADDRESS.STREET} isLoading={isLoading} children={defaultValues?.street} />
                      <GridViewField heading={ADDRESS.CITY} isLoading={isLoading} children={contact?.city} />
                      <GridViewField heading={ADDRESS.REGION} isLoading={isLoading} children={defaultValues?.region} />
                      <GridViewField heading={ADDRESS.POST_CODE} isLoading={isLoading} children={defaultValues?.postCode} />
                      <GridViewField heading={ADDRESS.COUNTRY} isLoading={isLoading} children={defaultValues?.country} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sm={12} p={2}>
                  <GStyledFlexEndBox>
                    <AuditBox value={defaultValues} />
                  </GStyledFlexEndBox>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {customerDialog && <CustomerDialog />}
    </MotionLazyContainer>
  )
}

export default memo(ContactTab)
