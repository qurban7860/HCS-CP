import React, { createContext, useContext, useMemo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useWebSocket from 'react-use-websocket'
import { GLOBAL } from 'config/global'
import { useAuthContext } from './use-auth-context'

const WebSocketContext = createContext()

export function useWebSocketContext() {
  return useContext(WebSocketContext)
}

WebSocketProvider.propTypes = {
  children: PropTypes.node
}
// TODO: do some housekeeping here

export function WebSocketProvider({ children }) {
  const { isAuthenticated, clearAllPersistedStates } = useAuthContext()
  const [token, setToken] = useState(null)
  const WS_URL = token ? `${GLOBAL.SOCKET_URL}/?accessToken=${token}` : null
  const [onlineUsers, setOnlineUsers] = useState(0)
  const [notifications, setNotifications] = useState(null)

  // check if this is needed
  const ws = new WebSocket(WS_URL, 'protocol')

  const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
    onMessage: (event) => {
      if (event.data instanceof Blob) {
        console.log('Received Blob:', event.data)
        getJsonFromBlob(event.data)
          .then((json) => {
            console.log('Received JSON:', json)
            if (json.eventName === 'newUserLogin' || json.eventName === 'newNotification') {
              sendJsonMessage({ eventName: 'getNotifications' })
            }

            if (json.eventName === 'logout') {
              clearAllPersistedStates()
            }

            if (json.eventName === 'newNotification') {
              const updatedNotifications = [json, ...notifications]
              setNotifications(updatedNotifications)
            }

            // why does that in my client react app, i have initiator named 'ws' coming from 'webpack', and in my client vite app, i dont have that initiator?
            if (json.eventName === 'onlineUsers') {
              setOnlineUsers(json?.userIds)
            }

            if (json.eventName === 'notificationsSent') {
              setNotifications(json.data)
            }

            if (json.eventName === 'userLoggedOut') {
              sendJsonMessage({ eventName: 'getOnlineUsers' })
            }
          })
          .catch((error) => {
            console.error('Error parsing JSON from Blob:', error)
          })
      } else {
        console.error('Error parsing WebSocket message:')
      }
    },
    share: true,
    filter: () => true,
    retryOnError: true,
    shouldReconnect: () => true
  })

  useEffect(() => {
    if (isAuthenticated) {
      const accessToken = localStorage.getItem('accessToken')
      setToken(accessToken)
    }
  }, [isAuthenticated])

  function getJsonFromBlob(blob) {
    return new Promise((resolve, reject) => {
      if (!(blob instanceof Blob)) {
        reject(new Error('Invalid argument: Not a Blob.'))
        return
      }
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

  const contextValue = useMemo(
    () => ({
      sendMessage,
      sendJsonMessage,
      lastMessage,
      lastJsonMessage,
      readyState,
      onlineUsers,
      notifications
    }),
    [sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, onlineUsers, notifications]
  )

  return <WebSocketContext.Provider value={contextValue}>{children}</WebSocketContext.Provider>
}
