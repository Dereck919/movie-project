import React, { useState, useEffect } from "react";
import Loading from "../components/common/Loading.jsx";

function Home() {
  return (
    <div className="home-page">
      <h1>Now Playing</h1>
      <Loading />      
    </div>
  );
}

export default Home;
