import React, { createContext, useContext, useMemo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useWebSocket from 'react-use-websocket'
import { useAuthContext } from './use-auth-context'
import { GLOBAL } from 'config/global'
import { RESPONSE, KEY, WEBSOCKET_EVENT } from 'constant'

const WebSocketContext = createContext()

export function useWebSocketContext() {
 return useContext(WebSocketContext)
}

WebSocketProvider.propTypes = {
 children: PropTypes.node
}

export function WebSocketProvider({ children }) {
 const [token, setToken] = useState(null)
 const [onlineUsers, setOnlineUsers] = useState(0)
 const [notifications, setNotifications] = useState(null)
 const { isAuthenticated, clearAllPersistedStates } = useAuthContext()

 const WS_URL = token ? `${GLOBAL.SOCKET_URL}/?accessToken=${token}` : null

 const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
  onMessage: event => {
   if (event.data instanceof Blob) {
    getJsonFromBlob(event.data)
     .then(json => {
      handleWebSocketMessage(json)
     })
     .catch(error => {
      console.error(RESPONSE.error.PARSING_JSON(error))
     })
   } else {
    console.error(RESPONSE.error.PARSING_WEBSOCKET(event.data))
   }
  },
  share: true,
  filter: () => true,
  retryOnError: true,
  shouldReconnect: () => true
 })

 const handleWebSocketMessage = json => {
  if (json.eventName === WEBSOCKET_EVENT.NEW_USER_LOGIN || json.eventName === WEBSOCKET_EVENT.NEW_NOTIFICATION) {
   sendJsonMessage({ eventName: WEBSOCKET_EVENT.GET_NOTIFICATIONS })
  }

  if (json.eventName === WEBSOCKET_EVENT.LOGOUT) {
   clearAllPersistedStates()
  }

  if (json.eventName === WEBSOCKET_EVENT.NEW_NOTIFICATION) {
   const updatedNotifications = [json, ...notifications]
   setNotifications(updatedNotifications)
  }

  if (json.eventName === WEBSOCKET_EVENT.ONLINE_USERS) {
   setOnlineUsers(json?.userIds)
  }

  if (json.eventName === WEBSOCKET_EVENT.NOTIFICATIONS_SENT) {
   setNotifications(json.data)
  }

  if (json.eventName === WEBSOCKET_EVENT.USER_LOGGED_OUT) {
   sendJsonMessage({ eventName: WEBSOCKET_EVENT.GET_ONLINE_USERS })
  }
 }

 useEffect(() => {
  if (isAuthenticated) {
   const accessToken = localStorage.getItem(KEY.ACCESS_TOKEN)
   setToken(accessToken)
  }
 }, [isAuthenticated])

 function getJsonFromBlob(blob) {
  return new Promise((resolve, reject) => {
   if (!(blob instanceof Blob)) {
    reject(new Error(RESPONSE.error.INVALID_ARG_NOT_BLOB))
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
    reject(new Error(RESPONSE.error.ERR_READ_BLOB))
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
