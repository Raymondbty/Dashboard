import React, { useState } from 'react';
import axios from 'axios';

const PingUser = () => {
  const [targetUser, setTargetUser] = useState('');

  const handlePingUser = async () => {
    try {
      const discordToken = 'MTIwMTI5Nzk0NTE0MDY2MjM1Mg.GPHyIB.U60AexZIrqK6BeWLedFnqo7RGqcsRNFKP6YXuc';
      
      const response = await axios.post(
        `https://discord.com/channels/1171104779385192448/1171104780106608695`,
        {
          content: `<@${targetUser}>`,
        },
        {
          headers: {
            Authorization: `Bot ${discordToken}`,
          },
        }
      );

      console.log('Message envoyé avec succès :', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message :', error);
    }
  };

  return (
    <div>
      <h3>Ping @user</h3>
      <input
        type="text"
        placeholder="Nom ou identifiant de l'utilisateur"
        value={targetUser}
        onChange={(e) => setTargetUser(e.target.value)}
      />
      <button onClick={handlePingUser}>Ping</button>
    </div>
  );
};

export default PingUser;