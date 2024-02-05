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
  const [newChannelId, setNewChannelId] = useState('');
  const [editingYouTubeStatsIndex, setEditingYouTubeStatsIndex] = useState(null);
  const [newVideoId, setNewVideoId] = useState('');

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewCity(state.weatherRequests[index].city);
  };

  const handleUpdateWeather = async (index, city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ad6e12e12b001e5b3e58fc461af326d9`);
      console.log(`API Response for city ${city}:`, response.data);
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
    setNewChannelId(state.youtubeRequests[index].channelId);
  };

  const handleUpdateYouTube = async (index, channelId) => {
    try {
      const apiKey = 'AIzaSyAv7htuGSYb3GgKvuW2ud-zbbG-tIzyUNg';
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`);
      console.log(`API Response for YouTube Channel ${channelId}:`, response.data);
      const channelData = response.data.items[0];
      const subsCount = channelData.statistics.subscriberCount;
      const channelName = channelData.snippet.title;
  
      dispatch({
        type: 'UPDATE_YOUTUBE_REQUEST',
        payload: {
          index,
          newChannelId: channelId,
          newData: {
            subscribersCount: subsCount,
            channelName,
          },
        },
      });
  
      setEditingYouTubeIndex(null);
    } catch (error) {
      console.error('Error updating YouTube data:', error);
    }
  };

  const handleDeleteYouTubeRequest = (index) => {
    dispatch({
      type: 'DELETE_YOUTUBE_REQUEST',
      payload: { index },
    });
  };

  const handleEditYouTubeStats = (index) => {
    setEditingYouTubeStatsIndex(index);
    setNewVideoId(state.youtubeStatsRequests[index].videoId);
  };

  const handleUpdateYouTubeStats = async (index, videoId) => {
    try {
      const apiKey = 'AIzaSyAv7htuGSYb3GgKvuW2ud-zbbG-tIzyUNg';
  
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
      );
      console.log(`API Response for YouTube Video ${videoId}:`, response.data);
      if (response.data && response.data.items && response.data.items.length > 0) {
        const videoData = response.data.items[0];
        const viewsCount = videoData.statistics && videoData.statistics.viewCount;
        const commentsCount = videoData.statistics && videoData.statistics.commentCount;
        const likesCount = videoData.statistics && videoData.statistics.likeCount;
        const name = videoData.snippet && videoData.snippet.title;
  
        if (viewsCount !== undefined && commentsCount !== undefined && likesCount !== undefined && name) {
          dispatch({
            type: 'UPDATE_YOUTUBE_STATS_REQUEST',
            payload: {
              index,
              newVideoId: videoId,
              newData: {
                viewsCount,
                commentsCount,
                likesCount,
                videoName: name,
              },
            },
          });
  
          setNewVideoId(videoId);
          setEditingYouTubeStatsIndex(null);
        } else {
          console.error('Error fetching video information: Video data is incomplete');
        }
      } else {
        console.error('Error fetching video information: Video data is undefined');
      }
    } catch (error) {
      console.error('Error fetching video information:', error);
    }
  };

  const handleDeleteYouTubeStatsRequest = (index) => {
    dispatch({
      type: 'DELETE_YOUTUBE_STATS_REQUEST',
      payload: { index },
    });
  };

  const updateAllWidgets = async () => {
    console.log('Updating weather requests...');
    for (let i = 0; i < state.weatherRequests.length; i++) {
      const request = state.weatherRequests[i];
      await handleUpdateWeather(i, request.city);
    }
    console.log('Weather requests updated.');
  
    console.log('Updating YouTube requests...');
    for (let i = 0; i < state.youtubeRequests.length; i++) {
      const request = state.youtubeRequests[i];
      await handleUpdateYouTube(i, request.channelId);
    }
    console.log('YouTube requests updated.');
  
    console.log('Updating YouTube stats requests...');
    console.log('YouTube stats requests updated.');
  };

  useEffect(() => {
    updateAllWidgets();
  
    const intervalId = setInterval(() => {
      updateAllWidgets();
      console.log('All widgets updated.');
    }, 60000);
  
    return () => clearInterval(intervalId);
  }, []);
  
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
                <input type='text' value={newChannelId} onChange={(e) => setNewChannelId(e.target.value)} />
                <div className='edit-buttons'>
                  <button onClick={() => handleUpdateYouTube(index, newChannelId)}>
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
        {state.youtubeStatsRequests.map((request, index) => (
          <li key={index} className={editingYouTubeStatsIndex === index ? 'editing-container' : 'youtube-stats-container'}>
            {editingYouTubeStatsIndex === index ? (
              <div>
                <input type='text' value={newVideoId} onChange={(e) => setNewVideoId(e.target.value)} />
                <div className='edit-buttons'>
                  <button onClick={() => handleUpdateYouTubeStats(index, newVideoId)}>
                    <img src={pencilIcon} alt='Edit' />
                  </button>
                </div>
              </div>
            ) : (
              <div className='youtube-stats-card'>
                <p>
                  <strong>Video:</strong> {request.data.videoName} |{' '}
                  <strong>Views:</strong> {request.data.viewsCount} |{' '}
                  <strong>Comments:</strong> {request.data.commentsCount} |{' '}
                  <strong>Likes:</strong> {request.data.likesCount}
                </p>
                <p>
                  <strong>Timestamp:</strong>{' '}
                  {new Date(request.timestamp).toLocaleString()}
                </p>
                <div className='edit-buttons'>
                  <button onClick={() => handleEditYouTubeStats(index)}>
                    <img src={pencilIcon} alt='Edit' />
                  </button>
                  <button onClick={() => handleDeleteYouTubeStatsRequest(index)}>
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