// backend/services/movieService.js

// Using SerpAPI, uses webscraping from Google. Free API access is limited to 250 pulls per month so limit your testing or find another API to use.

// import api from './api'; // Import our pre-configured api client

// Currently we have built no self-made API. If you create one, api.js is where you'd put functions to access it.

// If you don't want to use searches of the API, use TestData.json as an example of a search that returns good data
// and TestData2.json as an example of a search that uses bad data.

// Function to get a list of all currently playing movies. This is more or less placeholder, only the scraping
// part of the method functions as of now, but you can build it from here.
// Import movie poster images
import inception from '../assets/images/inception.jpg';
import barbie from '../assets/images/barbie.jpeg';
import dune from '../assets/images/dune.jpeg';

// For now we return mock data in the same shape HomePage expects so the UI can render.
// This is a small, safe placeholder until a proper backend or external API is wired up.
export const getMovies = async () => {
  // Mock movie data - include fields HomePage + MovieCard expect: id, title, poster_url, duration, genre
  const mockMovies = [
    {
      id: 'm1',
      title: 'Inception',
      poster_url: inception,
      duration: '148',
      genre: 'Action/Sci-Fi',
    },
    {
      id: 'm2',
      title: 'Barbie',
      poster_url: barbie,
      duration: '114',
      genre: 'Comedy/Fantasy',
    },
    {
      id: 'm3',
      title: 'Dune',
      poster_url: dune,
      duration: '155',
      genre: 'Action/Adventure',
    },
  ];

  // Simulate a small network delay to make the spinner show briefly
  await new Promise(resolve => setTimeout(resolve, 300));

  // Return an object with a `data` property so HomePage can read `response.data` as-is
  return { data: mockMovies };
};

// Function to get the details for a single movie (e.g., by its ID)
/*
export const getMovieById = (id) => {

};

Function to get showtimes for a specific movie
export const getShowtimes = (movieId) => {

};*/

// You can add all other movie-related API calls here