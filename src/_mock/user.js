const _getImage = (image) => {
  return `/asset/image/${image}.png`
}

const mockUser = [
  {
    id: 1,
    email: 'johndoe@steelcompany.com',
    displayName: 'John Doe',
    organization: 'SteelCompany',
    firstName: 'John',
    lastName: 'Doe',
    phone: '123-456-7890',
    role: 'customer',
    location: {
      address: '123 Test Blvd.',
      postalCode: '12345',
      state: 'Lagos',
      city: 'Testing City',
      country: 'TS'
    },
    badge: _getImage('customer-portal'),
    photoURL: 'https://mighty.tools/mockmind-api/content/cartoon/11.jpg'
  }
]

export default mockUser
