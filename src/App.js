import React, { Component } from 'react';
import Dropdown from './components/Dropdown';
import BarChart from './components/BarChart';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      covidData: [],
      isLoaded: false,
      location: '',
      barChartData: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('https://api.covidtracking.com/v1/states/current.json')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          covidData: json,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isLoaded && this.state.isLoaded) {
      this.setBarChartData();
    }
  }

  sortDescending() {
    const size = 5;
    const covidDataCopy = this.state.covidData.map((stateData) => {
      const positiveIncreaseArray = {
        positiveIncrease: stateData.positiveIncrease,
        stateName: stateData.state,
      };
      return positiveIncreaseArray;
    });
    return covidDataCopy
      .sort((a, b) => b.positiveIncrease - a.positiveIncrease)
      .slice(0, size);
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
          },
        ],
      },
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
    const { isLoaded, location, barChartData } = this.state;

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
        <BarChart barChartData={barChartData} />
      </div>
    );
  }
}

export default App;
