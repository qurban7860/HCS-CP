import { useState, useEffect } from 'react'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { useIdleTimer } from 'react-idle-timer'
import { useAuthContext } from 'auth'
import { useTheme } from '@mui/material/styles'
import { ConfirmDialog } from 'component/dialog'
import { GStyledDefLoadingButton } from 'theme/style'
import { GLOBAL } from 'config/global'
import { VARIANT } from 'constant'

const IdleManager = () => {
 const [openModal, setOpenModal]   = useState(false)
 const { logout, isAuthenticated } = useAuthContext()
 const [showStay, setShowStay]     = useState(true)
 const [countdown, setCountdown]   = useState(10)
 const theme                       = useTheme()

 const idleTimeout                 = 14 * GLOBAL.IDLE_TIME

 const handleIdle = () => {
  setOpenModal(true)
 }

 const { activate } = useIdleTimer({
  timeout         : idleTimeout,
  promptBeforeIdle: GLOBAL.IDLE_TIME * 2,
  onPrompt        : handleIdle,
  debounce        : 500,
  disabled        : !isAuthenticated
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
     <GStyledDefLoadingButton variant={VARIANT.CONTAINED} type={'button'} bgColor={theme.palette.howick.darkBlue} onClick={handleStillHere}>
      {t('stay.label').toUpperCase()}
     </GStyledDefLoadingButton>
    ) : null
   }
  />
 )
}

export default IdleManager
