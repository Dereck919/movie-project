import { createClient } from "@supabase/supabase-js";

const supabase_url = import.meta.env.VITE_supaurl;
const supabase_anon_key = import.meta.env.VITE_supakey;
const supabase = createClient(supabase_url, supabase_anon_key);

export default supabase;
