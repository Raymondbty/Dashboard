import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';
import axios from 'axios';
import pencilIcon from './pencil.png';
import crossIcon from './cross.png';
import './Widgets.css'

const Widgets = () => {
  const { state, dispatch } = useAppContext();
  const [editingIndex, setEditingIndex] = useState(null);
  const [newCity, setNewCity] = useState('');

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

  const updateWidgetsPeriodically = async () => {
    for (let i = 0; i < state.weatherRequests.length; i++) {
      const request = state.weatherRequests[i];
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${request.city}&appid=ad6e12e12b001e5b3e58fc461af326d9`
        );

        dispatch({
          type: 'UPDATE_WEATHER_REQUEST',
          payload: { index: i, newCity: request.city, newData: response.data },
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(updateWidgetsPeriodically, 60000);

    return () => clearInterval(intervalId);
  }, [state.weatherRequests]);

  return (
    <div>
      <ul>
        {state.weatherRequests.map((request, index) => (
          <li key={index} className={editingIndex === index ? 'editing-container' : ''}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                />
                <div className="edit-buttons">
                  <button onClick={() => handleUpdateWeather(index, newCity)}>
                    <img src={pencilIcon} alt="Edit" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {request.city}, {new Date(request.timestamp).toLocaleString()} <br />
                Temperature: {request.data.main.temp} K <br />
                Description: {request.data.weather[0].description}
                <div className="edit-buttons">
                  <button onClick={() => handleEdit(index)}>
                    <img src={pencilIcon} alt="Edit" />
                  </button>
                  <button onClick={() => handleDelete(index)}>
                    <img src={crossIcon} alt="Delete" />
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