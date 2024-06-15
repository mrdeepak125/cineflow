import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const WatchTv = ({ tv }) => {
  const { title, episode } = useParams(); // Assuming your URL now has these params
  const navigate = useNavigate();
  const [selectedServer, setSelectedServer] = useState('server1');

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  useEffect(() => {
    const detectDevTools = () => {
      const threshold = 100;
      const start = performance.now();

      // Using console method interception
      const element = new Image();
      Object.defineProperty(element, 'id', {
        get: () => {
          navigate(-1); // Navigate to the previous page
        }
      });

      console.log(element);
      console.clear();

      // Using debugger statement detection
      const end = performance.now();
      if (end - start > threshold) {
        navigate(-1); // Navigate to the previous page
      }
    };

    const intervalId = setInterval(detectDevTools, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  // Check if tv object is defined
  if (!tv) {
    return <div>Error: TV details not provided.</div>;
  }

  let streamUrl;

  const seasonNumber = tv.seasonNumber || 1; // Default to 1 if not provided
  const episodeNum = tv.episodeNum || episode; // Use episode from URL params if not provided in tv object

  switch (selectedServer) {
    case 'server1':
      streamUrl = `https://2anime.xyz/embed/${title}-${episode}`;
      break;
    case 'server2':
      streamUrl = `https://vidsrc.me/embed/tv?tmdb=${tv.id}&season=${seasonNumber}&episode=${episodeNum}`;
      break;
    case 'server3':
      streamUrl = `https://multiembed.mov/directstream.php?video_id=${tv.id}&tmdb=1&s=${seasonNumber}&e=${episodeNum}`;
      break;
    default:
      streamUrl = `https://2anime.xyz/embed/${title}-${episode}`;
      break;
  }

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
        title="Watch Movie"
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
