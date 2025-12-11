import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import MovieCard from "./MovieCard";

const MovieCarousel = () => {
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
      image="https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster--dark-mode.png/0/images/MasterRepository/fandango/240193/Ticketing_Rocky%20IV.jpg"
      runtime="1 hr 39 min"
      rating="PG13"
    />,
    <MovieCard
      title="Baahubali: The Epic (2025)"
      image="https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster--dark-mode.png/0/images/MasterRepository/fandango/241842/BAAHUBALI-THE-EPIC_FinalKeyArt_1080x1595.jpg"
      runtime="3 hr 58 min"
      rating="PG13"
    />,
    <MovieCard
      title="Tron: Ares (2025)"
      image="https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster--dark-mode.png/0/images/MasterRepository/fandango/240243/VELCRO_KA_DIGITAL_1SHT_TOS_sRGB_V10.jpg"
      runtime="1 hr 59 min"
      rating="PG13"
    />,
    <MovieCard
      title="One Battle After Another (2025)"
      image="https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster--dark-mode.png/0/images/MasterRepository/fandango/241516/OBAA_VERT_MAIN_2764x4096_DOM.jpg"
      runtime="2 hr 42 min"
      rating="R"
    />,
    <MovieCard
      title="Inside Out 2 (2024)"
      image="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/234178/insideout2-posterart.jpg"
      runtime="1 hr 36 min"
      rating="PG"
    />,
    <MovieCard
      title="Wicked: For Good (2025)"
      image="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/238985/WK2_Adv1Sheet2_Reach_RGB_3.jpg"
      runtime="2 hr 17 min"
      rating="PG"
    />,
  ];

  const [index, setIndex] = useState(0);

  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const next = () => {
    setIndex((prev) => (prev + 1) % totalPages);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  //UseEffect for whenever I click off the page, resets the target to null.
  //   const handleClickOutside = (e) => {
  //     if (!e.target.closest(".item-grid")) {
  //       setIndex(null);
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);
  //   return () => document.removeEventListener("click", handleClickOutside);
  // }, []);

  return (
    <div className="relative m-10 bg-black p-6 rounded-xl border border-black-700 shadow-xl">
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 
        bg-red-500/60 hover:bg-red-500 p-4 rounded-full shadow-lg 
        shadow-red-500/30 transition-all duration-200 "
      >
        <FaChevronLeft className="text-white text-2xl" />
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-center transition-all duration-300">
        {items.slice(
          index * ITEMS_PER_PAGE,
          index * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        )}
      </div>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 
        bg-red-500/60 hover:bg-red-500 p-4 rounded-full shadow-lg 
        shadow-red-500/30 transition-all duration-200"
      >
        <FaChevronRight className="text-white text-2xl" />
      </button>
    </div>
  );
};

export default MovieCarousel;
