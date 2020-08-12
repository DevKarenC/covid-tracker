import React, { Component } from 'react';
import Dropdown from './components/Dropdown';
import USTopTenPositive from './components/USTopTenPositive';
import USPositiveHistory from './components/USPositiveHistory';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentData: [],
      historicalData: [],
      usHistoricalData: [],
      isLoaded: false,
      location: '',
      barChartData: {},
      lineChartData: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Promise.all([
      fetch('https://api.covidtracking.com/v1/states/current.json'),
      fetch('https://api.covidtracking.com/v1/states/daily.json'),
      fetch('https://api.covidtracking.com/v1/us/daily.json'),
    ])
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((json) => {
        this.setState({
          isLoaded: true,
          currentData: json[0],
          historicalData: json[1],
          usHistoricalData: json[2],
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isLoaded && this.state.isLoaded) {
      this.setBarChartData();
      this.setLineChartData();
    }
  }

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

  setBarChartData() {
    this.setState({
      barChartData: {
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
      },
    });
  }

  setLineLabels() {
    const labels = this.state.usHistoricalData.map((dailyData) => {
      return dailyData.date;
    });
    return labels.reverse();
  }

  setLineData() {
    const lineData = this.state.usHistoricalData.map((dailyData) => {
      return dailyData.positive;
    });
    return lineData.reverse();
  }

  setLineChartData() {
    this.setState({
      lineChartData: {
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
      },
    });
  }

  sortDescending() {
    const size = 10;
    const currentDataCopy = this.state.currentData.map((stateData) => {
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

  handleChange(event) {
    this.setState({ location: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ location: event.target.value });
    alert('submitted');
    event.preventDefault();
  }

  render() {
    const {
      isLoaded,
      location,
      currentData,
      barChartData,
      lineChartData,
    } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <div className="App">
        <Dropdown
          location={location}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <USTopTenPositive
          barChartData={barChartData}
          chartDate={currentData[0].date}
        />
        <USPositiveHistory lineChartData={lineChartData} />
      </div>
    );
  }
}

export default App;
