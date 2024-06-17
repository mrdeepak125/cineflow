import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Latest = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchLatestMovies = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=7607c1248159387aca334387ac63e608&page=${page}`
      );
      const uniqueMovies = new Set([...latestMovies, ...response.data.results]);
      setLatestMovies(Array.from(uniqueMovies));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);
  
  useEffect(() => {
    fetchLatestMovies(currentPage);
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
      localStorage.removeItem('scrollPosition');
    }
  }, [currentPage]);

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleMovieClick = (movieId) => {
    localStorage.setItem('scrollPosition', window.scrollY);
    navigate(`/movie/${movieId}`);
  };

  if (loading && currentPage === 1) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="container">
      <div className="section">
        <h1 className="section-title">📅 Latest Movies</h1>
        <h1 className="section-title">Top Movies to Watch in 2024</h1>
        <div className="movie-list">
          {latestMovies.map((movie) => (
            <div className="movie-card" key={movie.id} onClick={() => handleMovieClick(movie.id)}>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'}
                alt={movie.title}
              />
              <h4 className="movie-title">{movie.title}</h4>
            </div>
          ))}
        </div>
        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
        <div className="show-load">
          <div className="show-more">
            <button onClick={handleShowMore} disabled={loading}>
              {loading ? 'Loading...' : 'Show More'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latest;
