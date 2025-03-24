import { useContext } from 'react'
import { RESPONSE } from 'constant'
import { AuthContext } from './auth-provider'

export function useAuthContext() {
 const context = useContext(AuthContext)
 if (!context) throw new Error('useAuthContext context must be used inside AuthProvider')
 return context
}
