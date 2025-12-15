import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const PORT = process.env.PORT;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const admin = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseAdmin = createClient(supabaseUrl, admin);

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

app.post("/cartest", requireAuthPostmanTest, async (req, res) => {
  try {
    const user = req.user;
    const { product_id, quantity, price } = req.body;

    if (!product_id || !quantity || !price) {
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
      .insert({ cart_id: cart.id, product_id, quantity, price })
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

app.post("/cart", requireAuth, async (req, res) => {
  try {
    const user = req.user;
    const { product_id, quantity, price } = req.body;

    if (!product_id || !quantity || !price) {
      return res.status(400).json({ error: "error" });
    }

    const { data: cart, error: cartError } = await supabaseAdmin
      .from("carts")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (cartError || !cart) {
      console.error(cartError);
      return res.status(404).json({ error: "Cart not found for user" });
    }

    const { data: newItem, error: insertError } = await supabaseAdmin
      .from("cart_items")
      .insert({ cart_id: cart.id, product_id, quantity, price })
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

app.post("/updateCart", requireAuth, async (req, res) => {
  try {
    const user = req.user;
    const { quantity, id } = req.body;

    if (!quantity) {
      return res.status(400).json({ error: "error" });
    }

    const { data: cart, error: cartError } = await supabaseAdmin
      .from("carts")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (cartError || !cart) {
      console.error(cartError);
      return res.status(404).json({ error: "Cart not found for user" });
    }

    const { data: quant, error: updateError } = await supabaseAdmin
      .from("cart_items")
      .update({ quantity })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error(updateError);
      return res.status(500).json({ error: "Failed to update" });
    }

    res.status(201).json(quant);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/cart", requireAuth, async (req, res) => {
  try {
    const { data: cart, error: cartError } = await supabaseAdmin
      .from("carts")
      .select("id")
      .eq("user_id", req.user.id)
      .maybeSingle();

    if (cartError || !cart) {
      console.error(cartError);
      console.log(req.user.id);
    }

    const { data: items, error: itemsError } = await supabaseAdmin
      .from("cart_items")
      .select(`*, movies(*)`)
      .eq("cart_id", cart.id);

    if (itemsError || !items) {
      console.error(itemsError);
    }
    res.json({ cart_id: cart.id, items: items ?? [] });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/cartest", requireAuthPostmanTest, async (req, res) => {
  try {
    const { data: cart, error: cartError } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", req.user.id)
      .single();

    if (cartError || !cart) {
      console.log("no cart silly");
      console.error(cartError);
    }

    const { data: items, error: itemsError } = await supabase
      .from("cart_items")
      .select(`*, movies(*)`)
      .eq("cart_id", cart.id);

    if (itemsError || !items) {
      console.error(itemsError);
    }
    res.json({ cart_id: cart.id, items: items ?? [] });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/cart/:id", requireAuth, async (req, res) => {
  try {
    const itemId = req.params.id;
    const { data: cart, error: cartError } = await supabaseAdmin
      .from("carts")
      .select("id")
      .eq("user_id", req.user.id)
      .single();

    if (cartError || !cart) {
      console.log("no cart silly");
      console.error(cartError);
    }

    const { data: items, error: itemsError } = await supabaseAdmin
      .from("cart_items")
      .delete()
      .eq("id", itemId);

    if (itemsError) {
      console.error(itemsError);
    }
    return res.status(200).json({ message: "Cart items deleted successfully" });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/tickets", requireAuth, async (req, res) => {
  const { user_id } = req.body;
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ error: "error" });
    }

    const { data: ticket, error: insertError } = await supabaseAdmin
      .from("tickets")
      .insert({ user_id })
      .select("*")
      .single();

    if (insertError) {
      console.error(insertError);
      return res.status(500).json({ error: "Failed to create ticket" });
    }

    res.status(201).json(ticket);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/tickets", requireAuth, async (req, res) => {
  try {
    const { data: tickets, error } = await supabaseAdmin
      .from("tickets")
      .select("id")
      .eq("user_id", req.user.id)
      .maybeSingle();

    if (error || !tickets) {
      console.error(error);
    }
    res.json({ tickets });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
