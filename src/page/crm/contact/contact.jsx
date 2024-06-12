import { ContactLayout } from 'section/crm'
import { CustomerLayout } from 'section/crm'

const Contact = () => {
  return (
    <CustomerLayout tab={1}>
      <ContactLayout />
    </CustomerLayout>
  )
}

export default Contact
