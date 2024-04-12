import { useEffect } from 'react'
import { Grid } from '@mui/material'
import { GStyledContainer, GGStyledContainerSvg } from 'theme/style'
import { Welcome } from 'component/widget'
import { useLocation } from 'react-router-dom'
import { snack } from 'hook'
import { GLOBAL } from 'config'
import { toTitleCase } from 'util'
import { useSettingContext } from 'component/setting'

function GeneralAppPage() {
  const { themeMode } = useSettingContext()
  return (
    <Grid container>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12}>
          <Welcome title={toTitleCase(GLOBAL.APP_BRANCH)} description={GLOBAL.APP_CUSTOMER_TAGLINE} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GeneralAppPage
