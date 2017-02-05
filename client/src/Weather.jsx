import React from 'react';
import axios from 'axios';
import WeatherList from './WeatherList.jsx';

export default class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
      area: '',
      forecast: []
    }
  }

  handleSelect(e) {
    this.setState({
      area: e.target.value
    });
  }

  getWeather() {
    let query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + this.state.area.toLowerCase() + '")';
    axios.get('https://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json')
      .then((res) => this.setState({forecast: res.data.query.results.channel.item.forecast}))
      .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    this.getWeather();
  }

  render() {
    return (
      <div className="weather-container">
        <p className="weather-header">Weather Seeker</p>
        <div className="dropdown">
          <select className="city-dropdown" defaultValue={this.state.area} onChange={this.handleSelect.bind(this)}>
            <option value="">Popular Cities</option>
            <option value="Austin, TX">Austin</option>
            <option value="Los Angeles, CA">Los Angeles</option>
            <option value="Miami, FL">Miami</option>
            <option value="New York, NY">New York</option>
            <option value="San Francisco, CA">San Francisco</option>
            <option value="Seattle, WA">Seattle</option>
            <option value="Vancouver, BC, CA">Vancouver</option>
          </select>
          <p>Weather forecast for:</p> <p className="view-city">{this.state.area}</p>
        </div>
        <div className="forecast-container">
          <WeatherList forecast={this.state.forecast} />
        </div>
      </div>
    );
  }
}