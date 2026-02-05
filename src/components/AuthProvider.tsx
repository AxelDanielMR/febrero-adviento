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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Persistencia simple en localStorage
    const stored = localStorage.getItem("adviento_user");
    if (stored) setUser(stored);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("adviento_user", user);
    } else {
      localStorage.removeItem("adviento_user");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  // Evitar flash de contenido no autenticado
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center animated-bg">
        <div className="text-pink-700 font-bold text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user ? (
        <>
          {children}
          {/* Botón de cerrar sesión abajo a la derecha */}
          <button
            onClick={handleLogout}
            className="fixed bottom-4 right-4 z-50 bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-pink-600 transition"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <Login onLogin={setUser} />
      )}
    </AuthContext.Provider>
  );
}
