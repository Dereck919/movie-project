import React from 'react'

function MovieCard(props) {
    // js stuff / react 

    const title = "Chainsaw Man";
    const link = "placeholder link";
    const image = "placeholder image";
    const runtime = "1 HR 40 MIN";
    const rating = "R";

  return (
    // html and tailwind stuff
    <div class="m-4 mb-8 w-auto px-4 mx-auto sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div class="bg-black">
        <img src="https://amc-theatres-res.cloudinary.com/image/upload/c_limit,w_272/f_auto/q_auto/v1757961476/amc-cdn/production/2/movies/79900/79902/PosterDynamic/173099.jpg" alt="movie poster" />
        <div class="p-3">
          <h2 class="text-lg text-white font-bold">{title}</h2>
          <p class="text-sm text-white">{runtime} | {rating}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard