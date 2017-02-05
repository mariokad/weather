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
    e.preventDefault();
    this.setState({
      area: e.target.value
    });
  }

  handleInputChange(e) {
    e.preventDefault();
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
            <option value="Austin, TX">Austin, TX</option>
            <option value="Honolulu, HI">Honolulu, HI</option>
            <option value="London, England">London, England</option>
            <option value="Los Angeles, CA">Los Angeles, CA</option>
            <option value="Miami, FL">Miami, FL</option>
            <option value="New York, NY">New York, NY</option>
            <option value="San Francisco, CA">San Francisco, CA</option>
            <option value="Seattle, WA">Seattle, WA</option>
            <option value="Tokyo, JP">Tokyo, JP</option>
            <option value="Vancouver, BC, CA">Vancouver, BC, CA</option>
          </select>
        </div>
        <div className="input">
          <label>
            Find a city:
          </label>
          <br />
          <input className="city-input" type="text" placeholder="City, (State or Country)" onChange={(e) => this.setState({area: e.target.value})}/>
        </div>
        <div className="forecast-container">
          <WeatherList forecast={this.state.forecast} />
        </div>
      </div>
    );
  }
}