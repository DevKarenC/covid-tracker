import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
    };
  }

  render() {
    let { chartData } = this.state;
    return (
      <div className="chart">
        <Bar data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    );
  }
}

export default Chart;
