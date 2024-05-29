// Watchlist.jsx

import React, { useState, useEffect } from 'react';
import { getAllWatchlistItems } from '../lib/indexedDB';
import { Link } from 'react-router-dom';

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
      async function fetchWatchlist() {
        const items = await getAllWatchlistItems();
        console.log(items); // Log the retrieved watchlist items
        setWatchlist(items);
      }
      fetchWatchlist();
    }, []);
  

  return (
    <div>
      <h1>Watchlist</h1>
      <div className="movie-list">
        {watchlist.map((movie) => (
          <div className='movie-card' key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
           <img
               src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
               alt={movie.title}
           />
           </Link>
           <div className="movie-info">
               <h4>{movie.title}</h4>
               {/* <p>{movie.overview}</p> */}
           </div>
       </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
