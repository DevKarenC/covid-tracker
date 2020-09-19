import React, { PureComponent } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { convertDate } from '../../helpers/dateHelper';
import { STATE_ABB, STATE_ABB_REVERSE } from '../../constants/index';

// Top 10 states of Daily Positive Cases
// [] Display number of positive cases above each bar
// [x] Display full state names (desktop version)

class USTopTenPositive extends PureComponent {
  setBarLabels() {
    const labels = this.sortDescending().map((stateData) => {
      const stateAcronym = stateData.stateName;
      return STATE_ABB_REVERSE[stateAcronym];
    });
    return labels;
  }

  setBarData() {
    const barData = this.sortDescending().map((stateData) => {
      return stateData.positiveIncrease;
    });
    return barData;
  }

  setBarColor() {
    const { location } = this.props;
    const barColors = [
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
      'rgba(84, 2, 207, 1)',
    ];
    if (this.setBarData().length === 11) {
      return barColors;
    }
    if (location !== 'United States') {
      const topTenPositiveStates = this.sortDescending();
      const selectedStateIndex = topTenPositiveStates.findIndex(
        (state) => state.stateName === STATE_ABB[location],
      );
      barColors.splice(selectedStateIndex, 1, 'rgba(108, 27, 152, 1)');
    }
    return barColors;
  }

  buildBarChartData() {
    return {
      labels: this.setBarLabels(),
      datasets: [
        {
          label: 'Positive Cases',
          data: this.setBarData(),
          backgroundColor: this.setBarColor(),
          barThickness: 25,
          categoryPercentage: 0.1,
          fontColor: 'blue',
        },
      ],
    };
  }

  sortDescending() {
    const { currentData, location } = this.props;
    const size = 10;
    const currentDataCopy = currentData.map((stateData) => {
      const positiveIncreaseArray = {
        positiveIncrease: stateData.positiveIncrease,
        stateName: stateData.state,
      };
      return positiveIncreaseArray;
    });
    const statesSortedByPositives = currentDataCopy.sort(
      (a, b) => b.positiveIncrease - a.positiveIncrease,
    );
    const topTenPositiveStates = statesSortedByPositives.slice(0, size);
    const selectedState = statesSortedByPositives.find(
      (state) => state.stateName === STATE_ABB[location],
    );
    if (location !== 'United States') {
      // Determine if the selectedState is in the top 10
      const isSelectedStateInTopTen = topTenPositiveStates.find(
        (state) => state.stateName === STATE_ABB[location],
      );
      if (isSelectedStateInTopTen) {
        return topTenPositiveStates;
      }
      topTenPositiveStates.push(selectedState);
      return topTenPositiveStates;
    }
    return topTenPositiveStates;
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
        <HorizontalBar
          data={this.buildBarChartData()}
          options={{
            maintainAspectRatio: false,
            title: {
              display: displayTitle,
              text: `Top 10 States with Positive Cases on ${convertDate(
                chartDate,
              )}`,
              fontSize: 22,
            },
            legend: {
              display: displayLegend,
              position: legendPosition,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontSize: 20,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    fontSize: 16,
                  },
                },
              ],
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
