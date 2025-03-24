import { useEffect, useState } from 'react'
import { Icon, ICON_NAME } from 'hook'
import { Stack } from '@mui/material'

export default function SkeletonPDF() {
 const [opacity, setOpacity] = useState(0.3)
 useEffect(() => {
  const interval = setInterval(() => {
   setOpacity(opacity === 0.3 ? 0 : 0.3)
  }, 500)
  return () => clearInterval(interval)
 }, [opacity])

 return (
  <Stack spacing={2} height='842px' sx={{ margin: '0 auto', paddingTop: 20 }}>
   <Icon icon={ICON_NAME.PDF} sx={{ transition: 'opacity 1s ease', width: 300, height: 300, opacity }} />
  </Stack>
 )
}
