import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="flex 1 justify-center items-center pr-2">
      <div className=" p-20 m-20 border-2">
        <h1 className="font-mono">Sign in</h1>
        <form className="flex flex-col gap-2">
          <label htmlFor="email">Email:</label>
          <input
            className="border"
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            className="border"
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            required
          />
          <button type="submit" className="border-2 rounded-sm">
            Login
          </button>
        </form>
        <p className="text">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
