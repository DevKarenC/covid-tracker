import React, { PureComponent } from 'react';
import { Line } from 'react-chartjs-2';

class USPositiveHistory extends PureComponent {
  render() {
    const {
      lineChartData,
      displayTitle,
      displayLegend,
      legendPosition,
    } = this.props;

    return (
      <div className="lineChart">
        <Line
          data={lineChartData}
          options={{
            title: {
              display: displayTitle,
              text: `How the US has been handling COVID-19`,
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

USPositiveHistory.defaultProps = {
  displayTitle: true,
  displayLegend: false,
  legendPosition: 'bottom',
};

export default USPositiveHistory;
