import React from "react";
import useSupabaseUser from "../../hooks/useSupabaseUser";

function GetMovie({ id }) {
  const postData = {
    product_id: id,
    quantity: 1,
    price: "18",
  };
  const { session } = useSupabaseUser();
  async function addToCart() {
    if (!session) return;
    try {
      const response = await fetch("http://localhost:8000/cart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const data = await response.json();
      console.log("Added to cart successfully:", data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  return (
    <div className="w-[50%]">
      <button
        className="mt-2 w-full border-2 border-red-400 text-red-300 rounded-xl p-2.5 font-semibold 
  hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/40 transition-all duration-200"
        onClick={addToCart}
      >
        Get Ticket
      </button>
    </div>
  );
}

export default GetMovie;
