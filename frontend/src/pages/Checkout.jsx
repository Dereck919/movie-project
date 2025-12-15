import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const location = useLocation();
  const price = location.state?.price;
  const { user, session } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log("Checkout data:", {
  //     paymentMethod,
  //     ...formData,
  //   });
  //   alert("Demo checkout only — no real payment is processed.");
  // }

  async function getTicket() {
    if (!session) return;
    const user_id = user.id;
    try {
      const response = await fetch("http://localhost:8000/tickets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const data = await response.json();
      console.log("Bought ticket", data);
      window.location.assign("http://localhost:5173/ticket");
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl rounded-2xl border border-amber-500/40 bg-slate-900/70 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.65)] p-6 md:p-10"
      >
        {/* Progress bar */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-[11px] md:text-xs text-slate-400">
            <span>Cart</span>
            <span>Checkout</span>
          </div>
          <div className="w-full bg-slate-800/60 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-amber-400 to-amber-500 rounded-full"
              style={{ width: "66%" }}
            />
          </div>
          <p className="text-xs text-slate-400">
            Step 2 of 3 · Payment & billing
          </p>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Checkout
            </h1>
            <p className="text-sm md:text-base text-slate-300 mt-1">
              Finalize your ticket order and get ready for the show.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/60 bg-amber-500/10 px-4 py-1 text-xs md:text-sm font-medium text-amber-300">
            <span className="text-lg">🎟️</span> Secure Checkout
          </span>
        </div>

        {/* Order summary */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-5 md:px-6 md:py-6 mb-5">
          <h2 className="text-sm md:text-base font-semibold mb-2">
            Order Summary
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mb-3">
            This is a demo summary. Later you can pull in real cart data here.
          </p>
          <div className="flex justify-between text-sm text-slate-300">
            <span>Tickets</span>
            <span>${price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-400">
            <span>Tax</span>
            <span>${(price * 0.0775).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base md:text-lg font-semibold text-slate-50 pt-2 border-t border-slate-700 mt-2">
            <span>Total</span>
            <span>${(price * 0.0775 + price).toFixed(2)}</span>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Payment + billing container */}
          <div className="rounded-xl border border-slate-800 bg-slate-750/40 px-4 py-5 md:px-6 md:py-6">
            <h2 className="text-sm md:text-base font-semibold mb-3">
              Payment & Billing Details
            </h2>

            {/* Payment method */}
            <div className="mb-4">
              <p className="text-xs md:text-sm text-slate-300 mb-2">
                Choose a payment method:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "card", label: "💳 Credit / Debit Card" },
                  { id: "paypal", label: "🅿️ PayPal" },
                  { id: "applepay", label: " Apple Pay" },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`px-3 py-1.5 rounded-full text-xs md:text-sm border transition 
                      ${
                        paymentMethod === method.id
                          ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                          : "bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800"
                      }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1 mb-4">
              <label className="block text-xs md:text-sm text-slate-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs md:text-sm text-slate-100 placeholder:text-slate-500
                           transition duration-150 ease-out
                           focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:scale-[1.01]"
              />
            </div>

            {/* Billing address */}
            <div className="mt-4 space-y-3">
              <h3 className="text-sm md:text-base font-medium">
                Billing Address
              </h3>

              <div className="space-y-1">
                <label className="text-xs md:text-sm text-slate-200 block">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs md:text-sm
                             transition duration-150 focus:outline-none 
                             focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:scale-[1.01]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs md:text-sm text-slate-200 block">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs md:text-sm
                             transition duration-150 focus:outline-none 
                             focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:scale-[1.01]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs md:text-sm text-slate-200 block">
                  Apartment / Unit (optional)
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  placeholder="Apt 250"
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs md:text-sm
                             transition duration-150 focus:outline-none 
                             focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:scale-[1.01]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 space-y-1">
                  <label className="text-xs md:text-sm text-slate-200 block">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs md:text-sm
                               transition duration-150 focus:outline-none 
                               focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:scale-[1.01]"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <label className="text-xs md:text-sm text-slate-200 block">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="CA"
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs md:text-sm
                               transition duration-150 focus:outline-none 
                               focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:scale-[1.01]"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 space-y-1">
                  <label className="text-xs md:text-sm text-slate-200 block">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipcode"
                    required
                    value={formData.zipcode}
                    onChange={handleChange}
                    placeholder="Postal Zipcode"
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs md:text-sm
                               transition duration-150 focus:outline-none 
                               focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:scale-[1.01]"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <label className="text-xs md:text-sm text-slate-200 block">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="USA"
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs md:text-sm
                               transition duration-150 focus:outline-none 
                               focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:scale-[1.01]"
                  />
                </div>
              </div>
            </div>

            {/* Card details animated */}
            <div className="mt-6">
              <AnimatePresence>
                {paymentMethod === "card" && (
                  <motion.div
                    key="card-fields"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <h3 className="text-sm md:text-base font-medium">
                      Card Details
                    </h3>

                    <input
                      type="text"
                      name="nameOnCard"
                      required
                      value={formData.nameOnCard}
                      onChange={handleChange}
                      placeholder="Name on card"
                      className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs md:text-sm
                                 transition duration-150 focus:outline-none 
                                 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:scale-[1.01]"
                    />

                    <input
                      type="text"
                      name="cardNumber"
                      maxLength={19}
                      required
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs md:text-sm
                                 transition duration-150 focus:outline-none 
                                 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:scale-[1.01]"
                    />

                    <div className="flex gap-3">
                      <input
                        type="text"
                        name="expiry"
                        required
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs md:text-sm
                                   transition duration-150 focus:outline-none 
                                   focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:scale-[1.01]"
                      />
                      <input
                        type="password"
                        name="cvv"
                        maxLength={4}
                        required
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="CVV"
                        className="w-24 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs md:text-sm
                                   transition duration-150 focus:outline-none 
                                   focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:scale-[1.01]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {paymentMethod !== "card" && (
                <p className="text-xs md:text-sm text-slate-400 mt-2">
                  <span className="font-semibold capitalize">
                    {paymentMethod}
                  </span>
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-transparent px-5 py-2.5 text-xs md:text-sm font-medium text-slate-200 hover:bg-slate-800 hover:border-slate-500 transition"
              >
                Go back to cart
              </Link>

              <button
                type="submit"
                onClick={getTicket}
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-2.5 text-xs md:text-sm font-semibold text-slate-950 shadow-md hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition"
              >
                Confirm purchase
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
