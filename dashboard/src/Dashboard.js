import React from 'react';
import { useNavigate } from 'react-router-dom';
import weatherIcon from './weather.png';
import discordIcon from './discord.png';
import widgetsIcon from './widget.png';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const redirectToWeather = () => {
    navigate('/weather');
  };

  const redirectToDiscord = () => {
    navigate('/discord');
  };

  const redirectToWidgets = () => {
    navigate('/widgets');
  };

  return (
    <div className="container">
      <div className="item" onClick={redirectToWeather}>
        <img src={weatherIcon} alt="Weather" width="100" height="100" />
        <p>Weather</p>
      </div>
      <div className="item" onClick={redirectToDiscord}>
        <img src={discordIcon} alt="Discord" width="100" height="100" />
        <p>Discord</p>
      </div>
      <div className="item" onClick={redirectToWidgets}>
        <img src={widgetsIcon} alt="Widgets" width="100" height="100" />
        <p>Widgets</p>
      </div>
    </div>
  );
};

export default Dashboard;