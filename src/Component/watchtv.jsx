import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const WatchTv = () => {
  const { tvName, seasonNum, episodeNum, id } = useParams(); // Fetching params from the URL
  const navigate = useNavigate();
  const [selectedServer, setSelectedServer] = useState('server1');

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  useEffect(() => {
    const detectDevTools = () => {
      const threshold = 100;
      const start = performance.now();

      const element = new Image();
      Object.defineProperty(element, 'id', {
        get: () => {
          navigate(-1);
        }
      });

      console.log(element);
      console.clear();

      const end = performance.now();
      if (end - start > threshold) {
        navigate(-1);
      }
    };

    const intervalId = setInterval(detectDevTools, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const formattedTvName = tvName.replace(/\s+/g, '-'); // Replace spaces with hyphens

  let streamUrl;
  const seasonNumber = seasonNum; // Use the correct season number from params



  return (
    <div className='watch-movie-container'>
      <iframe
        className='watch'
        src={streamUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title="Watch TV"
      />
      <div className="server-select">
        <button
          onClick={() => setSelectedServer('server1')}
          className={selectedServer === 'server1' ? 'active' : ''}
        >
          Server 1
        </button>
        <button
          onClick={() => setSelectedServer('server2')}
          className={selectedServer === 'server2' ? 'active' : ''}
        >
          Server 2
        </button>
        <button
          onClick={() => setSelectedServer('server3')}
          className={selectedServer === 'server3' ? 'active' : ''}
        >
          Server 3
        </button>
      </div>
    </div>
  );
};

export default WatchTv;
