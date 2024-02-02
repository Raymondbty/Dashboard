import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from './AppContext';
import { RiMistFill } from "react-icons/ri";
import { CiCloudSun, CiCloud, CiCloudDrizzle, CiSun } from "react-icons/ci";
import { FaRegSnowflake } from "react-icons/fa";
import { LuWind } from "react-icons/lu";
import './Weather.css';

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
        payload: { city, timestamp: Date.now(), data: response.data },
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getWeatherIcon = (weatherDescription) => {
    let iconClassName = "weather-icons";
  
    switch (weatherDescription) {
      case 'Clear':
        iconClassName = "weather-icon-clear";
        return <CiSun className={iconClassName} />;
      case 'Clouds':
        iconClassName = "weather-icon-clouds";
        return <CiCloud className={iconClassName} />;
      case 'Rain':
        iconClassName = "weather-icon-rain";
        return <CiCloudDrizzle className={iconClassName} />;
      case 'Snow':
        iconClassName = "weather-icon-snow";
        return <FaRegSnowflake className={iconClassName} />;
      case 'Wind':
        iconClassName = "weather-icon-wind";
        return <LuWind className={iconClassName} />;
      case 'Mist':
        iconClassName = "weather-icon-mist";
        return <RiMistFill className={iconClassName} />;
      case 'CloudSun':
        return <CiCloudSun className={iconClassName} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="weather-service-container">
      {weatherData && getWeatherIcon(weatherData.weather[0].main)}
      <div className="weather-input-container">
        <input type="text" placeholder="Enter City" value={city} onChange={handleCityChange} />
        <button onClick={handleGetWeather}>Get Weather</button>
      </div>
      {weatherData && (
        <div className="weather-data-container">
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p>Temperature: {weatherData.main.temp} K</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
