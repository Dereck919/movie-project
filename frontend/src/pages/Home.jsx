import React, { useState, useEffect } from "react";
import Loading from "../components/common/Loading.jsx";
import Moviecard from "../components/common/Moviecard.jsx";

function Home() {
  return (
    <div class="flex flex-col">
      <h1 class="text-center">Now Playing</h1>
      <div class="grid grid-cols-6 gap-8 p-8">
        <Moviecard />
        <Moviecard />
        <div class="border-2 rounded-md">01</div>
        <div class="border-2 rounded-md">02</div>
        <div class="border-2 rounded-md">03</div>
        <div class="border-2 rounded-md">04</div>
        <div class="border-2 rounded-md">05</div>
        <Moviecard />
        <div class="border-2 rounded-md">06</div>
      </div>
      <div class="grid grid-cols-4 gap-20 m-8 border-2 p-8">
        <div class="border-2 rounded-md">Movie 01</div>
        <div class="border-2 rounded-md">Movie 02</div>
        <div class="border-2 rounded-md">Movie 03</div>
        <div class="border-2 rounded-md">Movie 04</div>
        <div class="border-2 rounded-md">Movie 05</div>
        <div class="border-2 rounded-md">Movie 06</div>
        <div class="border-2 rounded-md">Movie 01</div>
        <div class="border-2 rounded-md">Movie 02</div>
        <div class="border-2 rounded-md">Movie 03</div>
        <div class="border-2 rounded-md">Movie 04</div>
        <div class="border-2 rounded-md">Movie 05</div>
        <div class="border-2 rounded-md">Movie 06</div>
      </div>
      <Loading />
    </div>
  );
}

export default Home;
