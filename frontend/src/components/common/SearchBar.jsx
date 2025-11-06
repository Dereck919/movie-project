import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div class="flex 1 p-2 justify-center w-full h-10 px-[15px] shadow-xl border">
      <input
        class="rounded-md h-full w-full text-[0.75rem] outline-hidden"
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button>
        <FaSearch id="search-icon" />
      </button>
    </div>
  );
};
