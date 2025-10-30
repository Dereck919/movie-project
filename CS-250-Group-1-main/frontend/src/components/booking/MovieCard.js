// frontend/src/components/booking/MovieCard.js

import React from 'react';
import './MovieCard.css'; // You would create this CSS file to style your card

// We "destructure" the props object to get the variables directly
function MovieCard({ title, posterUrl, duration, genre }) {
  return (
    <div className="movie-card">
      <img src={posterUrl} alt={`${title} poster`} className="movie-card-poster" />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{title}</h3>
        <p className="movie-card-details">{genre} | {duration} min</p>
        <button className="movie-card-button">View Times</button>
      </div>
    </div>
  );
}

export default MovieCard;