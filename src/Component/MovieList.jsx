// src/components/MovieList.jsx
import React, { useEffect, useState } from 'react';
import { nowPlaying } from '../lib/fetch';
import { Link } from 'react-router-dom';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await nowPlaying();
            if (data && data.results) {
                setMovies(data.results);
                console.log(data);
            } else {
                setError('Failed to fetch movies');
            }
            setLoading(false);
        };

        fetchMovies();
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
            <div className='movie-list'>
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <div className='movie-card' key={movie.id}>
                           <Link to={`/movie/${movie.id}`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                            />
                            </Link>
                            <div className="movie-info">
                                <h4>{movie.title}</h4>
                                {/* <p>{movie.overview}</p> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No movies available</div>
                )}
            </div>
        </div>
    );
};

export default MovieList;
