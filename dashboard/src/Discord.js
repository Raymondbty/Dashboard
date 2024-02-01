import React from 'react';
import discordIcon from './discord.png';
import './Discord.css';

const Discord = () => {
  const redirectToGoogle = () => {
    window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1170627038776934400&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fdiscord%2Fcallback&scope=identify';
  };

  return (
    <div className="discord-service-container" onClick={redirectToGoogle}>
      <img src={discordIcon} alt="Discord Icon" />
    </div>
  );
};

export default Discord;
