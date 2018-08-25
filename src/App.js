import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import "typeface-roboto";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import StockGraph from "./Components/stockGraph";
// import Sample from "./Components/sample";
// import Stocks from "./Components/stocks";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid container spacing={16}>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={8}>
            <Paper className="paper">
              <StockGraph />
            </Paper>
            <Grid item xs={1}>
            </Grid>
          </Grid>
        </Grid>

        {/* <Sample></Sample> */}
        {/* <Stocks></Stocks> */}
      </div>
    );
  }
}

export default App;
