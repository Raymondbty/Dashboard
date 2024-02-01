import React from 'react';
import { useAppContext } from './AppContext';

const Widgets = () => {
  const { state, dispatch } = useAppContext();

  const handleDelete = (index) => {
    dispatch({
      type: 'DELETE_WEATHER_REQUEST',
      payload: { index },
    });
  };

  return (
    <div>
      <h2>Saved Weather Requests</h2>
      <ul>
        {state.weatherRequests.map((request, index) => (
          <li key={index}>
            {request.city}, {new Date(request.timestamp).toLocaleString()} <br />
            Temperature: {request.data.main.temp} K <br />
            Description: {request.data.weather[0].description}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Widgets;