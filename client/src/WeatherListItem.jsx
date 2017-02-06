import React from 'react';

export default class WeatherListItem extends React.Component {
  constructor(props) {
    super(props);
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

  // shouldComponentUpdate() {
  //   return true;
  // }

  render() {
    return (
      <div className="weather-list-item">
        <div className="date-desc">
          <p className="day">{this.props.forecastItem.day}</p>
          <p className="date">{this.props.forecastItem.date}</p>
          <p className="description">{this.props.forecastItem.text}</p>
        </div>
        <div className="info">
          <div className="temp">
            <div className="high-temp"><p className="high-temp-icon">▲</p> {this.props.forecastItem.high}°F</div>
            <div className="low-temp">{this.props.forecastItem.low}°F <p className="low-temp-icon">▼</p></div>
          </div>
          <img className="icon" src={this.getWeatherImage(this.props.forecastItem)} />
        </div>
      </div>
    );
  }
}