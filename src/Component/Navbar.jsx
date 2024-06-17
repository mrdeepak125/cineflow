import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = '7607c1248159387aca334387ac63e608';
const BASE_URL = 'https://api.themoviedb.org/3/search';

function Navbar({ updateSearchResults, setLoading }) {
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);

    if (!query.trim()) {
      updateSearchResults({ movies: [], tvShows: [], query });
      navigate('/search');
      return;
    }

    setLoading(true);

    try {
      const movieResponse = await axios.get(`${BASE_URL}/movie`, {
        params: { api_key: API_KEY, query },
      });
      const tvResponse = await axios.get(`${BASE_URL}/tv`, {
        params: { api_key: API_KEY, query },
      });

      const movies = movieResponse.data.results || [];
      const tvShows = tvResponse.data.results || [];

      updateSearchResults({ movies, tvShows, query });
      navigate('/search');
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

  return (
    <>
      <nav className="navbar">
        <div className="toggle-button" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </div>
        <div className={`menu-bar ${menuOpen ? 'show' : ''}`} id="menuBar">
          <ul>
            <li className='first-section'>
              <Link to="/" onClick={toggleMenu}>Home</Link>
              <Link to="/watchlist" onClick={toggleMenu}>Watch List</Link>
            </li>
          </ul>
          <ul>
            <li className='second-section'>
              <Link to="/TopMovies" onClick={toggleMenu}>Top Movies</Link>
              <Link to="/Popular" onClick={toggleMenu}>Popular</Link>
              <Link to="/Upcoming" onClick={toggleMenu}>Upcoming</Link>
            </li>
          </ul>
          <ul>
            <li className='third-section'>
              <Link to="/Tvlist" onClick={toggleMenu}>TV</Link>
              <Link to="/Anime" onClick={toggleMenu}>Anime</Link>
            </li>
          </ul>  
          <ul>
            <li className='fourth-section'>
              <label className="ui-switch">
                <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                <div className="slider">
                  <div className="circle" />
                </div>
              </label>
            </li>
          </ul>       
        </div>
        <div className="navbar-menu">
          <Link to="/" >Home</Link>
          <Link to="/watchlist" >Watch List</Link>
          <Link to="/Tvlist" >TV List</Link>
          <Link to="/Anime" >Anime</Link>
        </div>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search movies and TV shows..."
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
        <div className="dark-mode">
          <label className="ui-switch">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <div className="slider">
              <div className="circle" />
            </div>
          </label>
        </div>
      </nav>
      <div className='movie-bar'>
        <Link to="/Upcoming">Upcoming</Link>
        <Link to="/TopMovies">Top Movies</Link>
        <Link to="/Popular">Popular</Link>
      </div>
    </>
  );
}

export default Navbar;
