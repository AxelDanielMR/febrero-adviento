'use client';

import { AdvientoBox } from '@/components/AdvientoBox';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Componente de corazones pixelados animados
const PixelatedHearts = () => {
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 15,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 3
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-lg">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-200"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
          }}
          animate={{
            y: [-50, 400],
            rotate: [0, 360],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
        >
          💜
        </motion.div>
      ))}
    </div>
  );
};

// Componente especializado para múltiples audios
const MultiAudioBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const audios = [
    { id: 1, src: '/audio/presentacion.mp3', title: 'Presentación' },
    { id: 2, src: '/audio/el-ultimo-recuerdo-walter-esau.mp3', title: 'El último recuerdo' },
    { id: 3, src: '/audio/es-una-buena-cosa-de-CandelariaZamar-agudo-.mp3', title: 'Es una buena cosa (Agudo)' },
    { id: 4, src: '/audio/es-una-buena-cosa-de-CandelariaZamar-grave-.mp3', title: 'Es una buena cosa (Grave)' }
  ];

  const handleOpen = () => {
    setIsOpen(true);
    setShowModal(true);
  };

  const canOpen = new Date() >= new Date('2026-02-01');

  return (
    <>
      <motion.div
        className={`
          relative bg-gradient-to-br from-pink-600 to-purple-700 
          rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 
          hover:scale-105 hover:shadow-xl border-2 border-white/20
          ${canOpen ? 'hover:from-pink-500 hover:to-purple-600' : 'opacity-60 cursor-not-allowed'}
        `}
        onClick={canOpen ? handleOpen : undefined}
        whileHover={canOpen ? { scale: 1.05 } : {}}
        whileTap={canOpen ? { scale: 0.95 } : {}}
        style={{ width: '200px', height: '200px' }}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent"></div>
        
        <div className="flex flex-col items-center justify-center h-full p-4 text-white relative z-10">
          <motion.div
            animate={isOpen ? { rotateY: 180 } : { rotateY: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-4xl font-bold mb-2">11</span>
            <div className="flex flex-col items-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-1 opacity-80">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z" />
              </svg>
              <span className="text-sm font-semibold opacity-80">4 Audios</span>
              <span className="text-xs opacity-60">{canOpen ? 'Click para escuchar' : 'No disponible aún'}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto relative"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <PixelatedHearts />
            <div className="text-center mb-6 relative z-10">
              <h2 className="text-2xl font-bold text-purple-700 mb-2">Audios</h2>
              <p className="text-gray-600 text-sm">Día 11 de febrero</p>
            </div>
            
            <div className="space-y-4 relative z-10">
              {audios.map((audio, index) => (
                <div key={audio.id} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">{audio.title}</h3>
                  <audio controls src={audio.src} className="w-full" />
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors relative z-10"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default function TestDay11Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col items-center justify-center p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-4">
          Audios
        </h1>
      </div>
      
      <div className="flex justify-center">
        <MultiAudioBox />
      </div>
      
      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>Esta cajita se puede abrir desde el 1 de febrero</p>
        <p>Fecha actual: {new Date().toLocaleDateString()}</p>
        <p>Total de audios en la caja: 4</p>
      </div>
    </div>
  );
}