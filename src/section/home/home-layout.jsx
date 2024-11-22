import { memo } from 'react'
import { useSelector } from 'store'
import { HomeNav, HomeTab } from 'section/home'
import { useCustomerDefaultValues } from 'section/crm'
import { MotionLazyContainer } from 'component/animate'
import { FLEX } from 'constant'

const HomeLayout = () => {
 const { customer, isLoading } = useSelector(state => state.customer)
 const { customerMachines } = useSelector(state => state.machine)
 const { contacts } = useSelector(state => state.contact)

 const defaultValues = useCustomerDefaultValues(customer, customerMachines, contacts)

 return (
  <MotionLazyContainer display={FLEX.FLEX}>
   {/* TODO: [HPS-1240] HPS-1245 Machine Layout Reponsiveness */}
   <HomeNav isLoading={isLoading} value={defaultValues} />
   <HomeTab />
  </MotionLazyContainer>
 )
}

export default memo(HomeLayout)
