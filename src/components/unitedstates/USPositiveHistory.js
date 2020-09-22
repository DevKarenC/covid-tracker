import React, { PureComponent } from 'react';
import { Line } from 'react-chartjs-2';
import { STATE_ABB } from '../../constants/index';

class USPositiveHistory extends PureComponent {
  setLineLabels() {
    const { usHistoricalData, stateHistoricalData, location } = this.props;
    const stateAcronym = STATE_ABB[location];

    // Group dates into months (ex. Feb 2020)
    if (location === 'United States') {
      const labels = usHistoricalData.map((dailyData) => {
        return dailyData.date;
      });
      return labels.reverse();
    }
    const selectedStateData = stateHistoricalData.filter(
      (data) => data.state === stateAcronym,
    );
    const selectedStateDateLabels = selectedStateData.map((data) => {
      return data.date;
    });
    return selectedStateDateLabels.reverse();
  }

  setLineData() {
    const { usHistoricalData, stateHistoricalData, location } = this.props;
    const stateAcronym = STATE_ABB[location];
    if (location === 'United States') {
      const usLineData = usHistoricalData.map((dailyData) => {
        return dailyData.positiveIncrease;
      });
      return usLineData.reverse();
    }
    const selectedStateData = stateHistoricalData.filter(
      (data) => data.state === stateAcronym,
    );
    const selectedStateLineData = selectedStateData.map((data) => {
      return data.positiveIncrease;
    });
    return selectedStateLineData.reverse();
  }

  buildLineChartData() {
    const { location } = this.props;
    return {
      labels: this.setLineLabels(),
      datasets: [
        {
          label: `${location}`,
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(117, 244, 255, 0.4)',
          borderColor: 'rgba(117, 244, 255, 1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(117, 244, 255, 1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(117, 244, 255, 1)',
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
            maintainAspectRatio: false,
            title: {
              display: displayTitle,
              text: `Covid-19 Positive Case Daily Growth`,
              fontSize: 20,
            },
            legend: {
              display: displayLegend,
              position: legendPosition,
            },
            // scales: {
            //   xAxes: [
            //     {
            //       ticks: {
            //         display: false,
            //       },
            //     },
            //   ],
            // },
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
