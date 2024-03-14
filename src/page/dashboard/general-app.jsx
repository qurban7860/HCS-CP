import { Grid } from '@mui/material'
import { StyledContainer, StyledContainerSvg } from 'theme/style'
import { Welcome } from 'component/widget'
// import HowickWidgets from '../components/DashboardWidgets/HowickWidgets'
// TODO: redux slices
// import { useDispatch, useSelector } from '../../redux/store'
// import {
//   getCount,
//   getERPLogs,
//   getMachinesByCountry,
//   getMachinesByModel,
//   getMachinesByYear,
//   setMachineCategory,H
//   setMachineCountry,
//   setMachineModel,
//   setMachineYear,
// } from '../../redux/slices/dashboard/count'
// import { _appAuthors } from '../../_mock/arrays/_app'
// import { getActiveMachineModels } from '../../redux/slices/products/model'
// import { getActiveCategories } from '../../redux/slices/products/category'
// import { countries } from '../../assets/data'
// import { ChartBar } from 'component/chart'
// import ProductionLog from '../components/Charts/ProductionLog'
// import ChartStacked from '../components/Charts/ChartStacked'
// import HowickOperators from '../components/DashboardWidgets/OperatorsWidget'
// import ChartColumnNegative from '../components/Charts/ChartColumnNegative'

import { TITLE } from 'constant'
import { varFade } from 'component/animate'
import { GLOBAL } from 'config'
import { toTitleCase } from 'util'

import { Iconify } from 'component/iconify'
import { PATH_DASHBOARD } from 'route/path'
import { useWebSocketContext } from 'auth'
import { fQuarterYearDate } from 'util'

function GeneralAppPage() {
  return (
    <StyledContainer maxWidth={false}>
      <Grid container>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
            <Welcome
              title={toTitleCase(GLOBAL.APP_BRANCH)}
              description={GLOBAL.APP_CUSTOMER_TAGLINE}
            />
          </Grid>
        </Grid>
      </Grid>
    </StyledContainer>
  )
}

export default GeneralAppPage
