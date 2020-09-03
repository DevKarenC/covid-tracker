import React, { Component } from 'react';
import { STATE_ABB } from '../constants/index';

class SummaryStats extends Component {
  findStats(stateFullName) {
    const { currentData, usCurrentData } = this.props;
    const stateAcronymIdentifier = STATE_ABB[stateFullName];
    if (stateFullName === 'United States') {
      const newPositives = usCurrentData[0].positiveIncrease.toLocaleString();
      const newDeath = usCurrentData[0].deathIncrease.toLocaleString();
      const totalPositives = usCurrentData[0].positive.toLocaleString();
      const totalDeath = usCurrentData[0].death.toLocaleString();
      return [newPositives, newDeath, totalPositives, totalDeath];
    }
    const getTotalPositivesPerState = {};
    const getTotalDeathPerState = {};
    const getNewPositivesPerState = {};
    const getNewDeathPerState = {};
    currentData.forEach((stateData) => {
      const stateAcronym = stateData.state;
      getTotalPositivesPerState[stateAcronym] = stateData.positive;
      getTotalDeathPerState[stateAcronym] = stateData.death;
      getNewPositivesPerState[stateAcronym] = stateData.positiveIncrease;
      getNewDeathPerState[stateAcronym] = stateData.deathIncrease;
    });
    const newPositives = getNewPositivesPerState[
      stateAcronymIdentifier
    ].toLocaleString();
    const newDeath = getNewDeathPerState[
      stateAcronymIdentifier
    ].toLocaleString();
    const totalPositives = getTotalPositivesPerState[
      stateAcronymIdentifier
    ].toLocaleString();
    const totalDeath = getTotalDeathPerState[
      stateAcronymIdentifier
    ].toLocaleString();
    return [newPositives, newDeath, totalPositives, totalDeath];
  }

  render() {
    const { location } = this.props;

    return (
      <div className="summary">
        <span> New Cases: {this.findStats(location)[0]} </span>
        <span> Death: {this.findStats(location)[1]} </span>
        <span> Total Cases: {this.findStats(location)[2]} </span>
        <span> Total Death: {this.findStats(location)[3]} </span>
      </div>
    );
  }
}

export default SummaryStats;
