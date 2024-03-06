import { Container, Typography } from '@mui/material'
import { useSettingsContext } from 'component/setting'

function Blank() {
  const { themeStretch } = useSettingsContext()

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Typography variant="h6"> Blank </Typography>
    </Container>
  )
}

export default Blank
