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
    text: "AAPL stock price by minute"
  },

  rangeSelector: {
    selected: 1,
    inputEnabled: true
  },

  exporting: {
    enabled: true,
    buttons: {
        contextButton: {
            text: 'Export',
            symbolFill: '#f88',
            symbolStroke: '#f00',
            enabled: true
        }
    }
  },

  series: [
    {
      name: "stock",
      // turboThreshold: 0,
      type: "candlestick",
      data: [0,0,0,0,0],
      tooltip: {
        valueDecimals: 2,
        valuePrefix: "$",
        valueSuffix: " USD"
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
    this.getData = this.getData.bind(this);
    this.getData();
  }

  handleChange(e) {
    this.setState({ stock: e.target.value });
    e.preventDefault();
  }

  handleSubmit(e) {
    this.getData();
    e.preventDefault();
  }

  getData() {
    const symbol = this.state.stock.toUpperCase();
    let retry = false;

    try {
      console.log(symbol);
      fetch(
        "https://shr0gyhr34.execute-api.us-east-1.amazonaws.com/default/api_finance",
        {
          method: "POST",
          body: JSON.stringify({ stock: symbol })
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
            const data = date.map((day, idx) => [
              day,
              openPrice[idx],
              highPrice[idx],
              lowPrice[idx],
              closePrice[idx]
            ]);
            this.setState({ data: data });
            console.log(data);
            options.series[0].data = data;
            options.series[0].name = this.state.stock.toUpperCase();
            options.title.text =
              this.state.stock.toUpperCase() + " Stock Chart by Open Price";
            this.setState({ options: options });
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
            id="name"
            label="Name"
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
