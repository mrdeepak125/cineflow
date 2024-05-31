import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMovieDetails,
  getMovieTrailers,
  getMovieImages,
  getMovieCredits,
  getMovieRecommendations,
} from "../lib/fetch";
import Modal from "./Modal";
import { addToWatchlist, removeFromWatchlist } from "../lib/indexedDB";

const placeholderImage = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'; // Ensure this path is correct based on where you save the placeholder image

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [images, setImages] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const checkIfInWatchlist = async (movieId) => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("watchlist_db", 1);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(["watchlist"], "readonly");
        const objectStore = transaction.objectStore("watchlist");
        const getRequest = objectStore.get(movieId);

        getRequest.onsuccess = () => {
          resolve(getRequest.result !== undefined);
        };

        getRequest.onerror = (error) => {
          reject(error);
        };

        transaction.oncomplete = () => {
          db.close();
        };
      };

      request.onerror = (event) => {
        reject("Error opening database");
      };
    });
  };

  const handleSaveToWatchlist = async () => {
    try {
      if (isInWatchlist) {
        await removeFromWatchlist(movie.id);
        setIsInWatchlist(false);
      } else {
        await addToWatchlist(movie);
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error("Error saving to watchlist:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await getMovieDetails(id);
        const trailerData = await getMovieTrailers(id);
        const imagesData = await getMovieImages(id);
        const creditsData = await getMovieCredits(id);
        const recommendationsData = await getMovieRecommendations(id);

        if (!movieData || !trailerData || !imagesData || !creditsData || !recommendationsData) {
          throw new Error("Failed to fetch movie details, trailer, images, credits or recommendations");
        }

        setMovie(movieData);
        const trailer = trailerData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(trailer);
        setImages(imagesData.backdrops);
        setCast(creditsData.cast);
        setRecommendations(recommendationsData.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handlePlayTrailer = () => {
    if (trailer) {
      setShowModal(true);
    }
  };

  const handleViewAllImages = () => {
    setShowAllImages(true);
  };

  const handleRecommendationClick = (movieId) => {
    setLoading(true);
    navigate(`/movie/${movieId}`);
  };

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
console.log(movie);
console.log();
  return (
    <>
      <div className="movie-detail">
      <div className="movie-container">
        <div className="poster-container" onClick={handlePlayTrailer}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="play-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
</svg>
          </div>
        </div>
        <div className="movie-info">
        <h2>{movie.title}</h2>
          <h3>📽️ OVER VIEW</h3>
          <p>{movie.overview}</p>
          <p>⭐ Rating: {movie.vote_average}</p>
          <p>📅 Release Date: {movie.release_date}</p>
          <p>{movie.original_language}</p>
          <div className="movie-button">
        <label className="bookmark" htmlFor="checkboxInput">
          <input id="checkboxInput" type="checkbox" onClick={handleSaveToWatchlist} />
          <svg
            className="svgIcon"
            fill="none"
            viewBox="0 0 50 70"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M46 62.0085L46 3.88139L3.99609 3.88139L3.99609 62.0085L24.5 45.5L46 62.0085Z"
              stroke="black"
              strokeWidth="7"
            />
          </svg>
        </label>
        <button className="play-button" onClick={handlePlayTrailer}>
        <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="15px"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" fill="currentColor"></path></svg> 
        </button>
          </div>
        </div>
        </div>
        {showModal && (
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            trailerKey={trailer.key}
          />
        )}
      </div>
      <div className={`full-image ${showAllImages ? "show-all" : ""}`}>
        <h3>Media</h3>
        {images
          .slice(0, showAllImages ? images.length : 4)
          .map((image) => (
            <img
              key={image.file_path}
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              alt="Movie backdrop"
            />
          ))}
        {!showAllImages && images.length > 4 && (
          <div className="view-all" onClick={handleViewAllImages}>
            View All
          </div>
        )}
      </div>
      <h2>Top Billed Cast</h2>
      <div className="cast-list">
        {cast.slice(0, 100).map((member) => (
          <div className="cast-member" key={member.id}>
            <img
              src={member.profile_path
                ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                : placeholderImage}
              alt={member.name}
            />
            <p>
              {member.name} as {member.character}
            </p>
          </div>
        ))}
      </div>
      <h2>Recommendations</h2>
      <div className="recommendations-list">
        {recommendations.map((rec) => (
          <div
            className="recommendation-item"
            key={rec.id}
            onClick={() => handleRecommendationClick(rec.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
              alt={rec.title}
            />
            <p>{rec.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieDetail;
