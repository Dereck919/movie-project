import React, { useState } from "react";
import { Link } from "react-router-dom";
import onSwitch from "../../pages/Authentification.jsx";
import AuthButton from "./AuthButton.jsx";

export default function LoginCommon({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const {email, setEmail} = useState("");
  const {password, setPassword} = useState("");


  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-purple-900 via-gray-900 to-black text-white px-4">
      <div className="w-full max-w-md">
        <div className="p-8 border border-purple-700/40 rounded-2xl shadow-[0_0_25px_rgba(128,90,213,0.4)] bg-gray-900/80 backdrop-blur-md">
          
          <div className="mb-6 text-center">
            <h1 className="font-mono text-3xl tracking-tight text-purple-300">
              🎟️ Welcome Back!
            </h1>
            <p className="text-sm text-purple-200 mt-1">Sign in to your account</p>
          </div>

       
          <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-purple-200">
                Email<span className="text-purple-400">*</span>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                
                className="mt-1 w-full border border-purple-600 bg-black/40 text-white rounded-lg p-2.5 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-purple-400"
                id="email"
                type="email"
                name="email"
                placeholder="filmfan@sdsu.edu"
                required
              />
            </div>

            {/* password */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-purple-200">
                Password<span className="text-purple-400">*</span>
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* the remember and forgot options */}
            <div className="flex items-center justify-between text-sm text-purple-200">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 accent-purple-500" /> Remember me
              </label>
              <Link to="/forgot-password" className="text-purple-400 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <AuthButton email={email} password={password} />

            {/* Divider */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-purple-800" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-900/80 px-2 text-xs text-purple-400">or</span>
              </div>
            </div>


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
              <span className="text-sm">Sign in with Google</span>
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm mt-6 text-center text-purple-200">
            Don’t have an account?{" "}
            <button onClick = {onSwitch} >
              
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
