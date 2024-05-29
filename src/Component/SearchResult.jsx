import React from "react";
import { Link } from 'react-router-dom';

const placeholderImage = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

function SearchResults({ searchResults }) {
  return (
    <div className="container">
      <div className="section">
        <h1 className="section-title">🔎 Movie Results</h1>
        <div className="movie-list">
          {searchResults.length > 0 ? (
            searchResults.map((movie) => (
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
    </div>
  );
}

export default SearchResults;
