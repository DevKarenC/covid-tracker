/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { defaults } from 'react-chartjs-2';
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

defaults.global.defaultFontColor = 'black';
defaults.global.defaultFontFamily = 'Source Sans Pro';

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
    fetch('/api')
      // fetch('http://localhost:8080/api')
      .then((response) => {
        return new Promise((resolve) => {
          resolve(response.json());
        });
      })
      .then((data) => {
        this.setState({
          isLoaded: true,
          currentData: data[0],
          stateHistoricalData: data[1],
          usHistoricalData: data[2],
          usCurrentData: data[3],
          statePopulation: data[4].slice(1),
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
            <div className="search-icon">
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
                  <img
                    className="icon"
                    src={LinkedinLogo}
                    alt="Linkedin Logo"
                  />
                </a>
              </div>
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
          <USPositiveHistory
            usHistoricalData={usHistoricalData}
            stateHistoricalData={stateHistoricalData}
            location={location}
          />
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
