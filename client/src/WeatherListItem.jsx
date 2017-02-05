import React from 'react';

export default class WeatherListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ''
    }
  }

  getWeatherImage() {
    let code = parseInt(this.props.forecastItem.code);
    if ([0, 1, 2, 5, 6, 8, 9, 10, 11, 12, 35, 39, 40].indexOf(code) > -1) {
      this.setState({
        image: '../images/cloud.rain.png'
      });
    } else if ([3, 4, 37, 38, 45, 47].indexOf(code) > -1) {
      this.setState({
        image: '../images/cloud.dark.lightning.png'
      });
    } else if ([7, 13, 14, 15, 16, 17, 18, 41, 42, 43, 46].indexOf(code) > -1) {
      this.setState({
        image: '../images/cloud.snow.png'
      });
    } else if ([19, 20, 21, 22, 23, 24, 25].indexOf(code) > -1) {
      this.setState({
        image: '../images/cloud.fog.png'
      });
    } else if ([26, 27, 28, 29, 30, 44].indexOf(code) > -1) {
      this.setState({
        image: '../images/cloud.png'
      });
    } else if ([32, 34, 36].indexOf(code) > -1) {
      this.setState({
        image: '../images/sunny.png'
      });
    } else if ([31, 33].indexOf(code) > -1) {
      this.setState({
        image: '../images/moon.png'
      });
    }
  }

  shouldComponentUpdate() {
    this.getWeatherImage();
    return true;
  }

  // componentWillUpdate() {
  //   this.getWeatherImage();
  // }

  // componentDidUpdate() {
  //   this.getWeatherImage();
  // }

  // componentWillMount() {
  //   this.getWeatherImage();
  // }

  // componentDidMount() {
  //   this.getWeatherImage();
  // }

  render() {
    return (
      <div className="weather-list-item">
        <p className="date">{this.props.forecastItem.day}, {this.props.forecastItem.date}</p>
        <p className="highTemp">High: {this.props.forecastItem.high}°F</p>
        <p className="lowTemp">Low: {this.props.forecastItem.low}°F</p>
        <p className="description">{this.props.forecastItem.text}</p>
        <img className="icon" src={this.state.image} />
      </div>
    );
  }
}