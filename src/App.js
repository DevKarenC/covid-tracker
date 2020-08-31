import React, { Component } from 'react';
import Dropdown from './components/Dropdown';
import USTopTenPositive from './components/unitedstates/USTopTenPositive';
import USPositiveHistory from './components/unitedstates/USPositiveHistory';
import StatePieChart from './components/states/StatePieChart';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentData: [],
      stateHistoricalData: [],
      usHistoricalData: [],
      statePopulation: [],
      isLoaded: false,
      location: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Promise.all([
      fetch('https://api.covidtracking.com/v1/states/current.json'),
      fetch('https://api.covidtracking.com/v1/states/daily.json'),
      fetch('https://api.covidtracking.com/v1/us/daily.json'),
      fetch(
        'https://api.census.gov/data/2019/pep/population?get=POP&for=state:*&key=4a5835d028a32a11f16248acfe542c30695c2ae8',
      ),
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
          statePopulation: json[3].slice(1),
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
    const {
      isLoaded,
      location,
      currentData,
      stateHistoricalData,
      usHistoricalData,
      statePopulation,
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
          currentData={currentData}
          chartDate={currentData[0].date}
        />
        <USPositiveHistory usHistoricalData={usHistoricalData} />
        <StatePieChart
          statePopulation={statePopulation}
          currentData={currentData}
          location={location}
        />
      </div>
    );
  }
}

export default App;
