import React, { Component } from 'react';
import { STATE_ABB } from '../constants/index';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location, handleChange, handleSubmit } = this.props;

    const stateNames = Object.keys(STATE_ABB);

    const dropdownOptions = stateNames.map((stateName) => (
      <option value={stateName}>{stateName}</option>
    ));

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Select a state:{' '}
          <select value={location} onChange={handleChange}>
            {dropdownOptions}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Dropdown;
