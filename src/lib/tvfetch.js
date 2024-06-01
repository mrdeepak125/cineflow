import axios from 'axios';

const API_KEY = '7607c1248159387aca334387ac63e608';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return response.data;
};

export const getMovieTrailers = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  return response.data;
};

export const getMovieImages = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`);
  return response.data;
};

export const getMovieCredits = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  return response.data;
};

export const getMovieRecommendations = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`);
  return response.data;
};

export const getTVDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  return response.data;
};

export const getTVTrailers = async (id) => {
  const response = await axios.get(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`);
  return response.data;
};

export const getTVImages = async (id) => {
  const response = await axios.get(`${BASE_URL}/tv/${id}/images?api_key=${API_KEY}`);
  return response.data;
};

export const getTVCredits = async (id) => {
  const response = await axios.get(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
  return response.data;
};

export const getTVRecommendations = async (id) => {
  const response = await axios.get(`${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}`);
  return response.data;
};
