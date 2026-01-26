
"use client";
import { useState, useEffect } from "react";
import { AdvientoGrid } from "../../components/AdvientoGrid";

export default function Calendario() {
  const [showInfo, setShowInfo] = useState(false);
  const [jump, setJump] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setJump(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center animated-bg">
      <div className="w-full flex flex-col items-center pt-8 pb-4">
        <div className="flex justify-center items-center w-full gap-2 mb-2">
          <h1 className="text-4xl font-bold text-pink-700 drop-shadow text-center">Calendario de Adviento</h1>
          <button
            aria-label="Información"
            onClick={() => setShowInfo(true)}
            className={jump ? "animate-bounce" : ""}
            style={{ lineHeight: 0 }}
          >
            <img
              src="/images/info.png"
              alt="Botón de información"
              className="w-8 h-8"
            />
          </button>
        </div>
        {/* Modal de información */}
        {showInfo && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div className="bg-white rounded-xl p-6 shadow-xl max-w-xs flex flex-col items-center gap-4 border-2 border-pink-300">
              <span className="text-lg text-pink-700 text-center">¿Quéeee? ¿Un calendario de adviento en Febrero? Eso no tiene sentido</span>
              <button
                className="mt-2 px-4 py-1 rounded bg-pink-200 text-pink-800 font-bold hover:bg-pink-300 transition"
                onClick={() => setShowInfo(false)}
              >Cerrar</button>
            </div>
          </div>
        )}
      </div>
      {/* Aquí irá el grid de días */}
      <div className="w-full flex justify-center mt-6">
        {/* AdvientoGrid muestra las cajas y la paginación */}
        {/* Usar import normal, asumiendo que AdvientoGrid es client component */}
        <AdvientoGrid />
      </div>
    </div>
  );
}
