import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar";
import SearchResults from "./Component/SearchResult";
import TopMovies from "./Component/TopMovies";
import PopularMovies from "./Component/PopularMovies";
import LatestMovies from "./Component/MovieList";
import MovieDetail from "./Component/MovieDetail";
import Watchlist from "./Component/Watchlist";
import Upcoming from "./Component/Upcoming";
import PersonDetails from "./Component/PersonDetails";
import TVDetail from "./Component/TVDetail";
import TvList from "./Component/TvList";
import DownloadPage from "./Component/DownloadPage";
import WatchMovie from "./Component/WatchMovie";
import Anime from "./Component/anime";
import WatchTv from "./Component/watchtv";

function App() {
  const [searchResults, setSearchResults] = useState({
    movies: [],
    tvShows: [],
    query: "",
  });
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div>
        <Navbar
          updateSearchResults={(results) => setSearchResults(results)}
          setLoading={setLoading}
        />

        <Routes>
          <Route path="/" element={<LatestMovies />} />
          <Route path="/Tvlist" element={<TvList />} />
          <Route
            path="/search"
            element={
              <SearchResults
                searchResults={searchResults}
                query={searchResults.query}
                loading={loading}
              />
            }
          />
          <Route path="/TopMovies" element={<TopMovies />} />
          <Route path="/Popular" element={<PopularMovies />} />
          <Route path="/Upcoming" element={<Upcoming />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/downloadpage" element={<DownloadPage />} />
          <Route path="/tv/:id" element={<TVDetail />} />
          <Route path="/Anime" element={<Anime />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/person/:personId" element={<PersonDetails />} />
          <Route path="/watchmovie/:id/:imdb_id" element={<WatchMovie />} />
          <Route
            path="/watchtv/:tvName/:seasonNum/:episodeNum/:id"
            element={<WatchTv />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
