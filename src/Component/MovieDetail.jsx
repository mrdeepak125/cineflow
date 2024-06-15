import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getMovieDetails,
  getMovieTrailers,
  getMovieImages,
  getMovieCredits,
  getMovieRecommendations,
  getMovieKeywords,
} from "../lib/fetch";
import Modal from "./Modal";
import {
  addToMovieWatchlist,
  removeFromMovieWatchlist,
} from "../lib/indexedDB";

const placeholderImage =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";
const placeholderTvImage =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [activeMedia, setActiveMedia] = useState("photos");
  const [selectedServer, setSelectedServer] = useState("server1");
  const [keywords, setKeywords] = useState([]);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false); // New loading state for recommendations

  // Function to fetch movie details
  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const movieData = await getMovieDetails(id);
      const trailerData = await getMovieTrailers(id);
      const imagesData = await getMovieImages(id);
      const creditsData = await getMovieCredits(id);
      const recommendationsData = await getMovieRecommendations(id);
      const keywordsData = await getMovieKeywords(id);

      if (!movieData || !trailerData || !imagesData || !creditsData || !recommendationsData || !keywordsData) {
        throw new Error("Failed to fetch movie details, trailer, images, credits, recommendations, or keywords");
      }

      setMovie(movieData);
      const trailer = trailerData.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
      setTrailer(trailer);
      setImages(imagesData.backdrops);
      setVideos(trailerData.results);
      setCast(creditsData.cast);
      setRecommendations(recommendationsData.results);
      setKeywords(keywordsData.keywords);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Effect to fetch initial movie details
  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  // Function to handle play trailer
  const handlePlayTrailer = () => {
    if (trailer) {
      setShowModal(true);
    }
  };

  // Function to handle keyword click
  const handleKeywordClick = (keyword) => {
    navigate(`/search?query=${keyword}`);
  };

  // Function to handle view all images
  const handleViewAllImages = () => {
    setShowAllImages(true);
  };

  // Function to handle media switch
  const handleMediaSwitch = (type) => {
    setActiveMedia(type);
  };

  // Function to handle opening stream link
  const handleOpenStreamLink = () => {
    navigate(`/watchmovie/${movie.id}/${movie.imdb_id}}`);
  };

  // Function to handle saving to watchlist
  const handleSaveToWatchlist = async () => {
    try {
      if (isInWatchlist) {
        await removeFromMovieWatchlist(movie.id);
        setIsInWatchlist(false);
      } else {
        await addToMovieWatchlist(movie);
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error("Error saving to watchlist:", error);
    }
  };

  // Function to handle recommendation click
  const handleRecommendationClick = async (recommendationId) => {
    setLoadingRecommendation(true); // Set loading state for recommendation click
    try {
      const movieData = await getMovieDetails(recommendationId);
      const trailerData = await getMovieTrailers(recommendationId);
      const imagesData = await getMovieImages(recommendationId);
      const creditsData = await getMovieCredits(recommendationId);
      const recommendationsData = await getMovieRecommendations(recommendationId);
      const keywordsData = await getMovieKeywords(recommendationId);

      if (!movieData || !trailerData || !imagesData || !creditsData || !recommendationsData || !keywordsData) {
        throw new Error("Failed to fetch movie details, trailer, images, credits, recommendations, or keywords");
      }

      setMovie(movieData);
      const trailer = trailerData.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
      setTrailer(trailer);
      setImages(imagesData.backdrops);
      setVideos(trailerData.results);
      setCast(creditsData.cast);
      setRecommendations(recommendationsData.results);
      setKeywords(keywordsData.keywords);
      setLoadingRecommendation(false); // Clear loading state after data is fetched
    } catch (error) {
      setError(error.message);
      setLoadingRecommendation(false); // Clear loading state on error
    }
  };

  // Loading state handling
  if (loading || loadingRecommendation) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  // Error handling
  if (error) {
    return <div>{error}</div>;
  }

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  // Render UI
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-play-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
              </svg>
            </div>
          </div>
          <div className="movie-info">
            <h2>{movie.title}</h2>
            <br />
            <h3>📽️ OVER VIEW</h3>
            <p>{movie.overview}</p>
            <br />
            <p>⭐ Rating: {movie.vote_average}</p>
            <br />
            <p>📅 Release Date: {movie.release_date}</p>
            <br />
            <p>🔤 Language : {movie.original_language}</p>
            {/* <div className="keyword">
            {keywords.map((keyword) => (
                <span key={keyword.id} className="keyword-list" onClick={() => handleKeywordClick(keyword.name)}>
                  <p>{keyword.name}</p>
                </span>
              ))}
            </div> */}
            <div className="movie-button">
              <label className="bookmark" htmlFor="checkboxInput">
                <input
                  id="checkboxInput"
                  type="checkbox"
                  onClick={handleSaveToWatchlist}
                />
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
                <svg
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  width="15px"
                >
                  <path
                    d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
              <button className="Play-movie" onClick={handleOpenStreamLink}>
                <span className="circle1" />
                <span className="circle2" />
                <span className="circle3" />
                <span className="circle4" />
                <span className="circle5" />
                <span className="text">Watch Online</span>
              </button>
              {/* <Link to={`/watchmovie/${movie.id}/${movie.imdb_id}`}>Watch Movie</Link> */}
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
      <div className="media-slider">
        <div className="media-buttons">
          <h1>Media</h1>
        </div>
        <div className="media-buttons">
          <button
            className={activeMedia === "photos" ? "active" : ""}
            onClick={() => handleMediaSwitch("photos")}
          >
            Photos
          </button>
          <button
            className={activeMedia === "videos" ? "active" : ""}
            onClick={() => handleMediaSwitch("videos")}
          >
            Videos
          </button>
        </div>
        <div className="media-content">
          {activeMedia === "photos" && (
            <>
              {images
                .slice(0, showAllImages ? images.length : 4)
                .map((image) => (
                  <img
                    className="media-image"
                    key={image.file_path}
                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    alt="Movie backdrop"
                  />
                ))}
              {!showAllImages && images.length > 4 && (
                <button className="view-all" onClick={handleViewAllImages}>
                  View All
                </button>
              )}
            </>
          )}
          {activeMedia === "videos" && (
            <>
              {videos
                .slice(0, showAllImages ? videos.length : 10)
                .map((video) => (
                  <iframe
                    key={video.id}
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ))}
            </>
          )}
        </div>
      </div>
      <div className="media-buttons">
        <h1>Top Billed Cast</h1>
      </div>
      <div className="cast-list">
        {cast.slice(0, 100).map((member) => (
          <div className="cast-member" key={member.id}>
            <Link to={`/person/${member.id}`} key={member.id}>
              <img
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                    : placeholderImage
                }
                alt={member.name}
              />
            </Link>
            <p>
              {member.name} as {member.character}
            </p>
          </div>
        ))}
      </div>
      <div className="media-buttons">
        <h1>Recommendations</h1>
      </div>
      <div className="section">
        <div className="recommendations-list">
          {recommendations.map((rec) => (
            <div
              className="recommendation-card"
              key={rec.id}
              onClick={() => navigate(`/movie/${rec.id}`)}
            >
              <Link to={`/movie/${rec.id}`} key={rec.id}>
                <img
                  src={
                    rec.poster_path
                      ? `https://image.tmdb.org/t/p/w200${rec.poster_path}`
                      : placeholderTvImage
                  }
                  alt={rec.title}
                  style={{ width: "200px", height: "300px" }}
                />
              </Link>
              <p>{rec.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
