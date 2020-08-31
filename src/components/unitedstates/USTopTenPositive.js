import React, { PureComponent } from 'react';
import { Bar } from 'react-chartjs-2';
import { convertDate } from '../../helpers/dateHelper';

// Top 10 states of Daily Positive Cases
// [] Display number of positive cases above each bar
// [] Display full state names (desktop version)

class USTopTenPositive extends PureComponent {
  setBarLabels() {
    const labels = this.sortDescending().map((stateData) => {
      return stateData.stateName;
    });
    return labels;
  }

  setBarData() {
    const barData = this.sortDescending().map((stateData) => {
      return stateData.positiveIncrease;
    });
    return barData;
  }

  buildBarChartData() {
    return {
      labels: this.setBarLabels(),
      datasets: [
        {
          label: 'Positive Cases',
          data: this.setBarData(),
          backgroundColor: [
            'rgba(204, 0, 0, 1)',
            'rgba(255, 0, 0, 1)',
            'rgba(255, 51, 51, 1)',
            'rgba(255, 76, 76, 1)',
            'rgba(255, 102, 102, 1)',
            'rgba(255, 127, 127, 1)',
            'rgba(255, 152, 152, 1)',
            'rgba(255, 178, 178, 1)',
            'rgba(255, 192, 192, 1)',
            'rgba(255, 229, 229, 1)',
          ],
        },
      ],
    };
  }

  sortDescending() {
    const { currentData } = this.props;
    const size = 10;
    const currentDataCopy = currentData.map((stateData) => {
      const positiveIncreaseArray = {
        positiveIncrease: stateData.positiveIncrease,
        stateName: stateData.state,
      };
      return positiveIncreaseArray;
    });
    return currentDataCopy
      .sort((a, b) => b.positiveIncrease - a.positiveIncrease)
      .slice(0, size);
  }

  render() {
    const {
      chartDate,
      displayTitle,
      displayLegend,
      legendPosition,
    } = this.props;

    return (
      <div className="barChart chart-item">
        <Bar
          data={this.buildBarChartData()}
          options={{
            title: {
              display: displayTitle,
              text: `Top 10 States with Positive Cases on ${convertDate(
                chartDate,
              )}`,
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

USTopTenPositive.defaultProps = {
  displayTitle: true,
  displayLegend: false,
  legendPosition: 'bottom',
};

export default USTopTenPositive;
