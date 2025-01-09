import { useState, useEffect } from 'react'
import { t } from 'i18next'
import { LoadingButton } from '@mui/lab'
import { useIdleTimer } from 'react-idle-timer'
import { useAuthContext } from 'auth'
import { ConfirmDialog } from 'component/dialog'
import { GLOBAL } from 'config/global'
import { VARIANT } from 'constant'
import { Trans } from 'react-i18next'

const IdleManager = () => {
 const [openModal, setOpenModal] = useState(false)
 const { logout, isAuthenticated } = useAuthContext()
 const [showStay, setShowStay] = useState(true)
 const [countdown, setCountdown] = useState(10)

 const idleTimeout = 14 * GLOBAL.IDLE_TIME

 const handleIdle = () => {
  setOpenModal(true)
 }

 const { activate } = useIdleTimer({
  timeout: idleTimeout,
  promptBeforeIdle: GLOBAL.IDLE_TIME * 2,
  onPrompt: handleIdle,
  debounce: 500,
  disabled: !isAuthenticated
 })

 useEffect(() => {
  if (openModal && showStay) {
   const timer = setInterval(() => {
    if (countdown > 0) {
     setCountdown(countdown - 1)
    } else {
     setShowStay(false)
     setOpenModal(false)
     logout()
     clearInterval(timer)
    }
   }, 1000)

   return () => clearInterval(timer)
  }
 }, [openModal, showStay, countdown])

 const resetCountdown = () => {
  setShowStay(true)
  setCountdown(10)
 }

 const handleStillHere = () => {
  setOpenModal(false)
  resetCountdown()
  activate()
 }

 const handleLogout = () => {
  logout()
  setOpenModal(false)
  resetCountdown()
 }

 return (
  <ConfirmDialog
   key={openModal}
   open={openModal}
   onClose={handleLogout}
   title={t('session_inactivity.label')}
   content={showStay ? <Trans i18nKey='session_inactivity.content' values={{ countdown }} /> : t('session_inactivity.content_2')}
   i18SubButtonLabel={'logout.label'}
   action={
    showStay ? (
     <LoadingButton variant={VARIANT.CONTAINED} color='primary' onClick={handleStillHere}>
      {t('stay.label')}
     </LoadingButton>
    ) : null
   }
  />
 )
}

export default IdleManager
