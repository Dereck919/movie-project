import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import MovieCard from "./MovieCard";

const MovieCarousel = () => {
  const [current, setCurrent] = useState(0);
  const items = [
    <MovieCard
      title="Self-Help (2025)"
      link="placeholder link"
      image="https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster--dark-mode.png/0/images/MasterRepository/fandango/242828/Self-Help-One-Sheet-TAGGED.jpg"
      runtime="1 hr 25 min"
      rating="R"
    />,
    <MovieCard
      title="Double Feature: Hallow Road / Vincent Must Die"
      link="placeholder link"
      image="https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster--dark-mode.png/0/images/MasterRepository/fandango/242351/HalloweenDoubleFeaturePoster-Final.jpg"
      runtime="1 Hr 20 Min"
      rating="Not Rated"
    />,
    <MovieCard
      title="Rocky IV: Rocky vs. Drago - The Director's Cut"
      link=""
      image="https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster--dark-mode.png/0/images/MasterRepository/fandango/240193/Ticketing_Rocky%20IV.jpg"
      runtime="1 hr 39 min"
      rating="PG13"
    />,
    <MovieCard
      title="Baahubali: The Epic (2025)"
      link=""
      image="https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster--dark-mode.png/0/images/MasterRepository/fandango/241842/BAAHUBALI-THE-EPIC_FinalKeyArt_1080x1595.jpg"
      runtime="3 hr 58 min"
      rating="PG13"
    />,
    <MovieCard
      title="Tron: Ares (2025)"
      link=""
      image="https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster--dark-mode.png/0/images/MasterRepository/fandango/240243/VELCRO_KA_DIGITAL_1SHT_TOS_sRGB_V10.jpg"
      runtime="1 hr 59 min"
      rating="PG13"
    />,
    <MovieCard
      title="One Battle After Another (2025)"
      link=""
      image="https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster--dark-mode.png/0/images/MasterRepository/fandango/241516/OBAA_VERT_MAIN_2764x4096_DOM.jpg"
      runtime="2 hr 42 min"
      rating="R"
    />,
  ];

  const next = () => setCurrent((current + 1) % items.length);
  const prev = () => setCurrent((current - 1 + items.length) % items.length);

  //UseEffect for whenever I click off the page, resets the target to null. Clutch for any porject so im making a comment on it just so I never forget this, even though I never leave comments on anything -ibrahim
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".item-grid")) {
        setCurrent(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative m-10">
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-50 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white hidden sm:block"
      >
        <FaChevronLeft className="text-2xl" />
      </button>

      <div className="item-grid grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 justify-items-center">
        {items.map((item, i) => (
          <div
            key={i}
            className={`col-span-1 ${
              i === current ? "scale-110 z-50" : "scale-100"
            } cursor-pointer transition-transform`}
            onClick={() => setCurrent(i)}
          >
            {item}
          </div>
        ))}
      </div>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-50 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white hidden sm:block"
      >
        <FaChevronRight className="text-2xl" />
      </button>
    </div>
  );
};

export default MovieCarousel;
