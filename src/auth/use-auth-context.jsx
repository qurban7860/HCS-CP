import { useContext, createContext } from 'react'

export const AuthContext = createContext(null)

export function useAuthContext() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuthContext context must be used inside AuthProvider')
    return context
}
