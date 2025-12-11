import React from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabaseClient";
import { useAuth } from "../../context/AuthProvider";

import { PiFilmSlate } from "react-icons/pi";
import { IoTicketOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";

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

function Header({ cartCount }) {
  const { user } = useAuth();

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        <h1 className="flex items-center gap-2">
          ANC Movies
          <span className="text-red-500 text-5xl">
            <PiFilmSlate />
          </span>
        </h1>
      </Link>
      {user ? (
        // LOGGED IN VIEW
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link to="/ticket" style={linkStyle}>
            <span>
              <IoTicketOutline className="text-2xl" />
            </span>
          </Link>
          <Link to="/cart" style={linkStyle}>
            <span>
              <IoCartOutline className="text-2xl" />
              {cartCount}
            </span>
          </Link>
          <button onClick={logout}>
            <span>
              <IoLogOutOutline className="text-2xl" />
            </span>
          </button>
        </div>
      ) : (
        // LOGGED OUT VIEW
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={navLinksStyle}>
            <Link to="/" style={linkStyle}>
              <span>
                <IoHomeOutline className="text-3xl" />
              </span>
            </Link>
            <Link
              to="/authentication"
              className="border bg-yellow-50 rounded-md text-black px-4 font-bold py-1"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;

//bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 for later use
