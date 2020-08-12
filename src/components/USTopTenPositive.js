import React, { PureComponent } from 'react';
import { Bar } from 'react-chartjs-2';

// Top 5 states of Daily Positive Cases
// [] Display number of positive cases above each bar
// [] Display full state names (desktop version)

class USTopTenPositive extends PureComponent {
  render() {
    const {
      barChartData,
      displayTitle,
      displayLegend,
      legendPosition,
    } = this.props;

    const convertDate = () => {
      const { chartDate } = this.props;
      const stringChartDate = `${chartDate}`;
      const year = stringChartDate.substring(0, 4);
      const month = stringChartDate.substring(4, 6) - 1;
      const day = stringChartDate.substring(6, 8);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(year, month, day).toLocaleDateString('en-us', options);
    };

    return (
      <div className="barChart">
        <Bar
          data={barChartData}
          options={{
            title: {
              display: displayTitle,
              text: `Top 5 States with Positive Cases on ${convertDate()}`,
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
