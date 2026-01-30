"use client";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Login({ onLogin }: { onLogin: (user: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const usersRef = collection(db, "usuarios");
      const q = query(usersRef, where("usuario", "==", username), where("clave", "==", password));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        onLogin(username);
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Error al conectar con la base de datos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/bg-hards.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: '200px',
      }}
    >
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-4 max-w-md w-full mx-4 p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-pink-400"
        style={{
          boxShadow: '0 8px 32px rgba(236, 72, 153, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.6)'
        }}
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          <h2 className="text-3xl font-bold text-pink-600 text-center drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(236, 72, 153, 0.3)' }}>
            💕 Iniciar Sesión 💕
          </h2>
          <div className="flex gap-2">
            <span className="text-2xl">🌸</span>
            <span className="text-2xl">💖</span>
            <span className="text-2xl">🌸</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="a veces te digo amor, pero casi siempre te digo..."
            value={username}
            onChange={e => setUsername(e.target.value.toLowerCase())}
            className="border-2 border-pink-300 rounded-lg px-4 py-3 text-sm placeholder:text-pink-400/70 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
            required
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="seguido te digo que te amo, pero aun mas seguido te digo..."
            value={password}
            onChange={e => setPassword(e.target.value.toLowerCase())}
            className="border-2 border-pink-300 rounded-lg px-4 py-3 text-sm placeholder:text-pink-400/70 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
            required
          />
        </div>
        
        <p className="text-xs text-pink-600 text-center italic">✨ Usa solo minúsculas ✨</p>
        
        {error && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3">
            <span className="text-red-600 text-sm text-center block">{error}</span>
          </div>
        )}
        
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold py-3 rounded-lg hover:from-pink-500 hover:to-pink-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          style={{
            boxShadow: '0 4px 14px rgba(236, 72, 153, 0.4)'
          }}
          disabled={loading}
        >
          {loading ? "💗 Cargando..." : "💝 Entrar 💝"}
        </button>
      </form>
    </div>
  );
}
