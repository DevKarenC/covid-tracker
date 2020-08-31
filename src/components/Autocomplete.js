import React, { PureComponent } from 'react';
import { Dropdown } from 'semantic-ui-react';
import '../index.css';

// Display default state based on user location

class Autocomplete extends PureComponent {
  render() {
    const {
      props: { onChangeDropdown, optionList },
    } = this;

    return (
      <div className="search">
        <Dropdown
          placeholder="United States"
          onChange={onChangeDropdown}
          search
          selection
          options={optionList}
        />
      </div>
    );
  }
}

export default Autocomplete;
