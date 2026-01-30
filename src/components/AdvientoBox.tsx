import React, { useState } from 'react';

export type RewardType = 'image' | 'text' | 'audio' | 'video';

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

export const AdvientoBox: React.FC<AdvientoBoxProps> = ({ day, openDate, reward, today, opened, onOpen }) => {
  const [localOpened, setLocalOpened] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const now = today || new Date();
  const isOpened = opened || localOpened;
  const canOpen = now >= openDate;
  const content = Array.isArray(reward.content) ? reward.content[0] : reward.content;

  const handleOpen = () => {
    if (!isOpened && canOpen) {
      setLocalOpened(true);
      setShowModal(true);
      if (onOpen) onOpen(day);
    } else if (isOpened) {
      setShowModal(true);
    } else if (canOpen) {
      // Si está abierta pero no en local, igual permite abrir
      setShowModal(true);
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
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {reward.type === 'image' && (
                <img
                  src={Array.isArray(reward.content) ? reward.content[0] : reward.content}
                  alt="Recompensa"
                  className="max-w-full max-h-full rounded mb-2"
                  draggable={false}
                />
              )}
              {reward.type === 'text' && (
                <span className="text-center text-lg font-semibold text-white">{content}</span>
              )}
              {reward.type === 'audio' && (
                <audio controls src={content} className="w-full" />
              )}
              {reward.type === 'video' && (
                <video controls src={content} className="max-w-full max-h-full rounded" />
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
                <span className="font-bold text-lg text-pink-700 mb-2">Nuevo Sticker</span>
                <div className="relative w-full flex justify-center">
                  <img
                    src={Array.isArray(reward.content) ? reward.content[0] : reward.content}
                    alt="Recompensa grande"
                    className="max-w-full max-h-[90vh] rounded mb-2"
                    draggable={false}
                  />
                  {Array.isArray(reward.content) ? (
                    <button
                      className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow hover:bg-pink-100 transition flex items-center justify-center"
                      style={{ zIndex: 10 }}
                      title="Descargar ambas imágenes"
                      onClick={async () => {
                        for (const img of reward.content) {
                          const link = document.createElement('a');
                          link.href = img;
                          const filename = img.split('/').pop() ?? 'download';
                          link.download = filename;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-pink-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4m-9 9h14" />
                      </svg>
                    </button>
                  ) : (
                    <a
                      href={reward.content}
                      download
                      className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow hover:bg-pink-100 transition flex items-center justify-center"
                      title="Descargar imagen"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ zIndex: 10 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-pink-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4m-9 9h14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
            {reward.type === 'text' && (
              <span className="text-center text-lg font-semibold">{content}</span>
            )}
            {reward.type === 'audio' && (
              <audio controls src={content} className="w-full" />
            )}
            {reward.type === 'video' && showModal && (
              <video controls src={content} className="max-w-full max-h-60 rounded" autoPlay={false} />
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
