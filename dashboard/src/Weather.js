import React from 'react';
import weatherIcon from './weather.png';

const Weather = () => {
  return (
    <div className="service-container">
      <img src={weatherIcon} alt="Weather Icon" />
      <h3>Weather</h3>
    </div>
  );
};

export default Weather;