import { createContext, useContext, useMemo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { GLOBAL } from 'config/global'
import { useAuthContext } from './use-auth-context'

export const WebSocketContext = createContext()

export function useWebSocketContext() {
  return useContext(WebSocketContext)
}

WebSocketProvider.propTypes = {
  children: PropTypes.node
}

export function WebSocketProvider({ children }) {
  const { isAuthenticated, clearAllPersistedStates } = useAuthContext()
  const [token, setToken] = useState(null)
  const WS_URL = token ? `${GLOBAL.SOCKET_URL}/?accessToken=${token}` : 'ws://localhost:5173/ws'
  const [onlineUsers, setOnlineUsers] = useState([])
  const [notifications, setNotifications] = useState([])
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (isAuthenticated) {
      const accessToken = localStorage.getItem('accessToken')
      setToken(accessToken)
    }
  }, [isAuthenticated])

  useEffect(() => {
    console.log('WebSocket URL:', WS_URL)
    if (WS_URL) {
      const socketInstance = new WebSocket(WS_URL)
      setSocket(socketInstance)

      socketInstance.onopen = () => {
        console.log('WebSocket connected')
      }

      socketInstance.onmessage = (event) => {
        console.log('WebSocket message:', event.data)
        handleWebSocketMessage(event)
      }

      socketInstance.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      socketInstance.onclose = () => {
        console.log('WebSocket disconnected')
      }

      return () => {
        socketInstance.close()
      }
    }
  }, [WS_URL])

  const handleWebSocketMessage = (event) => {
    console.log('Received WebSocket message:', event.data)

    if (event.data instanceof Blob) {
      getJsonFromBlob(event.data)
        .then((json) => {
          if (json.eventName === 'newUserLogin' || json.eventName === 'newNotification') {
            socket.send(JSON.stringify({ eventName: 'getNotifications' }))
          }

          if (json.eventName === 'logout') {
            clearAllPersistedStates()
          }

          if (json.eventName === 'newNotification') {
            const updatedNotifications = [json, ...notifications]
            setNotifications(updatedNotifications)
          }

          if (json.eventName === 'onlineUsers') {
            setOnlineUsers(json?.userIds)
          }

          if (json.eventName === 'notificationsSent') {
            setNotifications(json.data)
          }

          if (json.eventName === 'userLoggedOut') {
            socket.send(JSON.stringify({ eventName: 'getOnlineUsers' }))
          }
        })
        .catch((error) => {
          console.error('Error parsing JSON from Blob:', error)
        })
    } else {
      console.error('Error parsing WebSocket message:', event.data)
    }
  }

  function getJsonFromBlob(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result)
          resolve(jsonData)
        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = () => {
        reject(new Error('Error reading the Blob.'))
      }

      reader.readAsText(blob)
    })
  }

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message)
    } else {
      console.error('WebSocket is not open. Unable to send message.')
    }
  }

  const contextValue = useMemo(
    () => ({
      sendMessage,
      onlineUsers,
      notifications
    }),
    [sendMessage, onlineUsers, notifications]
  )

  return <WebSocketContext.Provider value={contextValue}>{children}</WebSocketContext.Provider>
}
