import React from "react";
import GetMovie from "./GetMovie";

function MovieCard(props) {
  const { title, image, runtime, rating } = props;

  return (
    <div className="mx-auto my-6 w-80">
      <div className="bg-black rounded-xl border border-neutral-800 shadow-lg p-4 w-64">
        <img
          src={image}
          alt="movie poster"
          className="w-full h-80 object-cover"
        />
        <div className="mt-3">
          <h2 className="text-white font-bold text-lg">
            {title}
          </h2>
          <p className="text-gray-300 text-sm mb-2">
            {runtime} | {rating}
          </p>
          <GetMovie />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
