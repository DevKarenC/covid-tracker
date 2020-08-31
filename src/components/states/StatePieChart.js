/* eslint-disable no-restricted-syntax */
import React, { PureComponent } from 'react';
import { Doughnut, Chart } from 'react-chartjs-2';
import { STATE_ABB, STATE_CODE } from '../../constants/index';

class StatePieChart extends PureComponent {
  componentDidMount() {
    Chart.pluginService.register({
      beforeDraw(chart) {
        if (chart.config.options.elements.center) {
          // Get ctx from string
          const { ctx } = chart.chart;

          // Get options from the center object in options
          const centerConfig = chart.config.options.elements.center;
          const fontStyle = centerConfig.fontStyle || 'Arial';
          const txt = centerConfig.text;
          const color = centerConfig.color || '#000';
          const sidePadding = centerConfig.sidePadding || 20;
          const sidePaddingCalculated =
            (sidePadding / 100) * (chart.innerRadius * 2);
          // Start with a base font of 30px
          ctx.font = `30px ${fontStyle}`;

          // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          const stringWidth = ctx.measureText(txt).width;
          const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          const widthRatio = elementWidth / stringWidth;
          const newFontSize = Math.floor(30 * widthRatio);
          const elementHeight = chart.innerRadius * 2;

          // Pick a new font size so it will not be larger than the height of label.
          const fontSizeToUse = Math.min(newFontSize, elementHeight);

          // Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          ctx.font = `${fontSizeToUse}px ${fontStyle}`;
          ctx.fillStyle = color;

          // Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      },
    });
  }

  findInfectedAndNotInfected(stateFullName) {
    const { statePopulation, currentData, usCurrentData } = this.props;
    if (stateFullName === 'United States') {
      const infected = usCurrentData[0].positive;
      const usPopulation = 331002651;
      const notInfected = usPopulation - infected;
      return [infected, notInfected];
    }
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

  findInfectedPercentage(stateFullName) {
    const infectedData = this.findInfectedAndNotInfected(stateFullName);
    return ((infectedData[0] / infectedData[1]) * 100).toFixed(2);
  }

  render() {
    const {
      location,
      displayTitle,
      displayLegend,
      legendPosition,
    } = this.props;

    return (
      <div className="doughnut chart-item">
        <Doughnut
          data={{
            labels: ['Positives', 'Negatives'],
            datasets: [
              {
                data: this.findInfectedAndNotInfected(location),
                backgroundColor: ['#ddba95', '#006ba1'],
                hoverBackgroundColor: ['#c6a786', '#006090'],
              },
            ],
          }}
          options={{
            elements: {
              center: {
                text: `${this.findInfectedPercentage(location)}%`,
                color: '#000000',
                fontStyle: 'Arial',
                sidePadding: 20,
              },
            },
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
