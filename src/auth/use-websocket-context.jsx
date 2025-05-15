import { useContext, createContext } from 'react'

export const WebSocketContext = createContext()

export function useWebSocketContext() {
    const context = useContext(WebSocketContext)
    if (!context) throw new Error('useWebSocketContext context must be used inside WebSocketProvider')
    return context
}
