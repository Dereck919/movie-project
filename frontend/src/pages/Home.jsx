import React, { useState, useEffect } from "react";
import { SearchBar } from "../components/common/SearchBar.jsx";
import MovieCard from "../components/common/MovieCard.jsx";
import MovieCarousel from "../components/common/MovieCarousel.jsx";

function Home() {
  return (
    <div className="flex flex-col">
      <SearchBar />
      <div className="text-center m-5">
        <h1 className="text-white">HEY</h1>
      </div>
      <MovieCarousel />
      <div className="grid grid-cols-8 gap-2 justify-items-center"></div>
    </div>
  );
}

export default Home;
