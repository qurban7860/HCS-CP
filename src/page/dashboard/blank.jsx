import { Container, Typography } from '@mui/material'
import { useSettingContext } from 'component/setting'

function Blank() {
  const { themeStretch } = useSettingContext()

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Typography variant="h6"> Blank </Typography>
    </Container>
  )
}

export default Blank
