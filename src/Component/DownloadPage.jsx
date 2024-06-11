import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import errro from '../assets/9318688-removebg-preview.png';

const DownloadPage = ({ movie }) => { // Accept movie detail as prop
  const location = useLocation();
  const [files, setFiles] = useState([]);
  const [selectedFileLink, setSelectedFileLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const query = queryParams.get('q');
      const url = `https://filepursuit.p.rapidapi.com/?q=${query}&type=video`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '43db6998cdmsh2ebabcbb7bfe84ep1865b9jsn0406325a9b5c',
          'x-rapidapi-host': 'filepursuit.p.rapidapi.com'
        }
      };

      const response = await fetch(url, options);
      const result = await response.json();
      
      console.log('API Response:', result);  // Log the response for debugging

      if (result && result.files_found) {
        setFiles(result.files_found);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  const handleSelectionChange = (event) => {
    const selectedFileId = event.target.value;
    const selectedFile = files.find(file => file.file_id === selectedFileId);
    if (selectedFile) {
      setSelectedFileLink(selectedFile.file_link);
    } else {
      setSelectedFileLink(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Download Page</h1>
      {files.length > 0 ? (
        <div>
        {/* <div className="poster-container" >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Use movie poster_path
              alt={movie.title}
            />
          </div> */}
          <select onChange={handleSelectionChange}>
            <option value="">Select a file</option>
            {files.map(file => (
              <option key={file.file_id} value={file.file_id}>
                {file.file_name} ({file.file_type})
              </option>
            ))}
          </select>
          {selectedFileLink ? (
            <a href={selectedFileLink} download>
              <button>Download Selected File</button>
            </a>
          ) : (
            <div>Please select a file to download</div>
          )}
        </div>
      ) : (
        <div className="no-results">
          <h1>No results available</h1>
          <img src={errro} alt="Error" />
        </div>
      )}
    </div>
  );
};

export default DownloadPage;
