import React, { Component } from 'react';
import Dropdown from './components/Dropdown';
import USTopTenPositive from './components/unitedstates/USTopTenPositive';
import USPositiveHistory from './components/unitedstates/USPositiveHistory';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentData: [],
      stateHistoricalData: [],
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
          stateHistoricalData: json[1],
          usHistoricalData: json[2],
        });
      });
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
    const { isLoaded, location, currentData, usHistoricalData } = this.state;

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
          currentData={currentData}
          chartDate={currentData[0].date}
        />
        <USPositiveHistory usHistoricalData={usHistoricalData} />
      </div>
    );
  }
}

export default App;
