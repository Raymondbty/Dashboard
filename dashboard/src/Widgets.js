import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';
import axios from 'axios';
import crossIcon from './cross.png';
import pencilIcon from './pencil.png';
import { RiMistFill } from 'react-icons/ri';
import { CiCloudSun, CiCloud, CiCloudDrizzle, CiSun } from 'react-icons/ci';
import { FaRegSnowflake } from 'react-icons/fa';
import { LuWind } from 'react-icons/lu';
import './Widgets.css';

const getWeatherIcon = (weatherDescription) => {
  let iconClassName = 'weather-icons';

  switch (weatherDescription) {
    case 'Clear':
      iconClassName = 'weather-icon-clear';
      return <CiSun className={iconClassName} />;
    case 'Clouds':
      iconClassName = 'weather-icon-clouds';
      return <CiCloud className={iconClassName} />;
    case 'Rain':
      iconClassName = 'weather-icon-rain';
      return <CiCloudDrizzle className={iconClassName} />;
    case 'Snow':
      iconClassName = 'weather-icon-snow';
      return <FaRegSnowflake className={iconClassName} />;
    case 'Wind':
      iconClassName = 'weather-icon-wind';
      return <LuWind className={iconClassName} />;
    case 'Mist':
      iconClassName = 'weather-icon-mist';
      return <RiMistFill className={iconClassName} />;
    case 'CloudSun':
      return <CiCloudSun className={iconClassName} />;
    case 'Drizzle':
      iconClassName = 'weather-icon-drizzle';
      return <CiCloudDrizzle className={iconClassName} />;  
    default:
      return null;
  }
};

const Widgets = () => {
  const { state, dispatch } = useAppContext();
  const [editingIndex, setEditingIndex] = useState(null);
  const [newCity, setNewCity] = useState('');
  const [editingYouTubeIndex, setEditingYouTubeIndex] = useState(null);
  const [newChannelName, setNewChannelName] = useState('');

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewCity(state.weatherRequests[index].city);
  };

  const handleUpdateWeather = async (index, city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ad6e12e12b001e5b3e58fc461af326d9`
      );

      dispatch({
        type: 'UPDATE_WEATHER_REQUEST',
        payload: { index, newCity: city, newData: response.data },
      });
      setEditingIndex(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleDelete = (index) => {
    dispatch({
      type: 'DELETE_WEATHER_REQUEST',
      payload: { index },
    });
  };

  const handleEditYouTube = (index) => {
    setEditingYouTubeIndex(index);
    setNewChannelName(state.youtubeRequests[index].data.channelName);
  };

  const handleUpdateYouTube = (index, channelName) => {
    // Implémentez la mise à jour de la demande YouTube ici (similaire à handleUpdateWeather)
    // ...

    setEditingYouTubeIndex(null);
  };

  const handleDeleteYouTubeRequest = (index) => {
    dispatch({
      type: 'DELETE_YOUTUBE_REQUEST',
      payload: { index },
    });
  };

  const updateWidgetsPeriodically = async () => {
    // TODO: timer
  };

  useEffect(() => {
    const intervalId = setInterval(updateWidgetsPeriodically, 60000);

    return () => clearInterval(intervalId);
  }, [state.weatherRequests, state.youtubeRequests]);

  return (
    <div>
      <ul>
        {state.weatherRequests.map((request, index) => (
          <li key={index} className={editingIndex === index ? 'editing-container' : 'weather-service-container'}>
            {editingIndex === index ? (
              <div>
                <input type='text' value={newCity} onChange={(e) => setNewCity(e.target.value)} />
                <div className='edit-buttons'>
                  <button onClick={() => handleUpdateWeather(index, newCity)}>
                    <img src={pencilIcon} alt='Edit' />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {getWeatherIcon(request.data.weather[0].main)}
                {request.city}, {new Date(request.timestamp).toLocaleString()} <br />
                Temperature: {request.data.main.temp} K <br />
                Description: {request.data.weather[0].description}
                <div className='edit-buttons'>
                  <button onClick={() => handleEdit(index)}>
                    <img src={pencilIcon} alt='Edit' />
                  </button>
                  <button onClick={() => handleDelete(index)}>
                    <img src={crossIcon} alt='Delete' />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
        {state.youtubeRequests.map((request, index) => (
          <li key={index} className={editingYouTubeIndex === index ? 'editing-container' : 'youtube-request-container youtube-subscribers-container'}>
            {editingYouTubeIndex === index ? (
              <div>
                <input type='text' value={newChannelName} onChange={(e) => setNewChannelName(e.target.value)} />
                <div className='edit-buttons'>
                  <button onClick={() => handleUpdateYouTube(index, newChannelName)}>
                    <img src={pencilIcon} alt='Edit' />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p>
                  <strong>Channel:</strong> {request.data.channelName} | <strong>Subscribers:</strong> {request.data.subscribersCount}
                </p>
                <p>
                  <strong>Timestamp:</strong> {new Date(request.timestamp).toLocaleString()}
                </p>
                <div className='edit-buttons'>
                  <button onClick={() => handleEditYouTube(index)}>
                    <img src={pencilIcon} alt='Edit' />
                  </button>
                  <button onClick={() => handleDeleteYouTubeRequest(index)}>
                    <img src={crossIcon} alt='Delete' />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Widgets;