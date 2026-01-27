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
      setError("Error al conectar con la base de datos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xs mx-auto mt-12 p-6 bg-white rounded-xl shadow border border-pink-200">
      <h2 className="text-2xl font-bold text-pink-700 text-center">Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="border rounded px-3 py-2"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border rounded px-3 py-2"
        required
      />
      {error && <span className="text-red-600 text-sm text-center">{error}</span>}
      <button
        type="submit"
        className="bg-pink-500 text-white font-bold py-2 rounded hover:bg-pink-600 transition"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Entrar"}
      </button>
    </form>
  );
}
