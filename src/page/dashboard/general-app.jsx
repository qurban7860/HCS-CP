import { useSettingContext } from 'hook'
import { Grid } from '@mui/material'
import { Welcome } from 'component/widget'
import { GLOBAL } from 'config'
import { toTitleCase } from 'util'

function GeneralAppPage() {
  const { themeMode } = useSettingContext()

  return (
    <Grid container>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12}>
          <Welcome title={toTitleCase(GLOBAL.APP_TAGLINE)} description={GLOBAL.APP_CUSTOMER_TAGLINE} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GeneralAppPage
