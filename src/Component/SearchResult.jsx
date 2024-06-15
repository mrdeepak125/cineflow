import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import errorImage from '../assets/9318688-removebg-preview.png';

function SearchResults({ searchResults, query, loading }) {
  const { movies = [], tvShows = [] } = searchResults;
  const placeholderImage = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

  const [visibleMovies, setVisibleMovies] = useState(5);
  const [visibleTvShows, setVisibleTvShows] = useState(5);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);
  
  useEffect(() => {
    setVisibleMovies(5);
    setVisibleTvShows(5);
  }, [searchResults]);


  const handleShowMoreMovies = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 25);
  };

  const handleShowMoreTvShows = () => {
    setVisibleTvShows(prevVisibleTvShows => prevVisibleTvShows + 25);
  };

  const noResults = !loading && movies.length === 0 && tvShows.length === 0;

  return (
    <div className="container">
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
      {!loading && !noResults && (
        <>
          <div className="section">
            <h1 className="section-title">🔎 Movie Results "{query}"</h1>
            <div className="movie-list">
              {movies.slice(0, visibleMovies).map((movie) => (
                <div className="movie-card" key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : placeholderImage}
                      alt={movie.title}
                      style={{ width: "200px", height: "300px" }}
                    />
                  </Link>
                  <h4>{movie.title}</h4>
                </div>
              ))}
            </div>
            {visibleMovies < movies.length && (
              <div className="show-load">
                <div className="show-more">
                  <button onClick={handleShowMoreMovies}>Show More</button>
                </div>
              </div>
            )}
          </div>

          <div className="section">
            <h1 className="section-title">📺 TV Show Results "{query}"</h1>
            <div className="movie-list">
              {tvShows.slice(0, visibleTvShows).map((tvShow) => (
                <div className="movie-card" key={tvShow.id}>
                  <Link to={`/tv/${tvShow.id}`}>
                    <img
                      src={tvShow.poster_path
                        ? `https://image.tmdb.org/t/p/w200${tvShow.poster_path}`
                        : placeholderImage}
                      alt={tvShow.name}
                      style={{ width: "200px", height: "300px" }}
                    />
                  </Link>
                  <h4>{tvShow.name}</h4>
                </div>
              ))}
            </div>
            {visibleTvShows < tvShows.length && (
              <div className="show-load">
                <div className="show-more">
                  <button onClick={handleShowMoreTvShows}>Show More</button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {!loading && noResults && (
        <div className="no-results">
          <h1>No results available</h1>
          <img src={errorImage} alt="No results" />
        </div>
      )}
    </div>
  );
}

export default SearchResults;
