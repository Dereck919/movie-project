import React, { useState, useEffect } from "react";
import { SearchBar } from "../components/common/SearchBar.jsx";
import MovieCard from "../components/common/MovieCard.jsx";
import MovieCarousel from "../components/common/MovieCarousel.jsx";

function Home() {
  return (
    <div className="flex flex-col">
      <SearchBar />
      <div className="border-y-2 text-center m-1">
        <h1>NEW RELEASES</h1>
      </div>
      <MovieCarousel />
      <div className="grid grid-cols-8 gap-2 m-5">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}

export default Home;
