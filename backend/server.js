import express from "express";
import cookieParser from "cookie-parser";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";

const PORT = process.env.PORT;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["idk yet"],
    credentials: true,
  })
);

const requireAuth = async (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token)
    return res.status(401).json({ error: "Missing or invalid access token" });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user)
    return res.status(401).json({ error: "Invalid or expired session" });

  req.user = data.user;
  next();
};

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
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", user: data.user });
  } catch (err) {
    res.status(500).json({ error: "Login request failed" });
  }
});

app.get("/me", requireAuth, (req, res) => {
  res.status(200).json({ user: req.user });
});

app.post("/logout", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
