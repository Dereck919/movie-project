import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import useSupabaseUser from "../hooks/useSupabaseUser";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { session } = useSupabaseUser();

  useEffect(() => {
    if (!session) return;

    async function fetchCart() {
      const response = await fetch("http://localhost:8000/cart", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      const data = await response.json();
      setCartItems(data.items);
    }
    fetchCart();
  }, [session]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id.image}
            className="border p-4 rounded mb-3 bg-white shadow"
          >
            <p>
              <strong>Product:</strong> {item.product_id}
            </p>
            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
