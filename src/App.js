/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import _ from 'lodash';
import Loading from './components/Loading';
import githubLogo from './images/GitHub-Mark-Light-120px-plus.png';
import LinkedinLogo from './images/LI-In-Bug.png';
import Autocomplete from './components/Autocomplete';
import USTopTenPositive from './components/unitedstates/USTopTenPositive';
import USPositiveHistory from './components/unitedstates/USPositiveHistory';
import StatePieChart from './components/states/StatePieChart';
import SummaryStats from './components/SummaryStats';
import { STATE_ABB } from './constants/index';
import './index.css';

// Hospitality/Travel/Entertainment/Retail industries pre and post corona
// Revenue by industry, planes leaving in and out of the US (quantity)
// Unemployment rates
// Tech industry pre and post corona (probably doing better after corona?)

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentData: [],
      usCurrentData: [],
      stateHistoricalData: [],
      usHistoricalData: [],
      statePopulation: [],
      isLoaded: false,
      location: 'United States',
    };
  }

  componentDidMount() {
    Promise.all([
      fetch('https://api.covidtracking.com/v1/states/current.json'),
      fetch('https://api.covidtracking.com/v1/states/daily.json'),
      fetch('https://api.covidtracking.com/v1/us/daily.json'),
      fetch('https://api.covidtracking.com/v1/us/current.json'),
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
          usCurrentData: json[3],
          statePopulation: json[4].slice(1),
        });
      });
  }

  onChangeDropdown = (e, data) => {
    this.setState({
      location: data.value,
    });
  };

  stickyHeader = () => {};

  render() {
    const {
      isLoaded,
      location,
      currentData,
      usCurrentData,
      stateHistoricalData,
      usHistoricalData,
      statePopulation,
    } = this.state;

    const options = Object.keys(STATE_ABB);
    const optionList = _.map(options, (option, index) => ({
      key: options[index],
      text: option,
      value: options[index],
    }));

    if (!isLoaded) {
      return <Loading />;
    }

    return (
      <div className="App">
        <div className="nav">
          <header className="header">
            <div className="title">US Covid-19 Tracker</div>
            <Autocomplete
              location={location}
              onChangeDropdown={this.onChangeDropdown}
              optionList={optionList}
            />
            <div className="icons">
              <a href="https://github.com/DevKarenC" target="_blank">
                <img className="icon" src={githubLogo} alt="Github Logo" />
              </a>
              <a
                href="https://www.linkedin.com/in/seungahchoi/"
                target="_blank"
              >
                <img className="icon" src={LinkedinLogo} alt="Linkedin Logo" />
              </a>
            </div>
          </header>
          <SummaryStats
            currentData={currentData}
            usCurrentData={usCurrentData}
            location={location}
          />
        </div>
        <div className="content">
          <USTopTenPositive
            currentData={currentData}
            chartDate={currentData[0].date}
            location={location}
          />
          <USPositiveHistory usHistoricalData={usHistoricalData} />
          <StatePieChart
            statePopulation={statePopulation}
            currentData={currentData}
            usCurrentData={usCurrentData}
            location={location}
          />
        </div>
      </div>
    );
  }
}

export default App;
