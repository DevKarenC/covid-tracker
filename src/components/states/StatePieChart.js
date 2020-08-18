/* eslint-disable no-restricted-syntax */
import React, { PureComponent } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { STATE_ABB, STATE_CODE } from '../../constants/index';

class StatePieChart extends PureComponent {
  findInfectedAndNotInfected(stateFullName) {
    const { statePopulation, currentData } = this.props;
    const stateNameIdentifier = STATE_ABB[stateFullName];
    const stateCodeIdentifer = STATE_CODE[stateNameIdentifier];
    const statePopulationObj = {};
    statePopulation.forEach((stateData) => {
      const [population, stateCode] = stateData;
      statePopulationObj[stateCode] = population;
    });
    const getPositivesPerState = {};
    currentData.forEach((stateData) => {
      const stateName = stateData.state;
      getPositivesPerState[stateName] = stateData.positive;
    });
    const infected = getPositivesPerState[stateNameIdentifier];
    const notInfected =
      Number(statePopulationObj[stateCodeIdentifer]) -
      getPositivesPerState[stateNameIdentifier];
    return [infected, notInfected];
  }

  render() {
    const {
      location,
      displayTitle,
      displayLegend,
      legendPosition,
    } = this.props;

    return (
      <div className="doughnut">
        <Doughnut
          data={{
            labels: ['Positives', 'Negatives'],
            datasets: [
              {
                data: this.findInfectedAndNotInfected(location),
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
              },
            ],
          }}
          options={{
            title: {
              display: displayTitle,
              text: `Percentage of Positive Cases in ${location}`,
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

StatePieChart.defaultProps = {
  displayTitle: true,
  displayLegend: false,
  legendPosition: 'bottom',
};

export default StatePieChart;
