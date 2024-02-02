import React, { useState } from 'react';
import axios from 'axios';

const YouTube = () => {
  const [channelId, setChannelId] = useState('');
  const [subscribersCount, setSubscribersCount] = useState(null);

  const handleChannelChange = (e) => {
    setChannelId(e.target.value);
  };

  const handleValidate = async () => {
    try {
      const apiKey = 'AIzaSyAv7htuGSYb3GgKvuW2ud-zbbG-tIzyUNg';

      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
      );

      const subsCount = response.data.items[0]?.statistics.subscriberCount;
      setSubscribersCount(subsCount);
    } catch (error) {
      console.error('Error fetching channel information:', error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="channelInput">Choose your channel:</label>
        <input
          type="text"
          id="channelInput"
          value={channelId}
          onChange={handleChannelChange}
          placeholder="Enter channel ID"
        />
        <button onClick={handleValidate}>Validate</button>
      </div>
      {subscribersCount !== null && (
        <div>
          <p>Subscribers count for {channelId}: {subscribersCount}</p>
        </div>
      )}
    </div>
  );
};

export default YouTube;
