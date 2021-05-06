import ApplicationState from './interfaces/ApplicationState'
import { Container, CssBaseline, Typography } from '@material-ui/core'
import DropPrediction from './DropPrediction'
import DropsSummary from './DropsSummary'
import DropsTable from './DropsTable'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'

export default hot(() => {

  const dropsAnalysis = useSelector((state: ApplicationState) => state.dropsAnalysis);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {

      const response = await fetch('/data/drops-analysis.json');
      const data = await response.json();

      dispatch({ type: 'dropAnalysis/changed', payload: data });

    })();
  }, []);

  return <React.Fragment>
    <CssBaseline />
    <Container>

      <Typography variant="h2">Prediction</Typography>
      <DropPrediction {...dropsAnalysis.summary} />

      <Typography variant="h2">Analysis</Typography>
      <DropsSummary {...dropsAnalysis.summary} />

      <Typography variant="h2">Raw Data</Typography>
      <DropsTable days={dropsAnalysis.days} />
    
    </Container>
  </React.Fragment>
});