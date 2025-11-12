import React from "react";

const footerStyle = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "1rem",
  // margin: "1rem 0 0 0",
  textAlign: "center",
  bottom: 0,
  left: 0,
  width: "100%",
};

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; ANC Moives</p>
    </footer>
  );
}

export default Footer;
