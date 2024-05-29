// indexedDB.js

const dbName = 'watchlistDB';
const dbVersion = 1;
let db;

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      console.error('Error opening indexedDB', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const store = db.createObjectStore('watchlist', { keyPath: 'id' });
    };
  });
};

export const addToWatchlist = (movie) => {
  openDB().then((database) => {
    const transaction = database.transaction(['watchlist'], 'readwrite');
    const store = transaction.objectStore('watchlist');
    store.add(movie);
  });
};

export const removeFromWatchlist = (movieId) => {
  openDB().then((database) => {
    const transaction = database.transaction(['watchlist'], 'readwrite');
    const store = transaction.objectStore('watchlist');
    store.delete(movieId);
  });
};

export const getAllWatchlistItems = () => {
  return new Promise((resolve, reject) => {
    openDB().then((database) => {
      const transaction = database.transaction(['watchlist'], 'readonly');
      const store = transaction.objectStore('watchlist');
      const request = store.getAll();

      request.onerror = (event) => {
        console.error('Error getting watchlist items', event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    }).catch(reject);
  });
};
