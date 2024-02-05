import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useAppContext } from './AppContext';
import returnImage from './return.png';

const YouTube = () => {
  const { dispatch } = useAppContext();  
  const [channelId, setChannelId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [subscribersCount, setSubscribersCount] = useState(null);
  const [viewsCount, setViewsCount] = useState(null);
  const [commentsCount, setCommentsCount] = useState(null);
  const [likesCount, setLikesCount] = useState(null);
  const [channelName, setChannelName] = useState('');
  const [videoName, setVideoName] = useState('');

  const handleChannelChange = (e) => {
    setChannelId(e.target.value);
  };

  const handleVideoChange = (e) => {
    setVideoId(e.target.value);
  };

  const handleGetChannelSubscribers = async () => {
    try {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;  
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`
      );
  
      const channelData = response.data.items[0];
      const subsCount = channelData.statistics.subscriberCount;
      const channelName = channelData.snippet.title;
  
      setSubscribersCount(subsCount);
      setChannelName(channelName);
  
      dispatch({
        type: 'ADD_YOUTUBE_REQUEST',
        payload: {
          channelId,
          timestamp: Date.now(),
          data: {
            subscribersCount: subsCount,
            channelName,
          },
        },
      });
    } catch (error) {
      console.error('Error fetching channel information:', error);
    }
  };

  const handleGetVideoStats = async () => {
    try {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
      );
  
      const videoData = response.data.items[0];
      const viewsCount = videoData.statistics.viewCount;
      const commentsCount = videoData.statistics.commentCount;
      const likesCount = videoData.statistics.likeCount;
      const name = videoData.snippet.title;
  
      setViewsCount(viewsCount);
      setCommentsCount(commentsCount);
      setLikesCount(likesCount);
      setVideoName(name);
  
      dispatch({
        type: 'ADD_YOUTUBE_STATS_REQUEST',
        payload: {
          timestamp: Date.now(),
          data: {
            viewsCount,
            commentsCount,
            likesCount,
            videoName: name,
          },
        },
      });
    } catch (error) {
      console.error('Error fetching video information:', error);
    }
  };  

  const chartData = [
    { name: 'Subscribers', count: subscribersCount },
    { name: 'Views', count: viewsCount },
    { name: 'Comments', count: commentsCount },
    { name: 'Likes', count: likesCount },
  ];

  const returnButton = (
    <button
      onClick={() => {
        window.location.href = 'http://localhost:3000/Dashboard#/dashboard';
      }}
    >
      <img src={returnImage} alt="Return" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
      Go to Dashboard
    </button>
  );

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="channelInput">Choose your channel:</label>
        <input
          type="text"
          id="channelInput"
          value={channelId}
          onChange={handleChannelChange}
          placeholder="Enter channel ID"
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleGetChannelSubscribers}>Get Subscribers</button>
      </div>
      <div style={{ marginBottom: '20px' }}>{returnButton}</div>
      {subscribersCount !== null && (
        <div style={{ marginBottom: '20px' }}>
          <p>
            <strong>Subscribers count for {channelName}:</strong> {subscribersCount}
          </p>
        </div>
      )}

      {channelName !== '' && (
        <div style={{ marginBottom: '20px' }}>
          <p>
            <strong>Channel name:</strong> {channelName}
          </p>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="videoInput">Enter video ID:</label>
        <input
          type="text"
          id="videoInput"
          value={videoId}
          onChange={handleVideoChange}
          placeholder="Enter video ID"
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleGetVideoStats}>Get Video Stats</button>
      </div>

      {viewsCount !== null && (
        <div style={{ marginBottom: '20px' }}>
          <p>
            <strong>Views count for video {videoName}:</strong> {viewsCount}
          </p>
        </div>
      )}
      {commentsCount !== null && (
        <div style={{ marginBottom: '20px' }}>
          <p>
            <strong>Comments count for video {videoName}:</strong> {commentsCount}
          </p>
        </div>
      )}
      {likesCount !== null && (
        <div style={{ marginBottom: '20px' }}>
          <p>
            <strong>Likes count for video {videoName}:</strong> {likesCount}
          </p>
        </div>
      )}

      {chartData.some((data) => data.count !== null) && (
        <div style={{ marginTop: '20px' }}>
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default YouTube;