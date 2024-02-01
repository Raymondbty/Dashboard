import React from 'react';
import { useAppContext } from './AppContext';

const Widgets = () => {
  const { state } = useAppContext();

  return (
    <div>
      <h2>Saved Weather Requests</h2>
      <ul>
        {state.weatherRequests.map((request, index) => (
          <li key={index}>{request.city} - {new Date(request.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Widgets;