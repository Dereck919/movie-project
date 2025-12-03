import React, { useState } from "react";
import { Link } from "react-router-dom";
import onSwitch from "../../pages/Authentification.jsx";
import AuthButton from "./AuthButton.jsx";

export default function LoginCommon({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-red-900 via-black-900 to-black text-white px-4 ">
      <div className="w-full max-w-md">
        <div className="p-8 border border-red-700/40 rounded-2xl shadow-[0_0_25px_rgba(220,38,38,0.5)] bg-black backdrop-blur-md">
          <div className="mb-6 text-center">
            <h1 className="font-mono text-3xl tracking-tight text-white">
              🎟️ Welcome Back!
            </h1>
            <p className="text-sm text-white mt-2">
              Sign in to your account
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* email*/}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-white"
              >
                Email<span className="text-red-400">*</span>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-red-600 bg-black/40 text-white rounded-lg p-2.5 placeholder:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:border-red-400"
                id="email"
                type="email"
                placeholder="filmfan@sdsu.edu"
                required
              />
            </div>

            {/* password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-white"
              >
                Password<span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  className="mt-1 w-full border border-red-600 bg-black/40 text-white rounded-lg p-2.5 pr-12 placeholder:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:border-red-400"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 border border-red-600 rounded-md text-red-300 hover:bg-red-700/30 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* the remember and forgot options */}
            <div className="flex items-center justify-between text-sm text-red-200">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 accent-red-500" />{" "}
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-white hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <AuthButton email={email} password={password} />

            {/* Divider */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-red-800" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-900/80 px-2 text-xs text-red-400">
                  or
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-red-600 rounded-lg p-2.5 hover:bg-red-800/30 transition text-red-200"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                width="18"
                height="18"
              />
              <span className="text-sm">Sign in with Google</span>
            </button>
          </div>

          <p className="text-sm mt-6 text-center text-white">
            Don’t have an account?{" "}
            <button
              onClick={onSwitch}
              className="hover:underline hover:text-blue-500"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
