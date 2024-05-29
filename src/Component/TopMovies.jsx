import React, { useEffect, useState } from 'react';
import { getMovieTop } from '../lib/fetch';
import { Link } from 'react-router-dom';


function TopMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const data = await getMovieTop();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMovies();
  }, []);

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


  return (
    <div>
      <h1>🔝 Top Movies</h1>
      <div className='movie-list'>
        {movies.map(movie => (
          <div className='movie-card' key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
          <br />
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

export default TopMovies;
