import React, { useState, useEffect } from "react";
import Loading from "../components/common/Loading.jsx";
import MovieCard from "../components/common/Moviecard.jsx";

function Home() {
  return (
    <div class="flex-col justify-center">
      <h1>Now Playing</h1>
      <div class="grid grid-cols-2  gap-4">
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
