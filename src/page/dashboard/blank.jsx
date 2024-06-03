import { useSettingContext } from 'hook'
import { Container, Typography } from '@mui/material'

function Blank() {
  const { themeStretch } = useSettingContext()

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Typography variant="h6"> Blank </Typography>
    </Container>
  )
}

export default Blank
