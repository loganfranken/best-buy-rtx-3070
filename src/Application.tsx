
import ApplicationState from './interfaces/ApplicationState'
import { Container, CssBaseline } from '@material-ui/core'
import DropsTable from './DropsTable'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'

export default hot(() => {

  const dropAnalysis = useSelector((state: ApplicationState) => state.dropAnalysis);
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
      <DropsTable days={dropAnalysis.days} />
    </Container>
  </React.Fragment>
});