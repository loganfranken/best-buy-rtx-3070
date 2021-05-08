import { Container, CssBaseline, Typography } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { useDispatch, useSelector } from 'react-redux'

import ApplicationState from './interfaces/ApplicationState'
import DropPrediction from './DropPrediction'
import DropsSummary from './DropsSummary'
import DropsTable from './DropsTable'

const theme = createMuiTheme({
  typography: {

    h1: {
      fontSize: '3em',
      fontWeight: 'bold',
      margin: '2em 0 0.5em'
    },

    h2: {
      fontSize: '2.5em',
      fontWeight: 'bold',
      margin: '2em 0 0.5em'
    },

    h3: {
      fontSize: '1.75em',
      fontWeight: 'bold',
      margin: '2em 0 0.5em'
    },

    body1: {
      fontSize: '1.25em',
      margin: '1em 0'
    }
  }
});

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

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="md">

      <Typography variant="h1">When is Best Buy selling a RTX 3070 Founders Edition?</Typography>
      <Typography variant="body1">
        This small application uses <a href="https://www.nowinstock.net/full_historydetails/1483/52924/">data from NowInStock.net</a> to try and predict the next time Best Buy will have 
        a <a href="https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?skuId=6429442">NVIDIA GeForce RTX 3070</a> back in stock.
      </Typography>

      <DropPrediction {...dropsAnalysis} />

      <Typography variant="h2">Why do you think that?</Typography>
      <DropsSummary {...dropsAnalysis.summary} />

      <Typography variant="h2">Can I see the raw data?</Typography>
      <DropsTable days={dropsAnalysis.days} />
    
    </Container>
  </ThemeProvider>
});