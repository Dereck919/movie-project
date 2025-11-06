import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import MovieCard from "./MovieCard";

const MovieCarousel = () => {
  const [current, setCurrent] = useState(0);
  const items = [
    <MovieCard />,
    <MovieCard />,
    <MovieCard />,
    <MovieCard />,
    <MovieCard />,
    <MovieCard />,
  ];

  const next = () => setCurrent((current + 1) % items.length);
  const prev = () => setCurrent((current - 1 + items.length) % items.length);

  return (
    <div className="grid grid-cols-[0.1fr_1fr_1fr_1fr_1fr_1fr_1fr_0.1fr] gap-1 m-10 justify-items-center">
      <button onClick={prev}>
        <FaChevronLeft className="hover:outline-2 outline-gray-500 outline-offset-4 rounded-md" />
      </button>
      {items.map((item, i) => (
        <div
          key={i}
          className={`col-span-1 ${
            i === current ? "scale-110" : "col-span-1"
          } hover:scale-110 cursor-pointer`}
          onClick={() => setCurrent(i)}
        >
          {item}
        </div>
      ))}
      <button onClick={next}>
        <FaChevronRight className="hover:outline-2 outline-gray-500 outline-offset-4 rounded-md" />
      </button>
    </div>
  );
};

export default MovieCarousel;
