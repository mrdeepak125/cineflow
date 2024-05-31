export const getMovieByQuery = async (e) => {
    try {
        const response = await fetch ('https://api.themoviedb.org/3/search/movie?api_key=7607c1248159387aca334387ac63e608&query=' + e);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
    catch  (e) {
        console.log(e);
        return null;
    }
}

export const getMovieTop = async (e) => {
    try{
        const response = await fetch ('https://api.themoviedb.org/3/movie/top_rated?api_key=7607c1248159387aca334387ac63e608')
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export const getLatest = async (e) =>{
    try{
        const response = await fetch ('https://api.themoviedb.org/3/movie/now_playing?api_key=7607c1248159387aca334387ac63e608')
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export const getPopular = async (e) =>{
    try{
        const response = await fetch ('https://api.themoviedb.org/3/movie/popular?api_key=7607c1248159387aca334387ac63e608')
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export const getUpcoming = async (e) =>{
  try{
      const response = await fetch ('https://api.themoviedb.org/3/movie/upcoming?api_key=7607c1248159387aca334387ac63e608')
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return await response.json();
  }
  catch (e) {
      console.log(e);
      return null;
  }
}

export const nowPlaying = async (e) =>{
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=7607c1248159387aca334387ac63e608');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const getMovieDetails = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=7607c1248159387aca334387ac63e608`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  export const getMovieTrailers = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7607c1248159387aca334387ac63e608`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  export const getMovieImages = async (movieId) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=7607c1248159387aca334387ac63e608`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const getMovieCredits = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=7607c1248159387aca334387ac63e608`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  export const getMovieRecommendations = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=7607c1248159387aca334387ac63e608`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  