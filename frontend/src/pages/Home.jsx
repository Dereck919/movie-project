import React, { useState, useEffect } from "react";
import { SearchBar } from "../components/common/SearchBar.jsx";
import MovieCard from "../components/common/MovieCard.jsx";
import MovieCarousel from "../components/common/MovieCarousel.jsx";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex flex-col">
      <div className="text-center m-5">
        <h1 className="text-white">HEY</h1>
      </div>

      <div className="flex justify-center mb-4">
        <SearchBar onSearch={setSearchTerm} />
      </div>
      <MovieCarousel searchTerm={searchTerm}/>
    </div>
  );
}

export default Home;
