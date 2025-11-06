import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  const [input, setInput] = useState("");

  return (
    <div className="flex 1 p-2 justify-center w-full h-10 px-[15px] shadow-xl border-white">
      <input
        className="rounded-md h-full w-full text-[0.75rem] outline-hidden text-white"
        placeholder="Type to search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={console.log(input)} className="cursor-pointer">
        <FaSearch id="search-icon" className="text-white hover:scale-110" />
      </button>
    </div>
  );
};
