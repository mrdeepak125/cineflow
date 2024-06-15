import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getTVDetails,
  getTVTrailers,
  getTVImages,
  getTVCredits,
  getTVRecommendations,
  getSeasonDetails, // New function to get episodes of a season
} from "../lib/tvfetch";
import Modal from "./Modal";
import { addToTvWatchlist, removeFromTvWatchlist } from "../lib/indexedDB";
const placeholderTvImage = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
const placeholderImage = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg';

function TVDetail({tvShow}) {
  const { id, season_number, episode_number } = useParams(); // Include season and episode from params
  const navigate = useNavigate();
  const [tv, setTV] = useState(null);
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
  const [episodes, setEpisodes] = useState([]); // New state for episodes
  const [selectedSeason, setSelectedSeason] = useState(season_number || 1); // New state for selected season

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);
  
  const checkIfInWatchlist = async (tvId) => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("watchlist_db", 1);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(["watchlist"], "readonly");
        const objectStore = transaction.objectStore("watchlist");
        const getRequest = objectStore.get(tvId);

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
        await removeFromTvWatchlist(tv.id);
        setIsInWatchlist(false);
      } else {
        await addToTvWatchlist(tv);
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error("Error saving to watchlist:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tvData = await getTVDetails(id);
        const trailerData = await getTVTrailers(id);
        const imagesData = await getTVImages(id);
        const creditsData = await getTVCredits(id);
        const recommendationsData = await getTVRecommendations(id);

        if (!tvData || !trailerData || !imagesData || !creditsData || !recommendationsData) {
          throw new Error("Failed to fetch TV details, trailer, images, credits or recommendations");
        }

        setTV(tvData);
        const trailer = trailerData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(trailer);
        setImages(imagesData.backdrops);
        setVideos(trailerData.results);
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

  // Fetch episodes when selected season changes
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const episodesData = await getSeasonDetails(id, selectedSeason);
        setEpisodes(episodesData.episodes);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, [id, selectedSeason]);

  const handlePlayTrailer = () => {
    if (trailer) {
      setShowModal(true);
    }
  };

  const handleViewAllImages = () => {
    setShowAllImages(true);
  };

  const handleRecommendationClick = (tvId) => {
    setLoading(true);
    navigate(`/tv/${tvId}`);
  };

  const handleMediaSwitch = (type) => {
    setActiveMedia(type);
  };

  const handleOpenStreamLink = (episodeNum) => {
    const seasonNumber = selectedSeason;
    const streamUrl =
      selectedServer === "server1"
        ? `https://vidsrc.me/embed/tv?tmdb=${tv.id}&season=${seasonNumber}&episode=${episodeNum}`
        : `https://multiembed.mov/directstream.php?video_id=${tv.id}&tmdb=1&s=${seasonNumber}&e=${episodeNum}`;

    window.location.href = streamUrl;
  };

  const  handleSeasonChange = (seasonNum) => {
    setSelectedSeason(seasonNum);
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

  const handleWatchOnline = () => {
    const title = tv.name; // Adjust according to your tvShow object structure
    const episode = 1; // Or get the specific episode number dynamically
    navigate(`/watchtv/${title}/${episode}`);
  };

  return (
    <>
      <div className="movie-detail">
            {loading }
        <div className="movie-container">
          <div className="poster-container" onClick={handlePlayTrailer}>
            <img
              src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
              alt={tv.name}
            />
            <div className="play-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
              </svg>
            </div>
          </div>
          <div className="movie-info">
            <h2>{tv.name}</h2><br />
            <h3>📽️ OVER VIEW</h3>
            <p>{tv.overview}</p><br />
            <p>⭐ Rating: {tv.vote_average}</p><br />
            <p>📅 First Air Date: {tv.first_air_date}</p><br />
            <p>🔤 Language : {tv.original_language}</p>
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
                <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="15px">
                  <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" fill="currentColor"></path>
                </svg> 
              </button>
              <div className="server-dropdown">
                <select value={selectedServer} onChange={(e) => setSelectedServer(e.target.value)}>
                  <option value="server1">Server 1</option>
                  <option value="server2">Server 2</option>
                </select>
              </div>
              <button className="Play-movie" onClick={handleWatchOnline}>
                <span className="circle1" />
                <span className="circle2" />
                <span className="circle3" />
                <span className="circle4" />
                <span className="circle5" />
                <span className="text">
                  Watch Online
                </span>
              </button>
            </div>
            {/* <Link to={`/watchanime/${tv.id}/${tv.number_of_season}}`}>WatchAnime</Link> */}
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
      <div className="media-buttons">
        <div className="server-dropdown">
          <label  htmlFor="season-select">Select Season:</label>
          <select
            id="season-select"
            value={selectedSeason}
            onChange={(e) => handleSeasonChange(e.target.value)}
          >
            {tv.seasons.map((season) => (
              <option key={season.id} value={season.season_number}>
                {season.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="episodes-list">
        {episodes.map((episode) => (
          <div className="episode-card" key={episode.id}>
            <img
              src={episode.still_path ? `https://image.tmdb.org/t/p/w200${episode.still_path}`  : placeholderTvImage}
              alt={`Episode ${episode.episode_number}`}
            style={{ width: "200px", height: "133px" }}
            />
            <p>
              Episode {episode.episode_number}
            </p>
            <p>
              {episode.name}
            </p>
            <button className="Play-movie"  onClick={() => handleOpenStreamLink(episode.episode_number)}>
                <span className="circle1" />
                <span className="circle2" />
                <span className="circle3" />
                <span className="circle4" />
                <span className="circle5" />
                <span className="text">
                  Watch Online
                </span>
              </button>
          </div>
        ))}
        
      </div>
      <div className="media-slider">
        <h1>Media</h1>
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
              {images.slice(0, showAllImages ? images.length : 4).map((image) => (
                <img
                  className="media-image"
                  key={image.file_path}
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt="TV backdrop"
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
              {videos.slice(0, showAllImages ? videos.length : 10).map((video) => (
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
      <h1>Top Billed Cast</h1>
      <div className="cast-list">
        {cast.slice(0, 100).map((member) => (
          <div className="cast-member" key={member.id}>
            <Link to={`/person/${member.id}`}>
              <img
                src={member.profile_path
                  ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                  : placeholderImage}
                alt={member.name}
              />
            </Link>
            <p>
              {member.name} as {member.character}
            </p>
          </div>
        ))}
      </div>
      <h1>Recommendations</h1>
      <div className="recommendations-list">
        {recommendations.map((rec) => (
          <div
            className="movie-card"
            key={rec.id}
            onClick={() => handleRecommendationClick(rec.id)}
          >
            <img
              src={rec.poster_path ? `https://image.tmdb.org/t/p/w200${rec.poster_path}` : placeholderTvImage}
              alt={rec.name}
            style={{ width: "200px", height: "300px" }}
            />
            <p>{rec.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TVDetail;
