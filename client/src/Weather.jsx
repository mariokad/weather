import React from 'react';
import axios from 'axios';
import WeatherList from './WeatherList.jsx';

export default class Weather extends React.Component {
  constructor() {
    super();

    if (document.cookie) {
      this.state = {
        area: decodeURI(document.cookie.split('area=')[1].split(';')[0]),
        forecast: JSON.parse(decodeURI(document.cookie.split('forecast=')[1]))
      }      
    } else {
      this.state = {
        area: '',
        forecast: []
      }
    }

    this.getWeather = this.getWeather.bind(this);
    // this.getWeatherImage = this.getWeatherImage.bind(this);
  }

  makeCookie(val) {
    const today = new Date();
    const expire = new Date();

    expire.setTime(today.getTime() + (360000 * 24 * 365));
    document.cookie = 'area=' + encodeURI(val) + ';expires' + expire.toGMTString();
    document.cookie = 'forecast=' + encodeURI(JSON.stringify(this.state.forecast)) + ';expires' + expire.toGMTString();
  }

  handleSelect(e) {
    e.preventDefault();
    console.log('target', e.target.value);
    this.setState({
      area: e.target.value
    });
    this.getWeather();
  }

  getWeather() {
    const context = this;
    const query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + this.state.area.toLowerCase() + '")';
    axios.get('https://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json')
        .then(function(res) {
          // const forecast = res.data.query.results.channel.item.forecast;
          // for (var i = 0; i < forecast.length; i++) {
          //   if (context.state.forecast.length < 10) {
          //     context.setState({forecast: context.state.forecast.concat(context.getWeatherImage(forecast[i]))});
          //   }
          // }
          context.setState({forecast: res.data.query.results.channel.item.forecast.slice(0, 10)});
          context.makeCookie(context.state.area);
        })
        .catch(function(err) {
          console.log(err);
        })
  }

  getWeatherImage(item) {
    var code = parseInt(item.code);
    if ([0, 1, 2, 5, 6, 8, 9, 10, 11, 12, 35, 39, 40].indexOf(code) > -1) {
      return '../images/cloud.rain.png';
    } else if ([3, 4, 37, 38, 45, 47].indexOf(code) > -1) {
      return '../images/cloud.dark.lightning.png';
    } else if ([7, 13, 14, 15, 16, 17, 18, 41, 42, 43, 46].indexOf(code) > -1) {
      return '../images/cloud.snow.png';
    } else if ([19, 20, 21, 22, 23, 24, 25].indexOf(code) > -1) {
      return '../images/cloud.fog.png';
    } else if ([26, 27, 28, 29, 30, 44].indexOf(code) > -1) {
      return '../images/cloud.png';
    } else if ([32, 34, 36].indexOf(code) > -1) {
      return '../images/sunny.png';
    } else if ([31, 33].indexOf(code) > -1) {
      return '../images/moon.png';
    }
  }

  componentDidUpdate() {
    this.getWeather();
  }

  render() {
    let city = this.state.area.split(', ')[0];
    let stateco = this.state.area.split(', ')[1];
    return (
      <div className="weather-container">
        <p className="weather-header">Weather Seeker</p>
        <div className="dropdown">
          <select className="city-dropdown" defaultValue={this.state.area} onChange={this.handleSelect.bind(this)}>
            <option value="">Popular Cities</option>
            <option value="Austin, TX">Austin, TX</option>
            <option value="Honolulu, HI">Honolulu, HI</option>
            <option value="Los Angeles, CA">Los Angeles, CA</option>
            <option value="Miami, FL">Miami, FL</option>
            <option value="New York, NY">New York, NY</option>
            <option value="San Francisco, CA">San Francisco, CA</option>
            <option value="Seattle, WA">Seattle, WA</option>
          </select>
        </div>
        <div className="input">
          <input className="city-input" type="text" placeholder="City, (State or Country)" onChange={(e) => this.setState({area: e.target.value})}/>
        </div>
        <div className="forecast-days">
          <div className="today-forecast">
            <div className="today-info">
              <p className="today-date">{this.state.forecast[0].day}, {this.state.forecast[0].date}</p>
              <p className="today-description">{this.state.forecast[0].text}</p>
              <span className="today-high-temp"><p className="high-temp-icon">▲</p> {this.state.forecast[0].high}°F</span><span className="today-low-temp"><p className="low-temp-icon">▼</p>{this.state.forecast[0].low}°F</span>
            </div>
            <div className="today-icon-contain">
              <img className="today-icon" src={this.getWeatherImage(this.state.forecast[0])} />
            </div>
            <div className="today-area">{city.charAt(0).toUpperCase() + city.slice(1)  + ', ' + stateco.charAt(0).toUpperCase() + stateco.slice(1)}</div>
          </div>
          <div className="forecast-container">
            <WeatherList forecast={this.state.forecast.slice(1)} />
          </div>
        </div>
      </div>
    );
  }
}