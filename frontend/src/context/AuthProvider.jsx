import { createContext, useContext } from "react";
import useSupabaseUser from "../hooks/useSupabaseUser";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useSupabaseUser();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
