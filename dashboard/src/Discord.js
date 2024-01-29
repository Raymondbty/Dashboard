import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import CreateServer from './CreateServer';
import PingUser from './PingUser';
import discordIcon from './discord.png';
import './Discord.css';

const Discord = () => {
  const handleDiscordLogin = () => {
    const clientId = '1170627038776934400';
    const redirectUri = 'http://localhost:3000/discord';
    const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify`;

    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Discord Dashboard</h1>
      <div className="discord-service-container">
        <img src={discordIcon} alt="Discord Icon" />
        <h3>Discord</h3>
        <button onClick={handleDiscordLogin}>Login with Discord</button>
      </div>
      <div className="discord-widgets-container">
        <Routes>
          <Route
            path="create-server"
            element={<CreateServer />}
          />
          <Route
            path="ping-user"
            element={<PingUser />}
          />
        </Routes>
      </div>
      <div className="discord-navigation">
        <Link to="create-server" className="discord-nav-item">Create Server</Link>
        <Link to="ping-user" className="discord-nav-item">Ping User</Link>
      </div>
    </div>
  );
};

export default Discord;