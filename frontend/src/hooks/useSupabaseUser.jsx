import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

function useSupabaseUser() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const { data } = await supabase.auth.getSession();
      if (mounted) {
        setSession(data.session);
        setUser(data.session?.user ?? null);
        setLoading(false);
      }
    }

    load();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
        }
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, session, loading };
}

export default useSupabaseUser;
