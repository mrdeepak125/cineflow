import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './Component/Navbar';
import MovieList from './Component/MovieList'
import SearchResults from './Component/SearchResult';
import TopMovies from './Component/TopMovies';
import PopularMovies from './Component/PopularMovies';
import LatestMovies from './Component/LatestMovies';
import MovieDetail from './Component/MovieDetail';
import Watchlist from './Component/Watchlist';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Router>
      <div>
        <Navbar updateSearchResults={setSearchResults} />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/search" element={<SearchResults searchResults={searchResults} />} />
          <Route path="/TopMovies" element={<TopMovies />} />
          <Route path="/Popular" element={<PopularMovies />} />
          <Route path="/Latest" element={<LatestMovies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path='/watchlist' element={<Watchlist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
