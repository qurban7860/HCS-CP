import { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, dispatch } from 'store'
import { useParams, useNavigate } from 'react-router-dom'
import { setFromDialog, setFromSiteDialog } from 'store/slice'
import { Typography } from '@mui/material'
import { CustomerNav, CustomerTab } from 'section/crm/customer'
import { ContactTab, SiteTab, customerDefaultValues, TicketsTab } from 'section/crm'
import { MachineDialog, SiteDialog, ContactDialog } from 'component'
import { MotionLazyContainer } from 'component/animate'
import { FLEX } from 'constant'
import { PATH_CUSTOMER } from 'route/path'

const CustomerLayout = ({ tab = 0 }) => {
 const [renderedTab, setRenderedTab] = useState(tab)
 const navigate = useNavigate()
 const { id } = useParams()
 const { customer, isLoading } = useSelector(state => state.customer)
 const { customerMachines, connectedMachineDialog, machineSiteDialogData } = useSelector(state => state.machine)
 const { contact, contacts, contactDialog } = useSelector(state => state.contact)

 const defaultValues = customerDefaultValues(customer, customerMachines, contacts)

 const navigatePage = tab => {
  if (tab === 0 && id) {
   navigate(PATH_CUSTOMER.customers.view(id))
   dispatch(setFromDialog(false))
   dispatch(setFromSiteDialog(false))
  } else if (tab === 1 && id) {
   navigate(PATH_CUSTOMER.customers.contacts.view(id))
   dispatch(setFromDialog(false))
   dispatch(setFromSiteDialog(false))
  } else if (tab === 2 && id) {
   navigate(PATH_CUSTOMER.customers.sites.view(id))
   dispatch(setFromDialog(false))
   dispatch(setFromSiteDialog(false))
  } else if (tab === 3 && id) {
   // navigate(PATH_CUSTOMER.customers.support.list(id))
  } else if (tab === 4 && id) {
   navigate(PATH_CUSTOMER.customers.support.list(id))
   dispatch(setFromDialog(false))
   dispatch(setFromSiteDialog(false))
  }
 }

 return (
  <MotionLazyContainer display={FLEX.FLEX}>
   {/* TODO: [HPS-1240] HPS-1245 Machine Layout Reponsiveness */}
   <CustomerNav renderedTab={renderedTab} navigatePage={navigatePage} isLoading={isLoading} value={defaultValues} />
   {renderedTab === 0 ? (
    <CustomerTab />
   ) : renderedTab === 1 ? (
    <ContactTab />
   ) : renderedTab === 2 ? (
    <SiteTab />
   ) : renderedTab === 3 ? (
    <Typography variant='h0'>{'MACHINE PAGE'}</Typography>
   ) : renderedTab === 4 ? (
    <TicketsTab />
   ) : null}
   {contactDialog && <ContactDialog contact={contact} />}
   {machineSiteDialogData && <SiteDialog />}
   {connectedMachineDialog && <MachineDialog />}
  </MotionLazyContainer>
 )
}

CustomerLayout.propTypes = {
 tab: PropTypes.number
}

export default memo(CustomerLayout)
