import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './adBlocker.css'; // Import the ad-blocker CSS

const WatchTv = () => {
  const { tvName, seasonNum, episodeNum, id } = useParams();
  const navigate = useNavigate();
  const [selectedServer, setSelectedServer] = useState('server1');
  const iframeRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  useEffect(() => {
    const blockAdsAndPopups = () => {
      const adSelectors = [
        'iframe[src*="ads"]',
        'iframe[src*="popads"]',
        'iframe[src*="ad"]',
        'div[id*="ads"]',
        'div[class*="ads"]',
        'div[class*="ad"]',
        'div[id*="ad"]',
        'div[class*="banner"]',
        'div[id*="banner"]',
        'div[class*="overlay"]',
        'div[id*="overlay"]',
        'div[class*="popup"]',
        'div[id*="popup"]',
        'div[class*="modal"]',
        'div[id*="modal"]',
        'div[class*="redirect"]',
        'div[id*="redirect"]'
      ];

      adSelectors.forEach(selector => {
        const ads = document.querySelectorAll(selector);
        ads.forEach(ad => ad.remove());
      });

      document.body.addEventListener('click', (e) => {
        if (e.target.closest('a') && e.target.closest('a').href.includes('redirect')) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);

      document.body.addEventListener('mousedown', (e) => {
        if (e.target.closest('a') && e.target.closest('a').href.includes('redirect')) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);

      document.body.addEventListener('mouseup', (e) => {
        if (e.target.closest('a') && e.target.closest('a').href.includes('redirect')) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);

      window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.returnValue = '';
      }, true);
    };

    blockAdsAndPopups();
    const observer = new MutationObserver(blockAdsAndPopups);
    observer.observe(document.body, { childList: true, subtree: true });

    const handleIframeLoad = () => {
      try {
        const iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;

        const observer = new MutationObserver(blockAdsAndPopups);
        observer.observe(iframeDocument.body, { childList: true, subtree: true });

        iframeDocument.body.addEventListener('click', (e) => {
          if (e.target.closest('a') && e.target.closest('a').href.includes('redirect')) {
            e.preventDefault();
            e.stopPropagation();
          }
        }, true);

        iframeDocument.body.addEventListener('mousedown', (e) => {
          if (e.target.closest('a') && e.target.closest('a').href.includes('redirect')) {
            e.preventDefault();
            e.stopPropagation();
          }
        }, true);

        iframeDocument.body.addEventListener('mouseup', (e) => {
          if (e.target.closest('a') && e.target.closest('a').href.includes('redirect')) {
            e.preventDefault();
            e.stopPropagation();
          }
        }, true);

        iframeDocument.body.addEventListener('beforeunload', (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.returnValue = '';
        }, true);

        blockAdsAndPopups();
      } catch (error) {
        console.error('Cross-origin iframe: Cannot access content');
      }
    };

    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleIframeLoad);
      }
      observer.disconnect();
    };
  }, []);

  const formattedTvName = tvName.replace(/\s+/g, '-');

  let streamUrl;
  const seasonNumber = seasonNum;

  switch (selectedServer) {
    
  }

  return (
    <div className='watch-movie-container'>
      <iframe
        ref={iframeRef}
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
        <button
          onClick={() => setSelectedServer('server4')}
          className={selectedServer === 'server4' ? 'active' : ''}
        >
          Server 4
        </button>
        <button
          onClick={() => setSelectedServer('server5')}
          className={selectedServer === 'server5' ? 'active' : ''}
        >
          Server 5
        </button>
      </div>
    </div>
  );
};

export default WatchTv;
