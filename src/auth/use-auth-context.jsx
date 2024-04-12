import { useContext } from 'react'
import { AuthContext } from './auth-provider'
import { RESPONSE } from 'constant'

const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error(RESPONSE.error.AUTH_CONTEXT)

  return context
}

export default useAuthContext
