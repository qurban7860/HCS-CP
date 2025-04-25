import { createContext, useMemo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useWebSocket from 'react-use-websocket'
import { useAuthContext } from './use-auth-context'
import { GLOBAL } from 'config/global'
import { RESPONSE, KEY, WEBSOCKET_EVENT } from 'constant'

export const WebSocketContext = createContext()

export const WebSocketProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(0)
    const [notifications, setNotifications] = useState(null)
    const { isAuthenticated, clearAllPersistedStates } = useAuthContext()

    const WS_URL = token ? `${GLOBAL.SOCKET_URL}/?accessToken=${token}` : null

    const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
        onMessage: async event => {
            try {
                let parsedData
                if (event.data instanceof Blob) {
                    parsedData = await getJsonFromBlob(event.data)
                } else if (typeof event.data === 'string') {
                    parsedData = JSON.parse(event.data)
                } else {
                    parsedData = event.data
                }
                handleWebSocketMessage(parsedData)
            } catch (error) {
                console.error('Message parsing error:', error)
                console.log('Original event data:', event.data)
            }
        },
        share: true,
        filter: () => true,
        retryOnError: true,
        shouldReconnect: () => true
    })

    const handleWebSocketMessage = json => {
        if (json.eventName === WEBSOCKET_EVENT.NEW_USER_LOGIN || json.eventName === WEBSOCKET_EVENT.NEW_NOTIFICATION) {
            sendJsonMessage({ eventName: WEBSOCKET_EVENT.GET_ONLINE_USERS })
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
            if (json?.userIds && json.userIds.length > 0) {
                setOnlineUsers(json.userIds)
            } else {
                console.warn('Received invalid or empty userIds on USER_LOGGED_OUT')
            }
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

WebSocketProvider.propTypes = {
    children: PropTypes.node
}
