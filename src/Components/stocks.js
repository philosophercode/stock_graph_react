import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import {
  HighchartsStockChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Legend,
  AreaSplineSeries,
  SplineSeries,
  Navigator,
  RangeSelector,
  Tooltip
} from "react-jsx-highstock";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./stocks.css";

class Stocks extends Component {
  constructor() {
    super();
    this.state = {
      data1: [1, 2, 3, 4, 5, 56, 7, 77, 8, 76, 5, 78, 76, 8, 67],
      data2: [23, 34, 23, 4, 4, 34, 23, 43, 56, 43, 4, 654, 78, 7, 5]
    };
  }

  render() {
    const { data1, data2 } = this.state;

    return (
      <div className="app">
        <Grid container justify="center" spacing={8}>
          <Grid item xs={10}>
            <Paper className="paper">
              <HighchartsStockChart>
                <Chart zoomType="x" />

                <Title>Highstocks Example</Title>

                <Legend>
                  <Legend.Title>Key</Legend.Title>
                </Legend>

                <RangeSelector>
                  <RangeSelector.Button count={1} type="day">
                    1d
                  </RangeSelector.Button>
                  <RangeSelector.Button count={7} type="day">
                    7d
                  </RangeSelector.Button>
                  <RangeSelector.Button count={1} type="month">
                    1m
                  </RangeSelector.Button>
                  <RangeSelector.Button type="all">All</RangeSelector.Button>
                  <RangeSelector.Input boxBorderColor="#7cb5ec" />
                </RangeSelector>

                <Tooltip />

                <XAxis>
                  <XAxis.Title>Time</XAxis.Title>
                </XAxis>

                <YAxis>
                  <YAxis.Title>Price</YAxis.Title>
                  <AreaSplineSeries id="profit" name="Profit" data={data1} />
                </YAxis>

                <YAxis opposite>
                  <YAxis.Title>Social Buzz</YAxis.Title>
                  <SplineSeries
                    id="twitter"
                    name="Twitter mentions"
                    data={data2}
                  />
                </YAxis>

                <Navigator>
                  <Navigator.Series seriesId="profit" />
                  <Navigator.Series seriesId="twitter" />
                </Navigator>
              </HighchartsStockChart>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withHighcharts(Stocks, Highcharts);
