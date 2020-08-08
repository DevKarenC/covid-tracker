import React, { Component } from 'react';
import Dropdown from './components/Dropdown';
import Chart from './components/Chart';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      location: '',
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
          items: json,
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
    const { isLoaded, items, location } = this.state;

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
        {/* <Chart stateName={this.items.state} /> */}
        <ul>
          {items.map((item) => (
            <li key={item.state}>
              {item.state} {item.positive}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
