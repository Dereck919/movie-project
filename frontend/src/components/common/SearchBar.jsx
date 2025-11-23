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
    <div className="search-container relative w-full max-w-lg">
      <div className="flex items-center p-3 w-full h-12 bg-red-900/60 shadow-lg border border-black-500 rounded-xl">
        <input
          className="grow bg-transparent text-white outline-none px-4"
          placeholder="Search Movies..."
          value={input}
          onChange={handleChange}
        />
        <button onClick={() => onSearch(input)} className="cursor-pointer">
          <FaSearch className="text-red-200 hover:text-red-300 transition" />
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute left-0 w-full bg-red-950 text-red-100 border border-red-500 rounded-xl shadow-xl z-50 mt-2 max-h-60 overflow-y-auto">
          {suggestions.map((title, index) => (
            <li
              key={index}
              className="p-3 hover:bg-red-600 hover:text-white cursor-pointer transition"
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
