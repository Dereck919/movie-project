import React from "react";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthButton2({ email, password }) {
  const navigate = useNavigate();
  const signup = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("stupid", error.message);
      } else {
        console.log(data);
        navigate("/ticket", { replace: true });
      }
    } catch (err) {
      console.error("stupid 2", err);
    }
  };

  return (
    <div>
      <button
        className="mt-2 w-full border-2 border-purple-500 text-purple-300 rounded-lg p-2.5 font-medium hover:bg-purple-700 hover:text-white transition"
        onClick={signup}
      >
        Sign Up
      </button>
    </div>
  );
}
