import React, { useState, useEffect } from "react";
import { SearchBar } from "../components/common/SearchBar.jsx";
import MovieCard from "../components/common/Moviecard.jsx";
import MovieCarousel from "../components/common/MovieCarousel.jsx";
import supabase from "../supabaseClient.js";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;

      setMovies(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold mb-2">Error loading movies</p>
          <p>{error}</p>
          <button
            onClick={fetchMovies}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
  <div className="bg-red-900/10 border border-red-700 rounded-xl p-6 mx-5 mt-10 shadow-xl">
  <div className="bg-black border border-black rounded-xl p-6 mb-8">
  <div className="flex justify-center mb-6">
    <SearchBar onSearch={setSearchTerm} />
  </div>
  <div className="text-center mb-5">
    <h1 className="text-white">Now Playing</h1>
    <div className="w-200 h-1 bg-red-800 mx-auto rounded-full mt-4"></div>
    <p className="text-gray-200 text-sm mt-5 tracking-wide">
    Featured movies - Showtimes & Availability
  </p>
  </div>
  </div>
      <MovieCarousel searchTerm={searchTerm} />
      </div>
      <div className="my-15">
        <div className="text-center m-5">
          <h1 className="text-white">Get Tickets</h1>
        </div>
        <div className="bg-black p-6 rounded-xl border border-neutral-800 shadow-xl mx-5">

        {movies.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-xl">No movies found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-5">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                rating={movie.rating}
                runtime={movie.runtime}
                image={movie.image_url}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Home;
