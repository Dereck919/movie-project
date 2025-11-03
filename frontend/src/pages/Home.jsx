import React, { useState, useEffect } from "react";
import Loading from "../components/common/Loading.jsx";

function Home() {
  return (
    <div class="flex-col justify-center">
      <h1>Now Playing</h1>
      <div class="grid grid-cols-3 gap-4">
        <div class="border-2 rounded-md">01</div>
        <div class="border-2 rounded-md">02</div>
        <div class="border-2 rounded-md">03</div>
        <div class="col-span-2 border-2 rounded-md">04</div>
        <div class="border-2 rounded-md">05</div>
        <div class="border-2 rounded-md">06</div>
        <div class="col-span-2 border-2 rounded-md">07</div>
      </div>
      <Loading />
    </div>
  );
}

export default Home;
