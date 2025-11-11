import React from "react";

function MovieCard(props) {
  const { title, image, runtime, rating } = props;

  return (
    <div className="mx-auto my-5">
      <div className="bg-black">
        <img
          src={image}
          alt="movie poster"
          className="border-b-8 border-white max-h-[600px]"
        />
        <div className="h-28 py-3 pl-3">
          <h2 className="lg:text-lg md:text-xs sm:text-xs text-white font-bold w-64">
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
