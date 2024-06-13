import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TvList = () => {
  const [tvShows, setTvShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTvShows = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&api_key=7607c1248159387aca334387ac63e608&page=${page}`
      );
      setTvShows((prevTvShows) => [...prevTvShows, ...response.data.results]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTvShows(currentPage);
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
        <h1 className="section-title">📺 TV Shows On Air</h1>
        <div className="movie-list">
          {tvShows.map((show) => (
            <div className="movie-card" key={show.id}>
              <Link to={`/tv/${show.id}`}>
                <img
                  src={show.poster_path ? `https://image.tmdb.org/t/p/w200${show.poster_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'}
                  alt={show.name}
                />
              </Link>
              <h3>{show.name}</h3>
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

export default TvList;
