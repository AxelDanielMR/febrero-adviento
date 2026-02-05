"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function Home() {
  const [gifState, setGifState] = useState<'static' | 'animating' | 'hidden'>('static');
  const [showModal, setShowModal] = useState(false);
  const [gifKey, setGifKey] = useState(0);
  const router = useRouter();

  const handleGifClick = () => {
    setGifKey(prev => prev + 1); // fuerza reinicio del gif
    setGifState('animating');
    setTimeout(() => {
      setGifState('hidden');
      setShowModal(true);
    }, 2700); // Duración de la animación en ms (ajustada a 2.5s)
  };


  const [bearState, setBearState] = useState<'normal' | 'clicked'>('normal');

  const handleBearClick = () => {
    setBearState('clicked');
    setTimeout(() => {
      router.push("/calendario");
    }, 1000);
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
      {gifState === 'static' && (
        <img
          src="/images/open_mail_static.png"
          alt="Carta cerrada"
          className="w-40 h-40 object-contain cursor-pointer"
          onClick={handleGifClick}
        />
      )}
      {gifState === 'animating' && (
        <img
          key={gifKey}
          src={`/images/open_mail.gif?key=${gifKey}`}
          alt="Animación abriendo carta"
          className="w-40 h-40 object-contain"
        />
      )}
      {showModal && (
        <Card className="w-full max-w-xs shadow-xl rounded-xl border-2 border-pink-300 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-pink-600 text-3xl font-bold drop-shadow">
              ¡Bienvenida amorcita!
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <span className="text-lg text-pink-700">Feliz mes del amor</span>
            <span className="text-base text-zinc-700">Para continuar pícale al amorcito</span>
            {bearState === 'normal' ? (
              <img
                src="/images/osito_01.png"
                alt="Osito amorcito"
                className="w-16 h-16 object-contain mt-2 cursor-pointer hover:scale-110 transition"
                onClick={handleBearClick}
              />
            ) : (
              <img
                src="/images/osito_02.png"
                alt="Osito amorcito clickeado"
                className="w-16 h-16 object-contain mt-2"
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
