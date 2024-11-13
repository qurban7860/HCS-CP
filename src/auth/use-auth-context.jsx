import { useContext } from 'react'
import { AuthContext } from './auth-provider'
import { RESPONSE } from 'constant'

export const useAuthContext = () => {
 const context = useContext(AuthContext)
 if (!context) {
  console.error('useAuthContext must be used within AuthProvider')
  throw new Error(RESPONSE.error.AUTH_CONTEXT)
 }
 return context
}
