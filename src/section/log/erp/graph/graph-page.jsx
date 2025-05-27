import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { LogStackedChart, BackButton } from 'component';
import { FLEX_DIR } from 'constant'
// @mui
import { Card, Grid } from '@mui/material';
// Paths
import { PATH_LOGS, PATH_MACHINE } from 'route/path';


export default function FullScreenGraph() {
  const navigate = useNavigate();
  const location = useLocation();
  const { machineId } = useParams()


  const { graphData, graphLabels } = location.state || {};
  
  const handleBackAction = () => {
    if (machineId) {
      navigate(PATH_MACHINE.machines.graph.view(machineId));
    } else {
      navigate(PATH_LOGS.graph);
    }
  };

  return (
    <Grid container rowGap={2} flexDirection={FLEX_DIR.COLUMN} sx={{mt: 2}}>
      <Card sx={{ p: 3, pt: 0 }}>
        <Grid container rowSpacing={1} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start' }}>
          <Grid item xs={12} sm={6}>
            <BackButton handleBackAction={handleBackAction} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            {graphData && (
              <LogStackedChart
                processGraphData={() => graphData} 
                graphLabels={graphLabels}
                graphHeight= '700'
              />
            )}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
