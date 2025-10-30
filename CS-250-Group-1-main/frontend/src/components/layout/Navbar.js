import React from 'react';
import { Link } from 'react-router-dom';

// Basic styles for the Navbar, you can move these to a CSS file later
const navStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navLinksStyle = {
  display: 'flex',
  gap: '1rem',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
};

function Navbar() {
  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        <h1>Smart Movie Theater Ticketing System</h1>
      </Link>
      <div style={navLinksStyle}>
        <Link to="/" style={linkStyle}>Movies</Link>
        <Link to="/profile" style={linkStyle}>My Tickets</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
