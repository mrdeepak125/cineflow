import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const genderMap = {
  0: "Not set / not specified",
  1: "Female",
  2: "Male",
  3: "Non-binary"
};

const PersonDetails = () => {
  const { personId } = useParams();
  const [personDetails, setPersonDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState([]);
  const [tvCredits, setTVCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const [detailsResponse, movieCreditsResponse, tvCreditsResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=7607c1248159387aca334387ac63e608`),
          axios.get(`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=7607c1248159387aca334387ac63e608`),
          axios.get(`https://api.themoviedb.org/3/person/${personId}/tv_credits?api_key=7607c1248159387aca334387ac63e608`)
        ]);
        setPersonDetails(detailsResponse.data);
        setMovieCredits(movieCreditsResponse.data.cast);
        setTVCredits(tvCreditsResponse.data.cast);
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
                {loading }
      <div className="section">
        <div className="person-details">
          <img 
            src={personDetails.profile_path ? `https://image.tmdb.org/t/p/w300${personDetails.profile_path}` : 'https://via.placeholder.com/300x450'}
            alt={personDetails.name}
          />
          <div className="person-info">
        <h1 className="section-title">{personDetails.name}</h1>
            <p><strong>Biography:<br /></strong> {personDetails.biography}</p><br />
            <p><strong>Birthday:<br /></strong> {personDetails.birthday}</p><br />
            <p><strong>Place of Birth:<br /></strong> {personDetails.place_of_birth}</p><br />
            <p><strong>Gender:<br /></strong> {genderMap[personDetails.gender]}</p>
          </div>
        </div>
        <div className="movie-credits">
  <h1>🎬 Movie Credits</h1>
  <div className="recommendations-list">
    {movieCredits.map((movie, index) => (
      <div className="movie-card" key={`movie-${movie.id}-${index}`}>
        <Link to={`/movie/${movie.id}`}>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'}
            alt={movie.title}
          />
        </Link>
        <h4>{movie.title}</h4>
      </div>
    ))}
  </div>
</div>
<div className="movie-credits">
  <h1>📺 TV Credits</h1>
  <div className="recommendations-list">
    {tvCredits.map((tvShow, index) => (
      <div className="movie-card" key={`tv-${tvShow.id}-${index}`}>
        <Link to={`/tv/${tvShow.id}`}>
          <img
            src={tvShow.poster_path ? `https://image.tmdb.org/t/p/w200${tvShow.poster_path}` : 'https://via.placeholder.com/200x300'}
            alt={tvShow.name}
          />
        </Link>
        <h4>{tvShow.name}</h4>
      </div>
    ))}
  </div>
</div>
</div>
</div>
  );
};

export default PersonDetails;
