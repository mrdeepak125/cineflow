import React, { useState, useEffect } from 'react';
import { getAllMovieWatchlistItems, getAllTvWatchlistItems } from '../lib/indexedDB';
import { Link } from 'react-router-dom';
import WatchlistEmpty from '../assets/watching_movies-removebg-preview.png'
const placeholderImage = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg';
const placeholderTvImage = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

function Watchlist() {
  const [movieWatchlist, setMovieWatchlist] = useState([]);
  const [tvWatchlist, setTvWatchlist] = useState([]);

  useEffect(() => {
    async function fetchWatchlist() {
      const movieItems = await getAllMovieWatchlistItems();
      const tvItems = await getAllTvWatchlistItems();
      setMovieWatchlist(movieItems);
      setTvWatchlist(tvItems);
    }
    fetchWatchlist();
  }, []);

  const isMovieWatchlistEmpty = movieWatchlist.length === 0;
  const isTvWatchlistEmpty = tvWatchlist.length === 0;

  return (
    <div>
      <h1>Watchlist</h1>

      {isMovieWatchlistEmpty && isTvWatchlistEmpty ? (
        <div className="no-results">
          <img src={WatchlistEmpty} alt="No items in watchlist" />
          <p>Your watchlist is empty. Add some movies and TV shows to get started!</p><br />
          <a href="/"><button class="Btn">
            <div class="sign">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
            <path d="M12,2.1L1,12h3v9h7v-6h2v6h7v-9h3L12,2.1z M18,19h-3v-6H9v6H6v-8.8l6-5.4l6,5.4V19z"></path>
            </svg>
            </div>

            <div class="text">Go To Home</div>
          </button></a>
        </div>
      ) : (
        <>
          <h2>Movies</h2>
          <div className="movie-list">
            {movieWatchlist.map((item) => (
              <div className='movie-card' key={item.id}>
                <Link to={`/movie/${item.id}`}>
                  <img
                    src={item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : placeholderImage}
                    alt={item.title}
                  />
                </Link>
                <div className="movie-info">
                  <h4>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>

          <h2>TV Shows</h2>
          <div className="movie-list">
            {tvWatchlist.map((item) => (
              <div className='movie-card' key={item.id}>
                <Link to={`/tv/${item.id}`}>
                  <img
                    src={item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : placeholderTvImage}
                    alt={item.name}
                  />
                </Link>
                <div className="tv-info">
                  <h4>{item.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Watchlist;
