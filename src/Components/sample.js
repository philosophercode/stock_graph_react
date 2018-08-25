import React, { Component } from 'react';
// import Highcharts from 'highcharts/highstock';
// import {
//     HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend,
//     AreaSplineSeries, SplineSeries, Navigator, RangeSelector, Tooltip
//   } from 'react-jsx-highstock';

class Sample extends Component {
    constructor() {
        super();
        this.state = {
           data: null,
           num: 10
        }
        this.alerter = this.alerter.bind(this);
     }

    alerter() {
        // alert('clicked');
        this.setState({num:7});
        console.log(this.state.num);
        
    }

    render() {
       return (
          <div>
             <h1>Sample!</h1>
             <button onClick={this.alerter}>button</button>
          </div>
       );
    }
}

export default Sample;