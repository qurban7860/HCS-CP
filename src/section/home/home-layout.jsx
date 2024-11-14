import { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuthContext } from 'auth'
import { useSelector, dispatch } from 'store'
import { useParams, useNavigate } from 'react-router-dom'
import { setFromDialog, setFromSiteDialog } from 'store/slice'
import { Typography } from '@mui/material'
import { HomeNav, HomeTab } from 'section/home'
import { ContactTab, SiteTab, useCustomerDefaultValues, TicketsTab } from 'section/crm'
import { MachineDialog, SiteDialog, ContactDialog } from 'component'
import { MotionLazyContainer } from 'component/animate'
import { FLEX } from 'constant'
import { PATH_CUSTOMER } from 'route/path'

const HomeLayout = ({ tab = 0 }) => {
 const [renderedTab, setRenderedTab] = useState(tab)
 const navigate = useNavigate()
 const { user } = useAuthContext()
 const customerId = user?.customer
 const { customer, isLoading } = useSelector(state => state.customer)
 const { customerMachines, connectedMachineDialog, machineSiteDialogData } = useSelector(state => state.machine)
 const { contact, contacts, contactDialog } = useSelector(state => state.contact)

 const defaultValues = useCustomerDefaultValues(customer, customerMachines, contacts)

 return (
  <MotionLazyContainer display={FLEX.FLEX}>
   {/* TODO: [HPS-1240] HPS-1245 Machine Layout Reponsiveness */}
   <HomeNav renderedTab={renderedTab} isLoading={isLoading} value={defaultValues} />
   {renderedTab === 0 ? (
    <HomeTab />
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

HomeLayout.propTypes = {
 tab: PropTypes.number
}

export default memo(HomeLayout)
