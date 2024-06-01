import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPopularMovies = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=7607c1248159387aca334387ac63e608&page=${page}`
      );
      setPopularMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies(currentPage);
  }, [currentPage]);

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
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
        <h1 className="section-title">🔥 Popular Movies</h1>
        <div className="movie-list">
          {popularMovies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'}
                  alt={movie.title}
                  // style={{ width: "150px", height: "225px" }}
                />
              </Link>
              <h4>{movie.title}</h4>
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
            {loading ? "Loading..." : "Show More"}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Popular;
