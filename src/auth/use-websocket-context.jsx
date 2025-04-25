import { useContext } from 'react'
import { WebSocketContext } from './websocket-provider'

export function useWebSocketContext() {
    const context = useContext(WebSocketContext)
    console.log(" useWebSocketContext()   : ", context)
    if (!context) throw new Error('useWebSocketContext context must be used inside WebSocketProvider')
    return context
}
