import React, { useState } from 'react';
import { motion } from 'framer-motion';

export type RewardType = 'image' | 'text' | 'audio' | 'video' | 'gif';

export interface AdvientoBoxProps {
  day: number;
  openDate: Date;
  reward: {
    type: RewardType;
    content: string | string[];
  };
  today?: Date; // For testing, defaults to new Date()
  opened?: boolean;
  onOpen?: (day: number) => void;
}

const padDay = (day: number) => day.toString().padStart(2, '0');

// Componente de corazones pixelados animados para el día 11
const PixelatedHearts: React.FC = () => {
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

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  React.useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60); // Ajusta la velocidad aquí (60ms entre caracteres)
    
    return () => clearInterval(timer);
  }, [text]);
  
  return (
    <motion.p 
      className="text-left text-base whitespace-pre-line leading-relaxed text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-pink-600"
      >
        |
      </motion.span>
    </motion.p>
  );
};

export const AdvientoBox: React.FC<AdvientoBoxProps> = ({ day, openDate, reward, today, opened, onOpen }) => {
  const [localOpened, setLocalOpened] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const now = today || new Date();
  const isOpened = opened || localOpened;
  // Comparar solo las fechas sin horas para mejor control
  const currentDateStr = now.toISOString().split('T')[0];
  const openDateStr = openDate.toISOString().split('T')[0];
  const canOpen = currentDateStr >= openDateStr;
  // Para audio, necesitamos manejar múltiples archivos
  const content = Array.isArray(reward.content) ? reward.content[0] : reward.content;
  const imageArray = Array.isArray(reward.content) ? reward.content : [reward.content];
  const audioArray = Array.isArray(reward.content) && reward.type === 'audio' ? reward.content : [reward.content];
  const hasMultipleImages = Array.isArray(reward.content) && reward.content.length > 1 && reward.type === 'image';
  const hasMultipleAudios = Array.isArray(reward.content) && reward.content.length > 1 && reward.type === 'audio';

  // Debugging: log reward props to help diagnose stale/incorrect rewards
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug(`AdvientoBox: day=${day} reward.type=${reward.type} reward.content=`, reward.content);
  }

  const handleOpen = () => {
    if (!canOpen) {
      return; // No hacer nada si no puede abrir
    }
    
    if (!isOpened) {
      setLocalOpened(true);
      setShowModal(true);
      setCurrentImageIndex(0);
      if (onOpen) onOpen(day);
    } else {
      setShowModal(true);
      setCurrentImageIndex(0);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : imageArray.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < imageArray.length - 1 ? prev + 1 : 0));
  };

  const handleDownloadAll = async () => {
    for (const img of imageArray) {
      const link = document.createElement('a');
      link.href = img;
      const filename = img.split('/').pop() ?? 'download';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  return (
    <>
      <div
        className="adviento-box relative flex flex-col items-center justify-center cursor-pointer select-none"
        onClick={handleOpen}
        style={{ width: 180, height: 180 }}
      >
        {!isOpened ? (
          <>
            <img
              src="/images/closed.png"
              alt="Caja cerrada"
              className="w-full h-full object-cover rounded shadow"
              style={{ filter: canOpen ? 'none' : 'grayscale(80%)', opacity: canOpen ? 1 : 0.7 }}
            />
            <span className="absolute text-3xl font-bold text-white drop-shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {padDay(day)}
            </span>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center relative group" style={{ cursor: 'pointer' }} onClick={handleOpen}>
            {/* Fondo marrón */}
            <div className="absolute inset-0 w-full h-full rounded" style={{ background: '#231406', zIndex: 0 }} />
            {/* Recompensa */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
              {reward.type === 'image' && (
                <img
                  src={Array.isArray(reward.content) ? reward.content[0] : reward.content}
                  alt="Recompensa"
                  className="max-w-full max-h-full rounded mb-2"
                  draggable={false}
                />
              )}
              {reward.type === 'text' && (
                <div className="text-center text-white flex flex-col items-center justify-center p-2 w-full h-full overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-2 opacity-80">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <span className="text-sm font-semibold opacity-80">Click para leer</span>
                </div>
              )}
              {reward.type === 'audio' && (
                <div className="flex flex-col items-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-2 opacity-80">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z" />
                  </svg>
                  <span className="text-sm font-semibold opacity-80">
                    {hasMultipleAudios ? `${audioArray.length} Audios` : 'Click para escuchar'}
                  </span>
                  {hasMultipleAudios && (
                    <span className="text-xs opacity-60 mt-1">Click para escuchar</span>
                  )}
                </div>
              )}
              {reward.type === 'video' && (
                <video controls src={content} className="max-w-full max-h-full rounded" />
              )}
              {reward.type === 'gif' && (
                <img
                  src={content}
                  alt="GIF recompensa"
                  className="max-w-full max-h-full rounded mb-2"
                  draggable={false}
                />
              )}
            </div>
            {/* Imagen opened.png por encima, ahora permite clic para abrir modal */}
            <img
              src="/images/opened.png"
              alt="Caja abierta"
              className="absolute inset-0 w-full h-full object-cover rounded shadow"
              style={{ zIndex: 20, pointerEvents: 'none' }}
            />
            {/* El número ya no se muestra una vez abierta */}
          </div>
        )}
      </div>
      {/* Modal de recompensa */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-lg flex flex-col items-center gap-4 border-2 border-pink-300 relative" onClick={e => e.stopPropagation()}>
            {reward.type === 'image' && (
              <div className="relative w-full flex flex-col items-center">
                <span className="font-bold text-lg text-pink-700 mb-2">{day === 5 ? 'Retratooooo' : day === 6 ? 'Te Encuentro' : day === 9 ? 'Nuevo cupón' : 'Nuevo Sticker'}</span>
                <img
                  src={imageArray[currentImageIndex]}
                  alt="Recompensa grande"
                  className="max-w-full max-h-[70vh] rounded"
                  draggable={false}
                />
                {hasMultipleImages && (
                  <div className="text-sm text-gray-600 mt-2">
                    {currentImageIndex + 1} / {imageArray.length}
                  </div>
                )}
                {hasMultipleImages ? (
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={handlePrevImage}
                      className="bg-pink-200 rounded-full p-2 shadow hover:bg-pink-300 transition flex-shrink-0"
                      title="Imagen anterior"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-pink-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition flex items-center gap-2"
                      title="Descargar todas las imágenes"
                      onClick={handleDownloadAll}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4m-9 9h14" />
                      </svg>
                      <span className="font-semibold">Descargar todas ({imageArray.length})</span>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="bg-pink-200 rounded-full p-2 shadow hover:bg-pink-300 transition flex-shrink-0"
                      title="Imagen siguiente"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-pink-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <a
                    href={reward.content as string}
                    download
                    className="mt-3 px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition flex items-center gap-2"
                    title="Descargar imagen"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4m-9 9h14" />
                    </svg>
                    <span className="font-semibold">Descargar</span>
                  </a>
                )}
              </div>
            )}
            {reward.type === 'text' && (
              <div className="w-full max-w-md">
                <span className="font-bold text-lg text-pink-700 mb-4 block text-center">
                  {day === 10 ? 'Carta <3' : 'Mensaje especial'}
                </span>
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-lg border-2 border-amber-200 max-h-[70vh] overflow-y-auto shadow-inner relative" style={{ backgroundImage: 'linear-gradient(45deg, #fefbf3 25%, transparent 25%), linear-gradient(-45deg, #fefbf3 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fefbf3 75%), linear-gradient(-45deg, transparent 75%, #fefbf3 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }}>
                  {day === 10 ? (
                    <TypewriterText text={content} />
                  ) : (
                    <p className="text-center text-base whitespace-pre-line leading-relaxed text-gray-800">
                      {content}
                    </p>
                  )}
                </div>
              </div>
            )}
            {reward.type === 'audio' && (
              <div className="w-full max-w-md flex flex-col items-center relative">
                {day === 11 && <PixelatedHearts />}
                <div className="relative z-10 w-full">
                  <h2 className="font-bold text-xl text-pink-700 mb-4 text-center">
                    {day === 11 ? 'Audios' : 'Audio'}
                  </h2>
                  <div className="space-y-4">
                    {hasMultipleAudios ? (
                      audioArray.map((audioSrc, index) => {
                        const audioTitles = [
                          'Presentación',
                          'El último recuerdo', 
                          'Es una buena cosa (Agudo)',
                          'Es una buena cosa (Grave)'
                        ];
                        return (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                              {day === 11 && audioTitles[index] ? audioTitles[index] : `Audio ${index + 1}`}
                            </h3>
                            <audio controls src={audioSrc} className="w-full" />
                          </div>
                        );
                      })
                    ) : (
                      <audio controls src={content} className="w-full" />
                    )}
                  </div>
                </div>
              </div>
            )}
            {reward.type === 'video' && showModal && (
              <video controls src={content} className="max-w-full max-h-60 rounded" autoPlay={false} />
            )}
            {reward.type === 'gif' && (
              <div className="w-full max-w-md flex flex-col items-center">
                {day === 8 ? (
                  <h2 className="font-bold text-xl text-pink-700 mb-2 text-center leading-tight">F3LIIIIZz DïAaaAA &gt;:3!!!!
                  <br />XoOOXXxoOOXXx</h2>
                ) : day === 7 ? (
                  <>
                    <h2 className="font-bold text-xl text-pink-700 mb-2 text-center">LLEGAMOS A LA MITAD</h2>
                    <p className="text-center text-gray-600 mb-4 text-sm">es tu turno de compartirme que te está pareciendo y un ranking hasta ahora</p>
                  </>
                ) : (
                  <h2 className="font-bold text-xl text-pink-700 mb-2 text-center">GIF Especial</h2>
                )}
                <img
                  src={content}
                  alt="GIF especial"
                  className="max-w-full max-h-[50vh] rounded mb-4"
                  draggable={false}
                  style={{ imageRendering: 'auto' }}
                  loading="lazy"
                  onError={(e) => {
                    console.error('Error cargando GIF:', content);
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {day === 7 ? (
                  <button
                    onClick={async () => {
                      // Descargar todos los gifs del día 7
                      const gifs = ['/images/osito_a_osita.gif', '/images/osita_a_osito.gif', '/images/sticker-gif-01.gif', '/images/sticker-gif-02.gif'];
                      for (const gif of gifs) {
                        const link = document.createElement('a');
                        link.href = gif;
                        const filename = gif.split('/').pop() ?? 'download.gif';
                        link.download = filename;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        await new Promise(resolve => setTimeout(resolve, 100));
                      }
                    }}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition flex items-center gap-2"
                    title="Descargar GIFs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4m-9 9h14" />
                    </svg>
                    <span className="font-semibold">Descargar GIFs (4)</span>
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      const link = document.createElement('a');
                      link.href = content;
                      const filename = content.split('/').pop() ?? 'download.gif';
                      link.download = filename;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition flex items-center gap-2"
                    title="Descargar GIF"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4m-9 9h14" />
                    </svg>
                    <span className="font-semibold">Descargar GIF</span>
                  </button>
                )}
              </div>
            )}
            <div className="w-full flex flex-col items-center mt-4 gap-2">
              <button
                className="px-4 py-1 rounded bg-pink-200 text-pink-800 font-bold hover:bg-pink-300 transition mx-auto block"
                style={{ minWidth: 100 }}
                onClick={() => setShowModal(false)}
              >Cerrar</button>
            </div>
            </div>
        </div>
      )}
    </>
  );
};
