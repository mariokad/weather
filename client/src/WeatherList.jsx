import React from 'react';
import WeatherListItem from './WeatherListItem.jsx';

export default class WeatherList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="weather-list">
        {
          this.props.forecast.map((item, i) => (
            <WeatherListItem key={i} forecastItem={item}/>
          ))
        }
      </div>
    );
  }
}