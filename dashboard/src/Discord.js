import React from 'react';
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
    <div className="discord-service-container">
      <img src={discordIcon} alt="Discord Icon" />
      <h3>Discord</h3>
      <button onClick={handleDiscordLogin}>Login with Discord</button>
    </div>
  );
};

export default Discord;