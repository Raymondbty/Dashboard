import React from 'react';
import WeatherService from './Weather';
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
      <div>
        <h2>Dashboard</h2>
        <div className="services">
          <Link to="/weather">
            <WeatherService />
          </Link>
        </div>
      </div>
    );
  };

export default Dashboard;