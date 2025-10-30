import React from 'react';

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '1rem',
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
};

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2025 Smart Movie Ticketing System - CS-250 Group 1</p>
    </footer>
  );
}

export default Footer;
