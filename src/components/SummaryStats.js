import React, { Component } from 'react';
import { STATE_ABB } from '../constants/index';

class SummaryStats extends Component {
  findStats(stateFullName) {
    const { currentData, usCurrentData } = this.props;
    const stateNameIdentifier = STATE_ABB[stateFullName];
    if (stateFullName === 'United States') {
      const newPositives = usCurrentData[0].positiveIncrease.toLocaleString();
      const cumulative = usCurrentData[0].positive.toLocaleString();
      return [newPositives, cumulative];
    }
    const getTotalPositivesPerState = {};
    const getNewPositivesPerState = {};
    currentData.forEach((stateData) => {
      const stateName = stateData.state;
      getTotalPositivesPerState[stateName] = stateData.positive;
      getNewPositivesPerState[stateName] = stateData.positiveIncrease;
    });
    const cumulative = getTotalPositivesPerState[
      stateNameIdentifier
    ].toLocaleString();
    const newPositives = getNewPositivesPerState[
      stateNameIdentifier
    ].toLocaleString();
    return [newPositives, cumulative];
  }

  render() {
    const { location } = this.props;

    return (
      <div className="summary">
        <span> Daily New: {this.findStats(location)[0]} </span>
        <span> Cumulative: {this.findStats(location)[1]} </span>
      </div>
    );
  }
}

export default SummaryStats;
