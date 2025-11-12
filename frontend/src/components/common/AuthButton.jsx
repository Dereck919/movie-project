import React from "react";
import api from "axios";
import { useState } from "react";

export default function AuthButton({ email, password }) {
  const [status, setStatus] = useState(null);
  const login = async () => {
    api
      .get("http://localhost:8000/login", { email, password })
      .then((response) => {
        setStatus(response.status);
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
          setStatus(error.response.status);
        } else {
          setStatus(500);
          console.log(error + "5");
        }
      });
  };

  return (
    <div>
      <button
        className="mt-2 w-full border-2 border-purple-500 text-purple-300 rounded-lg p-2.5 font-medium hover:bg-purple-700 hover:text-white transition"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
}
