import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupInCommon() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-purple-900 via-gray-900 to-black text-white px-4">
      <div className="w-full max-w-md">
        <div className="p-8 border border-purple-700/40 rounded-2xl shadow-[0_0_25px_rgba(128,90,213,0.4)] bg-gray-900/80 backdrop-blur-md">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="font-mono text-3xl tracking-tight text-purple-300">
              🎬 Sign up
            </h1>
            <p className="text-sm text-purple-200 mt-1">
              Create your account to begin your journey
            </p>
          </div>

          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-purple-200"
                >
                  First Name<span className="text-purple-400">*</span>
                </label>
                <input
                  className="mt-1 w-full border border-purple-600 bg-black/40 text-white rounded-lg p-2.5 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-purple-400"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-purple-200"
                >
                  Last Name<span className="text-purple-400">*</span>
                </label>
                <input
                  className="mt-1 w-full border border-purple-600 bg-black/40 text-white rounded-lg p-2.5 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-purple-400"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Smith"
                  required
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-purple-200"
              >
                Email<span className="text-purple-400">*</span>
              </label>
              <input
                className="mt-1 w-full border border-purple-600 bg-black/40 text-white rounded-lg p-2.5 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-purple-400"
                type="email"
                id="email"
                name="email"
                placeholder="filmlover@sdsu.edu"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-purple-200"
              >
                Password<span className="text-purple-400">*</span>
              </label>
              <div className="relative">
                <input
                  className="mt-1 w-full border border-purple-600 bg-black/40 text-white rounded-lg p-2.5 pr-12 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-purple-400"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 border border-purple-600 rounded-md text-purple-300 hover:bg-purple-700/30 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="mt-1 text-xs text-purple-300">
                Use 8+ characters with letters and numbers.
              </p>
            </div>

            {/* terms and privacy */}
            <label className="flex items-start gap-2 text-sm text-purple-200">
              <input
                type="checkbox"
                className="mt-0.5 accent-purple-500"
                required
              />
              I agree to the{" "}
              <span className="underline decoration-dotted text-purple-400">
                Terms
              </span>{" "}
              and{" "}
              <span className="underline decoration-dotted text-purple-400">
                Privacy Policy
              </span>
              .
            </label>

            {/* submit */}
            <button
              type="submit"
              className="mt-2 w-full border-2 border-purple-500 text-purple-300 rounded-lg p-2.5 font-medium hover:bg-purple-700 hover:text-white transition"
            >
              Get Started
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-purple-800" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-900/80 px-2 text-xs text-purple-400">
                  or
                </span>
              </div>
            </div>

            {/* google button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-purple-600 rounded-lg p-2.5 hover:bg-purple-800/30 transition text-purple-200"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                width="18"
                height="18"
              />
              <span className="text-sm">Sign up with Google</span>
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm mt-6 text-center text-purple-200">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
