"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthProvider";

export default function NotFound() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="min-h-screen w-full flex items-center justify-center animated-bg">
      <div className="text-center space-y-6 p-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border-2 border-pink-300 max-w-md">
        <h1 className="text-6xl font-bold text-pink-700">404</h1>
        <h2 className="text-2xl font-semibold text-pink-600">Página no encontrada</h2>
        <p className="text-gray-700">
          Lo sentimos, la página que buscas no existe.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push(user ? "/" : "/login")}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition shadow-md"
          >
            Ir al inicio
          </button>
          {user && (
            <button
              onClick={() => router.push("/calendario")}
              className="px-6 py-3 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition shadow-md"
            >
              Ir al calendario
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
