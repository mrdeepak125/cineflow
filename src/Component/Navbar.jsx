import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLatest, getMovieByQuery, getMovieTop, getPopular } from '../lib/fetch';

function Navbar({ updateSearchResults }) {
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);

    document.body.style.backgroundColor = isDarkMode ? '#141619' : '#fff';
    document.body.style.color = isDarkMode ? '#B3B4BD' : '#141619';
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);

    document.body.style.backgroundColor = newDarkMode ? '#141619' : '#fff';
    document.body.style.color = newDarkMode ? '#B3B4BD' : '#141619';
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await getMovieByQuery(query);
      if (data && data.results) {
        updateSearchResults(data.results);
        console.log('search result:-',data);
        navigate('/search');
      } else {
        setError('No movies found');
      }
    } catch (e) {
      setError('Error fetching search results: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };
  if (loading) {
    return <div className="spinner-container">
    <div className="spinner">
     <div className="spinner">
      <div className="spinner">
        <div className="spinner">
          <div className="spinner">
              <div className="spinner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

if (error) {
    return <div>{error}</div>;
}

const handleTopMovies = async () => {
  setLoading(true);
  setError(null);

  try {
    const data = await getMovieTop();
    if (data && data.results) {
      updateSearchResults(data.results);
      navigate('/TopMovies');
    } else {
      setError('No top movies found');
    }
  } catch (e) {
    setError('Error fetching top movies: ' + e.message);
  } finally {
    setLoading(false);
  }
};

const handlePopularMovies = async () => {
  setLoading(true);
  setError(null);

  try {
    const data = await getPopular();
    if (data && data.results) {
      updateSearchResults(data.results);
      navigate('/Popular');
    } else {
      setError('No popular movies found');
    }
  } catch (e) {
    setError('Error fetching popular movies: ' + e.message);
  } finally {
    setLoading(false);
  }
};

const handleLatestMovies = async () => {
  setLoading(true);
  setError(null);

  try {
    const data = await getLatest();
    if (data && data.results) {
      updateSearchResults(data.results);
      navigate('/Latest');
    } else {
      setError('No latest movies found');
    }
  } catch (e) {
    setError('Error fetching latest movies: ' + e.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/">Home</a>
        </div>
        <div className="navbar-menu">
          <a href="/watchlist">Watch List</a>
        </div>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
          </button>
        </div>
        <label className="bb8-toggle">
          <input
            className="bb8-toggle__checkbox"
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <div className="bb8-toggle__container">
            <div className="bb8-toggle__scenery">
              <div className="bb8-toggle__star"></div>
              <div className="bb8-toggle__star"></div>
              <div className="bb8-toggle__star"></div>
              <div className="bb8-toggle__star"></div>
              <div className="bb8-toggle__star"></div>
              <div className="bb8-toggle__star"></div>
              <div className="bb8-toggle__star"></div>
              <div className="tatto-1"></div>
              <div className="tatto-2"></div>
              <div className="gomrassen"></div>
              <div className="hermes"></div>
              <div className="chenini"></div>
              <div className="bb8-toggle__cloud"></div>
              <div className="bb8-toggle__cloud"></div>
              <div className="bb8-toggle__cloud"></div>
            </div>
            <div className="bb8">
              <div className="bb8__head-container">
                <div className="bb8__antenna"></div>
                <div className="bb8__antenna"></div>
                <div className="bb8__head"></div>
              </div>
              <div className="bb8__body"></div>
            </div>
            <div className="artificial__hidden">
              <div className="bb8__shadow"></div>
            </div>
          </div>
        </label>
      </nav>
      <div className='movie-bar'>
      <button onClick={handleLatestMovies}>Latest</button>
      <button onClick={handleTopMovies}>Top Movie</button>
        <button onClick={handlePopularMovies}>Popular</button>
      </div>
    </>
  );
}

export default Navbar;
