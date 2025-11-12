import React, { useState, useEffect } from "react";
import { SearchBar } from "../components/common/SearchBar.jsx";
import MovieCard from "../components/common/MovieCard.jsx";
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
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
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="text-center m-5">
        <h1 className="text-white">Now Playing</h1>
      </div>

      <div className="flex justify-center mb-4">
        <SearchBar onSearch={setSearchTerm} />
      </div>
      <MovieCarousel searchTerm={searchTerm} />
      <div className="my-15">
        <div className="text-center m-5">
          <h1 className="text-white">Get Tickets</h1>
        </div>

        {movies.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-xl">No movies found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
  );
}

export default Home;
