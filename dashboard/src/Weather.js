import React, { useState } from 'react';
import axios from 'axios';
import weatherIcon from './weather.png';
import './Weather.css';
import { useAppContext } from './AppContext';

const Weather = () => {
  const { dispatch } = useAppContext();
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleGetWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ad6e12e12b001e5b3e58fc461af326d9`
      );

      setWeatherData(response.data);

      dispatch({
        type: 'ADD_WEATHER_REQUEST',
        payload: { city, timestamp: Date.now() },
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="weather-service-container">
      <img src={weatherIcon} alt="Weather Icon" />
      <div>
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={handleGetWeather}>Get Weather</button>
      </div>
      {weatherData && (
        <div>
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p>Temperature: {weatherData.main.temp} K</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
