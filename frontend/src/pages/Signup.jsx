import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div class="flex 1 justify-center items-center pr-2">
      <div class=" p-20 m-20 border-2">
        <h1 class="font-mono">Sign up</h1>
        <form class="flex flex-col gap-2">
          <label htmlFor="email">Email:</label>
          <input
            class="border"
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            class="border"
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            required
          />
          <button type="submit" class="border-2 rounded-sm">
            Get Started
          </button>
        </form>
        <p class="text">
          Already have an account?{" "}
          <Link to="/login" class="text-blue-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
