import React from "react";

function MovieCard(props) {
  const { title, link, image, runtime, rating } = props;

  return (
    <div className="mx-auto my-5">
      <div className="bg-black">
        <img
          src={image}
          alt="movie poster"
          className="border-b-8 border-white"
        />
        <div className="p-3 h-28">
          <h2 className="lg:text-lg md:text-xs sm:text-xs text-white font-bold">
            {title}
          </h2>
          <p className="text-sm text-white">
            {runtime} | {rating}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
