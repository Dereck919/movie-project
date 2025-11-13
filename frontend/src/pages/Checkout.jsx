import React from "react";
import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <div>
      <Link
        to="/cart"
        className="text-black bg-amber-500 border-2 border-white"
      >
        Go back
      </Link>
    </div>
  );
}
