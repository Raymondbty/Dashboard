import React from 'react';
import discordIcon from './discord.png';
import './Discord.css';

const Discord = () => {
  return (
    <div className="discord-service-container">
      <img src={discordIcon} alt="Discord Icon" />
      <h3>Discord</h3>
    </div>
  );
};

export default Discord;