import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const movies = [
    "Self-Help (2025)",
    "Double Feature: Hallow Road / Vincent Must Die",
    "Rocky IV: Rocky vs. Drago - The Director's Cut",
    "Baahubali: The Epic (2025)",
    "Tron: Ares (2025)",
    "One Battle After Another (2025)",
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    if (onSearch) onSearch(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const filtered = movies.filter((movie) =>
      movie.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
    setShowDropdown(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (title) => {
    setInput(title);
    setShowDropdown(false);
    if (onSearch) onSearch(title);
  };

  return (
    <div className="search-container relative w-full max-w-md">
      <div className="flex items-center p-2 w-full h-10 bg-gray-700 shadow-xl border border-gray-500">
        <input
          className="grow bg-transparent text-white outline-none px-3"
          placeholder="Search Movies..."
          value={input}
          onChange={handleChange}
        />
        <button onClick={() => onSearch(input)} className="cursor-pointer">
          <FaSearch className="text-white hover:scale-110" />
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute left-0 w-full bg-white text-black shadow-md z-50 mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((title, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(title)}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
