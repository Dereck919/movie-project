import React from "react";
import { Link } from "react-router-dom";
import Login from "../../pages/Login";

const navStyle = {
  backgroundColor: "#333",
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

function Header() {
  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        <h1>Smart Movie Theater Ticketing System</h1>
      </Link>
      <div style={navLinksStyle}>
        <Link to="/" style={linkStyle}>
          Movies
        </Link>
        <Link to="#" style={linkStyle}>
          My Tickets
        </Link>
        <Link to="/Login" style={linkStyle}>
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Header;
