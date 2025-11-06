import React from "react";

function MovieCard(props) {
  const title = "Chainsaw Man";
  const link = "placeholder link";
  const image = "placeholder image";
  const runtime = "1 HR 40 MIN";
  const rating = "R";
  const genre = "Fantasy";

  return (
    <div class="mx-auto my-5">
      <div class="bg-black">
        <img
          src="https://amc-theatres-res.cloudinary.com/image/upload/c_limit,w_272/f_auto/q_auto/v1757961476/amc-cdn/production/2/movies/79900/79902/PosterDynamic/173099.jpg"
          alt="movie poster"
        />
        <div class="p-3">
          <h2 class="text-lg text-white font-bold">{title}</h2>
          <p class="text-sm text-white">
            {runtime} | {rating}
          </p>
          <p class="text-sm text-white">{genre}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
