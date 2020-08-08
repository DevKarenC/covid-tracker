import React, { Component } from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location, handleChange, handleSubmit } = this.props;

    const stateNames = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'District of Columbia',
      'Florida',
      'Georgia',
      'Guam',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ];

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
