import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useSupabaseUser from "../hooks/useSupabaseUser";
import { motion } from "framer-motion";
import DeleteCartButton from "../components/common/DeleteCartButton";

const demoItems = [
  {
    id: 1,
    title: "CS 250 Lecture Film",
    tagline: "Horror • 1h 15m",
    price: 12.99,
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [price, setPrice] = useState(0);
  const { session } = useSupabaseUser();

  useEffect(() => {
    if (!session) return;

    async function fetchCart() {
      try {
        const response = await fetch("http://localhost:8000/cart", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        const data = await response.json();
        setCartItems(data.items || []);
      } catch {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      }
    }
    fetchCart();
  }, [session]);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price;
    }
    setPrice(total);
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl rounded-2xl border border-amber-500/40 bg-slate-900/70 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.65)] p-6 md:p-10 space-y-8"
      >
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] md:text-xs text-slate-400">
            <span>Cart</span>
            <span>Checkout</span>
            <span>Confirmation</span>
          </div>
          <div className="w-full bg-slate-800/60 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-amber-400 to-amber-500 rounded-full"
              style={{ width: "33%" }}
            />
          </div>
          <p className="text-xs text-slate-400">
            Step 1 of 3 · Review your cart
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Your Cart
            </h1>
            <p className="text-sm md:text-base text-slate-300 mt-1">
              Double-check your movies before heading to checkout.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-amber-600 bg-amber-500/10 px-4 py-1 text-xs md:text-sm font-medium text-amber-300">
            <span className="text-lg">🎬</span>
            <span>Now Playing</span>
          </div>
        </div>

        <div className="hidden md:flex text-xs md:text-sm text-slate-400 border-b border-slate-700 pb-2 px-2">
          <span className="w-2/3">Movie</span>
          <span className="w-1/6 text-right">Qty</span>
          <span className="w-1/6 text-right">Price</span>
        </div>

        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-3 md:px-4 md:py-4 hover:border-amber-400/70 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition"
            >
              {/* movie poster */}
              <div className="flex items-center gap-3 w-full md:w-2/3">
                <div className="w-[60px] h-[84px] md:w-[70px] md:h-[98px] rounded-lg bg-linear-to-b from-slate-600/70 via-slate-800 to-black flex items-center justify-center text-xs text-slate-200 border border-slate-600/70 shadow-inner">
                  <img src={item.movies.image_url} alt="" />
                </div>
                <div>
                  <p className="text-sm md:text-base font-medium text-slate-50">
                    {item.movies.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.movies.rating} • {item.movies.runtime}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-amber-300">
                    temp hard coded
                  </p>
                </div>
              </div>

              {/* q + price */}
              <div className="flex items-center justify-between w-full md:w-1/3 gap-4 md:gap-2">
                <div className="flex items-center justify-end md:justify-center gap-2 w-1/2">
                  <button
                    type="button"
                    className="w-7 h-7 rounded-full border border-slate-600 text-xs text-slate-200 flex items-center justify-center hover:bg-slate-800 transition"
                    disabled
                  >
                    −
                  </button>
                  <span className="text-sm text-slate-100">1</span>
                  <button
                    type="button"
                    className="w-7 h-7 rounded-full border border-slate-600 text-xs text-slate-200 flex items-center justify-center hover:bg-slate-800 transition"
                    disabled
                  >
                    +
                  </button>
                </div>
                <div className="w-1/2 text-right text-sm font-semibold text-slate-100">
                  ${item.price.toFixed(2)}
                </div>
                <DeleteCartButton session={session} id={item.id} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Promo code */}
        <div className="border border-slate-700 rounded-xl p-4 bg-slate-900/40">
          <p className="text-sm mb-2 text-slate-300">Have a promo code?</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs md:text-sm text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
            />
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-xs md:text-sm bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-600 transition"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Price summary */}
        <div className="rounded-xl border border-slate-700 bg-slate-950/40 p-4 md:p-5 space-y-2">
          <div className="flex justify-between text-sm text-slate-300">
            <span>Subtotal</span>
            <span>${price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-400">
            <span>Tax (7.75%)</span>
            <span>${(price * 0.0775).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base md:text-lg font-semibold text-slate-50 pt-2 border-t border-slate-700">
            <span>Total</span>
            <span>${(price * 0.0775 + price).toFixed(2)}</span>
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-transparent px-5 py-2.5 text-xs md:text-sm font-medium text-slate-200 hover:bg-slate-800 hover:border-slate-500 transition"
          >
            Continue browsing
          </Link>

          <Link
            to="/checkout"
            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-2.5 text-xs md:text-sm font-semibold text-slate-950 shadow-md hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition"
          >
            Proceed to checkout
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Cart;
