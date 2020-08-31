import React, { PureComponent } from 'react';
import { Line } from 'react-chartjs-2';

class USPositiveHistory extends PureComponent {
  setLineLabels() {
    const { usHistoricalData } = this.props;
    const labels = usHistoricalData.map((dailyData) => {
      return dailyData.date;
    });
    return labels.reverse();
  }

  setLineData() {
    const { usHistoricalData } = this.props;
    const lineData = usHistoricalData.map((dailyData) => {
      return dailyData.positive;
    });
    return lineData.reverse();
  }

  buildLineChartData() {
    return {
      labels: this.setLineLabels(),
      datasets: [
        {
          label: 'US Positive Cases Trend',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.setLineData(),
        },
      ],
    };
  }

  render() {
    const { displayTitle, displayLegend, legendPosition } = this.props;

    return (
      <div className="lineChart chart-item">
        <Line
          data={this.buildLineChartData()}
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
