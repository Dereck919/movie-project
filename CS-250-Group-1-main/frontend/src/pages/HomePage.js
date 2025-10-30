// frontend/src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import { getMovies } from '../services/movieService'; // Import the API function
import MovieCard from '../components/booking/MovieCard'; // Import a display component
import LoadingSpinner from '../components/common/LoadingSpinner.js'; // Import a loading spinner
import './HomePage.css'; // Import the HomePage styles

function HomePage() {
  // 'movies' will hold our list of movies from the API
  // 'setMovies' is the function we use to update it
  const [movies, setMovies] = useState([]);
  
  // 'loading' will be true while we are fetching data
  const [isLoading, setIsLoading] = useState(true);
  
  // 'error' will hold any error messages
  const [error, setError] = useState(null);

  // useEffect runs after the component mounts (loads)
  useEffect(() => {
    // We define an async function inside to fetch data
    async function fetchMovies() {
      try {
        // Call our service function, which returns a promise
        const response = await getMovies();
        setMovies(response.data); // Save the movie list from the response
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        console.error(err);
      } finally {
        // This runs whether it succeeded or failed
        setIsLoading(false);
      }
    }

    fetchMovies(); // Call the function
  }, []); // The empty array [] means this effect runs only ONCE

  // --- Render logic ---

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-page">
      <h1>Now Playing</h1>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard 
              key={movie.id} 
              title={movie.title} 
              posterUrl={movie.poster_url}
              duration={movie.duration}
              genre={movie.genre}
            />
          ))
        ) : (
          <p>No movies available. {error ? `Error: ${error}` : 'Loading...'}</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;