"use client";
import { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import Login from "../components/Login";

const AuthContext = createContext<{ user: string | null, setUser: (u: string | null) => void }>({ user: null, setUser: () => {} });

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Persistencia simple en localStorage
    const stored = localStorage.getItem("adviento_user");
    if (stored) setUser(stored);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("adviento_user", user);
    } else {
      localStorage.removeItem("adviento_user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user ? children : <Login onLogin={setUser} />}
    </AuthContext.Provider>
  );
}
