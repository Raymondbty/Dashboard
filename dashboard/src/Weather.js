import React from 'react';
import weatherIcon from './weather.png';
import './Weather.css';

const Weather = () => {
  return (
    <div className="weather-service-container">
      <img src={weatherIcon} alt="Weather Icon" />
      <h3>Weather</h3>
    </div>
  );
};

export default Weather;