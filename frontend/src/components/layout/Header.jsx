import React from "react";
import { Link } from "react-router-dom";
import { PiFilmSlate } from "react-icons/pi";
import supabase from "../../supabaseClient";

const navStyle = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const navLinksStyle = {
  display: "flex",
  gap: "1rem",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error.message);
  } else {
    window.location.href = "/authentication";
  }
};

function Header() {
  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        <h1 className="flex items-center gap-2">
          ANC Movies
          <span className="text-yellow-400 text-5xl">
            <PiFilmSlate />
          </span>
        </h1>
      </Link>
      <div style={navLinksStyle}>
        <Link to="/" style={linkStyle}>
          Movies
        </Link>
        <Link to="/ticket" style={linkStyle}>
          My Tickets
        </Link>
        <Link to="/authentication" style={linkStyle}>
          Login
        </Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Header;

//bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 for later use
