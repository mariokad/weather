import React from 'react';

export default class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
      area: 'San Francisco, CA'
    }
  }

  handleSelect(e) {
    this.setState({area: e.target.value});
  }

  render() {
    var message = 'You selected ' + this.state.area;
    return (
      <div>
        <select defaultValue={this.state.area} onChange={this.handleSelect.bind(this)}>
          <option value="San Francisco, CA">San Francisco, CA</option>
          <option value="New York, NY">New York, NY</option>
          <option value="Seattle, WA">Seattle, WA</option>
        </select>
        <p>{message}</p>
      </div>
    );
  }
}