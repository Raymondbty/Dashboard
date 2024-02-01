import React from 'react';
import weatherIcon from './weather.png';
import './Weather.css';

const Weather = () => {
  return (
    <div className="weather-service-container">
      <img src={weatherIcon} alt="Weather Icon" />
    </div>
  );
};

export default Weather;