import React, { useState } from 'react';
import axios from 'axios';

      const YouTube = () => {
        const [channelId, setChannelId] = useState('');
        const [videoId, setVideoId] = useState('');
        const [subscribersCount, setSubscribersCount] = useState(null);
        const [viewsCount, setViewsCount] = useState(null);
        const [commentsCount, setCommentsCount] = useState(null);
        const [likesCount, setLikesCount] = useState(null);
      
        const handleChannelChange = (e) => {
          setChannelId(e.target.value);
        };
      
        const handleVideoChange = (e) => {
          setVideoId(e.target.value);
        };
      
        const handleGetChannelSubscribers = async () => {
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
      
        const handleGetVideoStats = async () => {
          try {
            const apiKey = 'AIzaSyAv7htuGSYb3GgKvuW2ud-zbbG-tIzyUNg';
      
            const response = await axios.get(
              `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`
            );
      
            const videoStats = response.data.items[0]?.statistics;
            setViewsCount(videoStats?.viewCount);
            setCommentsCount(videoStats?.commentCount);
            setLikesCount(videoStats?.likeCount);
          } catch (error) {
            console.error('Error fetching video information:', error);
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
              <button onClick={handleGetChannelSubscribers}>Get Subscribers</button>
            </div>
      
            {subscribersCount !== null && (
              <div>
                <p>Subscribers count for {channelId}: {subscribersCount}</p>
              </div>
            )}
      
            <div>
              <label htmlFor="videoInput">Enter video ID:</label>
              <input
                type="text"
                id="videoInput"
                value={videoId}
                onChange={handleVideoChange}
                placeholder="Enter video ID"
              />
              <button onClick={handleGetVideoStats}>Get Video Stats</button>
            </div>
      
            {viewsCount !== null && (
              <div>
                <p>Views count for video {videoId}: {viewsCount}</p>
              </div>
            )}
            {commentsCount !== null && (
              <div>
                <p>Comments count for video {videoId}: {commentsCount}</p>
              </div>
            )}
            {likesCount !== null && (
              <div>
                <p>Likes count for video {videoId}: {likesCount}</p>
              </div>
            )}
          </div>
        );
      };
      
      export default YouTube;