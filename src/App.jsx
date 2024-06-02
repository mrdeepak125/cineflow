import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import SearchResults from './Component/SearchResult';
import TopMovies from './Component/TopMovies';
import PopularMovies from './Component/PopularMovies';
import LatestMovies from './Component/MovieList';
import MovieDetail from './Component/MovieDetail';
import Watchlist from './Component/Watchlist';
import Upcoming from './Component/Upcoming';
import PersonDetails from "./Component/PersonDetails";
import TVDetail from "./Component/TVDetail";
import TvList from './Component/TvList';

function App() {
  const [searchResults, setSearchResults] = useState({ movies: [], tvShows: [], query: '' });

  return (
    <Router>
      <div>
        <Navbar updateSearchResults={(results) => setSearchResults(results)} />
        
        <Routes>
          <Route path="/" element={<LatestMovies />} />
          <Route path="/Tvlist" element={<TvList />} />
          <Route path="/search" element={<SearchResults searchResults={searchResults} query={searchResults.query} />} />
          <Route path="/TopMovies" element={<TopMovies />} />
          <Route path="/Popular" element={<PopularMovies />} />
          <Route path="/Upcoming" element={<Upcoming />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/tv/:id" element={<TVDetail />} />
          <Route path='/watchlist' element={<Watchlist />} />
          <Route path="/person/:personId" element={<PersonDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
