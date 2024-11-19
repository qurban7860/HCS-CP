import { memo } from 'react'
import PropTypes from 'prop-types'
import { useAuthContext } from 'auth'
import { useSelector } from 'store'
import { useNavigate } from 'react-router-dom'
import { HomeNav, HomeTab } from 'section/home'
import { useCustomerDefaultValues } from 'section/crm'
import { MotionLazyContainer } from 'component/animate'
import { FLEX } from 'constant'

const HomeLayout = ({ tab = 0 }) => {
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
   <HomeNav isLoading={isLoading} value={defaultValues} />
   <HomeTab />
  </MotionLazyContainer>
 )
}

HomeLayout.propTypes = {
 tab: PropTypes.number
}

export default memo(HomeLayout)
