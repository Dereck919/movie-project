import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const PORT = process.env.PORT;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

const requireAuth = async (req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
  if (!token)
    return res.status(401).json({ error: "Missing or invalid access token" });

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user)
    return res.status(401).json({ error: "Invalid or expired session" });

  req.user = data.user;
  next();
};

const requireAuthPostmanTest = async (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token)
    return res.status(401).json({ error: "Missing or invalid access token" });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user)
    return res.status(401).json({ error: "Invalid or expired session" });

  req.user = data.user;
  next();
};

app.get("/", async (req, res) => {
  res.status(200).json({ message: "hi" });
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email, and password required" });

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({
      message: "User signed up successfully",
      user: data.user,
    });
  } catch (err) {
    res.status(500).json({ error: "Signup request failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return res.status(401).json({ error: error.message });

    const accessToken = data.session?.access_token;
    if (!accessToken)
      return res.status(401).json({ error: "No session returned" });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: data.user,
    });
  } catch (err) {
    res.status(500).json({ error: "Login request failed" });
  }
});

app.delete("/logout", async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    res.clearCookie("access_token", { path: "/" });

    if (error) throw error;

    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Logout failed" });
  }
});

app.get("/me", requireAuthPostmanTest, (req, res) => {
  res.status(200).json({ user: req.user });
});

app.post("/cart", requireAuthPostmanTest, async (req, res) => {
  try {
    const user = req.user;
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ error: "error" });
    }

    const { data: cart, error: cartError } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (cartError || !cart) {
      console.error(cartError);
      return res.status(404).json({ error: "Cart not found for user" });
    }

    const { data: newItem, error: insertError } = await supabase
      .from("cart_items")
      .insert({ cart_id: cart.id, product_id, quantity })
      .select("*")
      .single();

    if (insertError) {
      console.error(insertError);
      return res.status(500).json({ error: "Failed to add cart item" });
    }

    res.status(201).json(newItem);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/cart", requireAuth, async (req, res) => {
  try {
    const { data: cart, error: cartError } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", req.user.id)
      .single();

    if (cartError || !cart) {
      console.error(cartError);
    }

    const { data: items, error: itemsError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("cart_id", cart.id);

    if (itemsError || !items) {
      console.error(itemsError);
    }
    res.json({ cart_id: cart.id, items });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
