const movieDBName = 'movieWatchlistDB';
const tvDBName = 'tvWatchlistDB';
const dbVersion = 1;

let movieDb, tvDb;

const openMovieDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(movieDBName, dbVersion);

    request.onerror = (event) => {
      console.error('Error opening movie indexedDB', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      movieDb = event.target.result;
      resolve(movieDb);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('watchlist', { keyPath: 'id' });
    };
  });
};

const openTvDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(tvDBName, dbVersion);

    request.onerror = (event) => {
      console.error('Error opening tv indexedDB', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      tvDb = event.target.result;
      resolve(tvDb);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('watchlist', { keyPath: 'id' });
    };
  });
};

export const addToMovieWatchlist = (movie) => {
  openMovieDB().then((database) => {
    const transaction = database.transaction(['watchlist'], 'readwrite');
    const store = transaction.objectStore('watchlist');
    store.add(movie);
  });
};

export const removeFromMovieWatchlist = (movieId) => {
  openMovieDB().then((database) => {
    const transaction = database.transaction(['watchlist'], 'readwrite');
    const store = transaction.objectStore('watchlist');
    store.delete(movieId);
  });
};

export const getAllMovieWatchlistItems = () => {
  return new Promise((resolve, reject) => {
    openMovieDB().then((database) => {
      const transaction = database.transaction(['watchlist'], 'readonly');
      const store = transaction.objectStore('watchlist');
      const request = store.getAll();

      request.onerror = (event) => {
        console.error('Error getting movie watchlist items', event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    }).catch((error) => {
      console.error('Error opening movie database', error);
      reject(error);
    });
  });
};

export const addToTvWatchlist = (tv) => {
  openTvDB().then((database) => {
    const transaction = database.transaction(['watchlist'], 'readwrite');
    const store = transaction.objectStore('watchlist');
    store.add(tv);
  });
};

export const removeFromTvWatchlist = (tvId) => {
  openTvDB().then((database) => {
    const transaction = database.transaction(['watchlist'], 'readwrite');
    const store = transaction.objectStore('watchlist');
    store.delete(tvId);
  });
};

export const getAllTvWatchlistItems = () => {
  return new Promise((resolve, reject) => {
    openTvDB().then((database) => {
      const transaction = database.transaction(['watchlist'], 'readonly');
      const store = transaction.objectStore('watchlist');
      const request = store.getAll();

      request.onerror = (event) => {
        console.error('Error getting tv watchlist items', event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    }).catch((error) => {
      console.error('Error opening tv database', error);
      reject(error);
    });
  });
};
