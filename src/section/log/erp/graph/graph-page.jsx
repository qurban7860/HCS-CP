import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { LogStackedChart, BackButton } from 'component';
import { FLEX_DIR } from 'constant';
// @mui
import { Card, Grid } from '@mui/material';
// Paths
import { PATH_LOGS, PATH_MACHINE } from 'route/path';
import { processGraphData } from './utils/utils'; 
// Sections
import { useSettingContext } from 'hook'
import { GCardOption, GStyledTopBorderDivider } from 'theme/style'

export default function FullScreenGraph() {
  const navigate = useNavigate();
  const location = useLocation();
  const { themeMode } = useSettingContext()
  const { machineId } = useParams();

  const { logsGraphData, graphLabels, timePeriod, dateFrom, dateTo } = location.state || {};

  const handleBackAction = () => {
    if (machineId) {
      navigate(PATH_MACHINE.machines.graph.view(machineId));
    } else {
      navigate(PATH_LOGS.graph);
    }
  };

  return (
    <Grid container rowGap={2} flex={1} flexDirection={FLEX_DIR.COLUMN} sx={{ mt: 2 }}>
      <Card {...GCardOption(themeMode)}>
        <GStyledTopBorderDivider mode={themeMode} />
        <Grid container rowSpacing={1} sx={{ mt: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <Grid item xs={12} sm={6} pl={3}>
            <BackButton handleBackAction={handleBackAction} />
          </Grid>
        </Grid>
        <Grid container spacing={2} p={3} pt={2}>
          <Grid item xs={12}>
            {logsGraphData && (
              <LogStackedChart
                processGraphData={(skipZero) => processGraphData(logsGraphData, timePeriod, dateFrom, dateTo, skipZero)}
                graphLabels={graphLabels}
                graphHeight={700}
              />
            )}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}