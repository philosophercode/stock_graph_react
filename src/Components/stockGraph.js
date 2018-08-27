import React, { Component } from "react";
// import { render } from "react-dom";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./stocks.css";

// const options = {
//   title: {
//     text: "My stock chart"
//   },
//   series: [
//     {
//       name: "stock",
//       turboThreshold: 0,
//       data: [[1, 2][3, 4]]
//     }
//   ],
//   tooltip: {
//     valueDecimals: 2,
//     valuePrefix: "$",
//     valueSuffix: " USD"
//   }
// };

const options = {
  title: {
    text: "Stock Price+Volume by Day"
  },

  // rangeSelector: {
  //   selected: 1,
  //   inputEnabled: true
  // },
  rangeSelector: {
    allButtonsEnabled: true,
    buttons: [
      {
        type: "month",
        count: 1,
        text: "1m"
      },
      {
        type: "month",
        count: 3,
        text: "3m"
      },
      {
        type: "month",
        count: 6,
        text: "6m"
      },
      {
        type: "ytd",
        count: 1,
        text: "YTD"
      },
      {
        type: "year",
        count: 1,
        text: "1y"
      },
      {
        type: "year",
        count: 3,
        text: "3y"
      },
      {
        type: "year",
        count: 5,
        text: "5y"
      },
      {
        type: "all",
        count: 1,
        text: "All"
      }
    ],
    buttonTheme: {
      width: 30
    },
    selected: 2
  },

  exporting: {
    enabled: true,
    buttons: {
      contextButton: {
        text: "Export",
        symbolFill: "#f88",
        symbolStroke: "#f00",
        enabled: true
      }
    }
  },

  // navigator: {
  //   xAxis: {
  //       isInternal: false
  //     },
  //   yAxis: {
  //       isInternal: false
  //     }
  // },

  // plotOptions: {
  //   series: {
  //     compare: "percent"
  //   },
  //   states: {
  //     hover: {
  //       enabled: true
  //     }
  //   }
  // },

  plotOptions: {
    series: {
      dataLabels: {
        color: "#B0B0B3"
      },
      marker: {
        lineColor: "#333"
      }
    },
    candlestick: {
      color: "#f08080",
      upColor: "#98fb98"
    }
  },

  series: [
    {
      name: "stock",
      turboThreshold: 0,
      type: "candlestick",
      data: [0, 1, 2, 1, 0],
      tooltip: {
        valueDecimals: 2,
        valuePrefix: "$",
        valueSuffix: " USD"
      }
    },
    {
      // valueDecimals: 2,
      turboThreshold: 0,
      type: "column",
      name: "Volume",
      data: [0, 0],
      tooltip: {
        // pointFormat: "Vol: {point.y:.2f}^10m",
        valueDecimals: 2,
        valueSuffix: "^10m"
      }
    }
  ]
};

class StockGraph extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      stock: "AAPL",
      options: options
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCompare = this.handleCompare.bind(this);
    this.getData = this.getData.bind(this);
    this.getData();
  }

  handleChange(e) {
    this.setState({
      stock: e.target.value
    });
    e.preventDefault();
  }

  handleSubmit(e) {
    this.getData();
    e.preventDefault();
  }

  handleCompare(e) {
    this.getData(true);
    e.preventDefault();
  }

  getData(compare = false) {
    const symbol = this.state.stock.toUpperCase();
    let retry = false;

    try {
      console.log(symbol);
      fetch(
        "https://shr0gyhr34.execute-api.us-east-1.amazonaws.com/default/api_finance",
        {
          method: "POST",
          body: JSON.stringify({
            stock: symbol
          })
        }
      )
        .then(res => res.json())
        .then(json => {
          retry = json.date === null ? true : false;
          if (json.date) {
            console.log(json);
            const date = json.epoch;
            const openPrice = json.open;
            const highPrice = json.high;
            const lowPrice = json.low;
            const closePrice = json.close;
            const volumeDay = json.volume;
            const data = date.map((day, idx) => [
              day,
              openPrice[idx],
              highPrice[idx],
              lowPrice[idx],
              closePrice[idx]
            ]);
            const dataVolume = date.map((day, idx) => [
              day,
              parseFloat(((volumeDay[idx]) /10000000))
            ]);
            this.setState({
              data: data
            });
            console.log(data);
            if (!compare) {
              options.series[0].data = data;
              options.series[1].data = dataVolume;
              options.series[0].name = this.state.stock.toUpperCase();
              options.title.text =
                this.state.stock.toUpperCase() + " Stock Price+Volume by Day";
            }
            // else {
            //   const endArrIdx = options.series.length;
            //   options.series.push({
            //     data: data
            //   });
            //   options.series[endArrIdx].name = this.state.stock.toUpperCase();
            //   options.title.text = "Stock Price by Day";
            // }
            this.setState({
              options: options
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
    if (retry === true) {
      console.log("null data - retry");
      this.getData();
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="symbol"
            label="Symbol"
            value={this.state.stock}
            onChange={this.handleChange}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            value="Submit"
            onClick={this.handleSubmit}
            id="stock-button"
          >
            STOCK
          </Button>
          {/* <Button
            variant="contained"
            color="primary"
            type="submit"
            value="Submit"
            onClick={this.handleCompare}
            id="stock-button"
          >
            +
          </Button> */}
        </form>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={this.state.options}
        />
      </div>
    );
  }
}

export default StockGraph;
