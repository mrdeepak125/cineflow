import React from "react";
import { Link } from 'react-router-dom';

const placeholderImage = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

function SearchResults({ searchResults }) {
  const { movies, tvShows } = searchResults;

  return (
    <div className="container">
      <div className="section">
        <h1 className="section-title">🔎 Movie Results</h1>
        <div className="movie-list">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : placeholderImage}
                    alt={movie.title}
                  />
                </Link>
                <h4>{movie.title}</h4>
              </div>
            ))
          ) : (
            <div>No movies available</div>
          )}
        </div>
      </div>

      <div className="section">
        <h1 className="section-title">📺 TV Show Results</h1>
        <div className="movie-list">
          {tvShows.length > 0 ? (
            tvShows.map((tvShow) => (
              <div className="movie-card" key={tvShow.id}>
                <Link to={`/tv/${tvShow.id}`}>
                  <img
                    src={tvShow.poster_path
                      ? `https://image.tmdb.org/t/p/w200${tvShow.poster_path}`
                      : placeholderImage}
                    alt={tvShow.name}
                  />
                </Link>
                <h4>{tvShow.name}</h4>
              </div>
            ))
          ) : (
            <div>No TV shows available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
