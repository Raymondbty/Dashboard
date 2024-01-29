import React, { useState } from 'react';
import axios from 'axios';

const CreateServer = () => {
  const [serverName, setServerName] = useState('');

  const handleCreateServer = async () => {
    try {
      const discordToken = 'MTIwMTMwMDMwMjc1ODkzNjU4Ng.GovY9H.WQt93XQElUbLTfTU9Z3BO_BotG1Cm677-3JRcY';
      
      const response = await axios.post(
        `https://discord.com/api/v10/guilds`,
        {
          name: serverName,
        },
        {
          headers: {
            Authorization: `Bot ${discordToken}`,
          },
        }
      );

      console.log('Serveur créé avec succès :', response.data);
    } catch (error) {
      console.error('Erreur lors de la création du serveur :', error);
    }
  };

  return (
    <div>
      <h3>Créer serveur [nom]</h3>
      <input
        type="text"
        placeholder="Nom du serveur"
        value={serverName}
        onChange={(e) => setServerName(e.target.value)}
      />
      <button onClick={handleCreateServer}>Créer le serveur</button>
    </div>
  );
};

export default CreateServer;