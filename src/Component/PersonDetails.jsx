import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const PersonDetails = () => {
  const { personId } = useParams();
  const [personDetails, setPersonDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const [detailsResponse, creditsResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=7607c1248159387aca334387ac63e608`),
          axios.get(`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=7607c1248159387aca334387ac63e608`)
        ]);
        setPersonDetails(detailsResponse.data);
        setMovieCredits(creditsResponse.data.cast);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPersonDetails();
  }, [personId]);

  if (loading) {
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
        <h1 className="section-title">{personDetails.name}</h1>
        <div className="person-details">
          <img 
            src={personDetails.profile_path ? `https://image.tmdb.org/t/p/w300${personDetails.profile_path}` : 'https://via.placeholder.com/300x450'}
            alt={personDetails.name}
            // style={{ width: "300px", height: "450px" }}
          />
          <div className="person-info">
            <p><strong>Biography:<br /></strong> {personDetails.biography}</p><br />
            <p><strong>Birthday:<br /></strong> {personDetails.birthday}</p><br />
            <p><strong>Place of Birth:<br /></strong> {personDetails.place_of_birth}</p>
          </div>
        </div>
        <div className="movie-credits">
          <h1>🎬 Movie Credits</h1>
          <div className="movie-list">
            {movieCredits.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300'}
                  alt={movie.title}
                //   style={{ width: "150px", height: "225px" }}
                />
                </Link>
                <h4>{movie.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
