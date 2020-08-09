import React, { PureComponent } from 'react';
import { Bar } from 'react-chartjs-2';

// Top 5 states of increased positive cases

class BarChart extends PureComponent {
  render() {
    const {
      barChartData,
      displayTitle,
      displayLegend,
      legendPosition,
    } = this.props;
    return (
      <div className="barChart">
        <Bar
          data={barChartData}
          options={{
            title: {
              display: displayTitle,
              text: `Top 5 States with Positive Cases on ...`,
              fontSize: 20,
            },
            legend: {
              display: displayLegend,
              position: legendPosition,
            },
          }}
        />
      </div>
    );
  }
}

BarChart.defaultProps = {
  displayTitle: true,
  displayLegend: true,
  legendPosition: 'bottom',
};

export default BarChart;
