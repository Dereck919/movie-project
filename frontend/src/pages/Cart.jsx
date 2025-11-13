import React from "react";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <div>
      <Link
        to="/checkout"
        className="text-black bg-amber-500 border-2 border-white"
      >
        Checkout
      </Link>
    </div>
  );
}

export default Cart;
