import React from "react";
import GetMovie from "./GetMovie";

function MovieCard(props) {
  const { title, image, runtime, rating, id, session } = props;

  return (
    <div className="mx-auto my-6 w-80">
      <div className="bg-black rounded-xl borderborder-yellow-500 shadow-[0_0_12px_rgba(255,215,0,0.6)] p-2 w-64 h-full flex flex-col">
        <img
          src={image}
          alt="movie poster"
          className="w-full h-80 object-cover rounded-md"
        />

        <div className="mt-3 flex flex-col grow">
          <h2 className="text-white font-bold text-lg">{title}</h2>
          <p className="text-gray-300 text-sm mb-2">
            {runtime} | {rating}
          </p>

          {/* Push button to bottom */}
          <div className="mt-auto pt-3">
            <GetMovie id={id} session={session} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
