import React from 'react';

export default class WeatherListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="weather-list-item">
        <p className="date">{this.props.forecastItem.day}, {this.props.forecastItem.date}</p>
        <p className="highTemp">High: {this.props.forecastItem.high}</p>
        <p className="lowTemp">Low: {this.props.forecastItem.low}</p>
        <p className="description">{this.props.forecastItem.text}</p>
      </div>
    );
  }
}