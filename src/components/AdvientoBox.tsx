import React, { useState } from 'react';

export type RewardType = 'image' | 'text' | 'audio' | 'video';

export interface AdvientoBoxProps {
  day: number;
  openDate: Date;
  reward: {
    type: RewardType;
    content: string;
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

  const handleOpen = () => {
    if (!isOpened && canOpen) {
      setLocalOpened(true);
      setShowModal(true);
      if (onOpen) onOpen(day);
    } else if (isOpened) {
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
          <div className="w-full h-full flex items-center justify-center bg-white rounded shadow p-2 relative">
            {/* Recompensa */}
            {reward.type === 'image' && (
              <img
                src={reward.content}
                alt="Recompensa"
                className="max-w-full max-h-full rounded mb-2 cursor-zoom-in"
                onClick={e => {
                  e.stopPropagation();
                  setShowImageModal(true);
                }}
                title="Ver en grande"
              />
            )}
            {reward.type === 'text' && (
              <span className="text-center text-lg font-semibold">{reward.content}</span>
            )}
            {reward.type === 'audio' && (
              <audio controls src={reward.content} className="w-full" />
            )}
            {reward.type === 'video' && (
              <video controls src={reward.content} className="max-w-full max-h-full rounded" />
            )}
            {/* Imagen opened.png por encima */}
            <img
              src="/images/opened.png"
              alt="Caja abierta"
              className="absolute inset-0 w-full h-full object-cover rounded shadow pointer-events-none"
              style={{ zIndex: 2 }}
            />
            {/* El número ya no se muestra una vez abierta */}
          </div>
        )}
      </div>
      {/* Modal de recompensa */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-xs flex flex-col items-center gap-4 border-2 border-pink-300 relative">
            <span className="text-lg text-pink-700 font-bold mb-2">¡Recompensa del día {padDay(day)}!</span>
            {reward.type === 'image' && (
              <img
                src={reward.content}
                alt="Recompensa"
                className="max-w-full max-h-60 rounded mb-2 cursor-zoom-in"
                onClick={e => {
                  e.stopPropagation();
                  setShowImageModal(true);
                }}
                title="Ver en grande"
              />
            )}
            {reward.type === 'text' && (
              <span className="text-center text-lg font-semibold">{reward.content}</span>
            )}
            {reward.type === 'audio' && (
              <audio controls src={reward.content} className="w-full" />
            )}
            {reward.type === 'video' && (
              <video controls src={reward.content} className="max-w-full max-h-60 rounded" />
            )}
            <div className="flex flex-row mt-4 w-full items-center">
              <div className="flex-1 flex justify-center">
                <button
                  className="px-4 py-1 rounded bg-pink-200 text-pink-800 font-bold hover:bg-pink-300 transition"
                  onClick={() => setShowModal(false)}
                >Cerrar</button>
              </div>
            </div>
      {/* Modal para ver imagen en grande y descargar */}
      {showImageModal && reward.type === 'image' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowImageModal(false)}>
          <div className="bg-white rounded-xl p-4 shadow-xl flex flex-col items-center gap-4 border-2 border-pink-300 relative max-w-lg" onClick={e => e.stopPropagation()}>
            <img src={reward.content} alt="Recompensa grande" className="max-w-full max-h-[70vh] rounded" />
            <div className="flex w-full justify-between items-center mt-2">
              <button
                className="px-4 py-1 rounded bg-pink-200 text-pink-800 font-bold hover:bg-pink-300 transition"
                onClick={() => setShowImageModal(false)}
              >Cerrar</button>
              <a
                href={reward.content}
                download
                className="text-pink-700 hover:text-pink-900 ml-2"
                title="Descargar imagen"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4m-9 9h14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      )}
    </>
  );
};
