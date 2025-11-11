import { createClient } from "@supabase/supabase-js";

const supabase_url = "https://tavfaujztsagthfjcyti.supabase.co";
const supabase_anon_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhdmZhdWp6dHNhZ3RoZmpjeXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3ODg5MDIsImV4cCI6MjA3NjM2NDkwMn0._HBVyhcRG0yhA0l2tU26RXrFkTQ23PqCltVUgpESJKk";

const supabase = createClient(supabase_url, supabase_anon_key);

export default supabase;
