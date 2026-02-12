import React, { useState } from 'react';
import { AdvientoBox, RewardType } from './AdvientoBox';

interface AdvientoDay {
  day: number;
  openDate: Date;
  reward: {
    type: RewardType;
    content: string | string[];
  };
}

interface AdvientoGridProps {
  openedBoxes?: number[];
  openBox?: (day: number) => void;
  loadingProgress?: boolean;
}

const advientoDays: AdvientoDay[] = [
  // Demo data, replace with real rewards and dates
  { day: 1, openDate: new Date('2026-02-01'), reward: { type: 'video', content: '/video/presentacion.mp4' } },
  { day: 2, openDate: new Date('2026-02-02'), reward: { type: 'image', content: ['/images/day_1_01.png', '/images/day_1_02.png'] } },
  { day: 3, openDate: new Date('2026-02-03'), reward: { type: 'text', content: 'En el jardín que caminas\nQuiero ser la huella que impregnas\nLodo aferrado a tu bota,\nEl sonido cuando trotas\n\nEl aire que despeja,\ny purifica\nSol en orbitación,\nque palpita\nCerros en composición,\naun delimita\nUna tierna emoción' } },
  { day: 4, openDate: new Date('2026-02-04'), reward: { type: 'image', content: '/images/cupon_chinos.png' } },
  { day: 5, openDate: new Date('2026-02-05'), reward: { type: 'image', content: ['/images/00.jpeg', '/images/01.jpeg', '/images/02.jpeg', '/images/03.jpeg', '/images/04.jpeg', '/images/05.jpeg', '/images/06.jpeg', '/images/07.jpeg'] } },
  { day: 6, openDate: new Date('2026-02-06'), reward: { type: 'image', content: ['/images/te-encuentro/1.png', '/images/te-encuentro/2.png', '/images/te-encuentro/3.png', '/images/te-encuentro/4.png', '/images/te-encuentro/5.png', '/images/te-encuentro/6.png', '/images/te-encuentro/7.png', '/images/te-encuentro/8.png', '/images/te-encuentro/9.png', '/images/te-encuentro/10.png', '/images/te-encuentro/11.png'] } },
  { day: 7, openDate: new Date('2026-02-07T00:00:00'), reward: { type: 'gif', content: '/images/osito_a_osita.gif' } },
  { day: 8, openDate: new Date('2026-02-08T00:00:00'), reward: { type: 'gif', content: '/images/emoxito.gif' } },
  { day: 9, openDate: new Date('2026-02-09T00:00:00'), reward: { type: 'image', content: '/images/cupon_chinos.png' } },
  { day: 10, openDate: new Date('2026-02-10'), reward: { type: 'text', content: 'Hola amor, wenos días o noches si no esperaste a la mañana jejej\nFaltan todavía muchos días pero siento que el calendario está por terminarse jsjsj, me da nostalgia de alguna forma\nParezco disco rayado con esta pregunta pero ¿Qué te está pareciendo? Siéndote honesto siempre espero que en verdad te esté gustando mucho y estés muy feliz y emocionada por esto. Es algo que desde que se me ocurrió esperé con muchísima ilusión. Me encanta verte feliz, contenta, emocionada, y ser yo quien provoque eso me hace sentir muy alagado y muy muy feliz. Conforme voy llenando cada cajita, siento que se va volviendo más especial. Hay cosas que pienso que te gustarían y las hago, hay cosas que me dices que quieres y que considero meter jsjsj, hay cosas que pienso que me gustaría recibir de ti, como algunas fotos tuyas, una sesión para escuchar un disco que te guste y compartir ese momento, dedicárselo a la música y a nosotros. También eso me gusta de los cupones, más que un recurso fácil o una carta de "después te la cumplo" siento que es algo que nos llevamos para después de este calendario, para usarlo en un momento óptimo o importante (Spoiler: queda un último cupón). Creo que los desvelos, las giras de tuerca de lo que quería que fuera el regalo del día, las programadas de último momento le han dado un toque especial. No es una caja prefabricada, es algo que se va formando día con día, con retroalimentación, escucha y mucho pero mucho cariño. Para mí cada día es un recordatorio de lo mucho que te amo y de los esfuerzos que hago por tenerte cerca, por valorar a través de mis acciones tu compañía ¿Por qué darte una sola cosa cuando puedo darte 14? Jsjsj Me gusto tanto la idea que podría repetirla el siguiente año si nuestra relación sigue fortaleciéndose como lo está haciendo en estos momentos, en estos meses.\n\nLa verdad ya había pensado en una carta, cuando te pregunté que esperabas que estuviera en los próximos días dijiste varias cosas que no había pensado y unas que ya como esta. Quiero aprovechar esta ocasión para decir desde el fondo del corazón y de mis visceras te amo Itzia Arlett, te amo muchísimo Itzia Arlett. Gracias de verdad por tu cariño, comprensión, apoyo, alegría, vacilada, afecto, por tu deseo, por tu risa que tanto me gusta escuchar y sentir como se mueve tu cuerpo al ritmo de tu carcajada pegado a mi cuerpo, es un tesoro que amo visitar tan seguido.\n\nAmo escucharte cuando caes dormida, dormir juntos y comenzar el día juntos, creo que eso es de las cosa que más me gustan de dormir juntos, que uno va yepetando y ya tiene a su amorcita a lado ¿Qué es esto? ¿Navidad? Amo salir y caminar un buen, pasar a ver cosas, ver tu carita feliz por un rico café o un chocolatín sabroso, reirnos en los chinos y enojarnos porque a veces son unos hijos de la chingada jsjsjs. Pasar a tu casa, recogerte o quedarme ahí ajaja se invita solo. Cualquier cita contigo me hace tanta ilusión amor, ver tu sonrisita al estar caminando uno hacia el otro para encontrarnos y yo me pongo muy ayy abrazame mucho y besame mucho que te amo jsjsjs.\n\nEn verdad no solo espero si no que deseo que te esté gustando este regalo de San Valentín. Te atesoro y te valoro muchísimo amor, gracias por tanto, tiamo muchísimo amorcita espero tengas un lindo 10 de febrero <3' } },
  { day: 11, openDate: new Date('2026-02-11'), reward: { type: 'audio', content: ['/audio/presentacion.mp3', '/audio/el-ultimo-recuerdo-walter-esau.mp3', '/audio/es-una-buena-cosa-de-CandelariaZamar-agudo-.mp3', '/audio/es-una-buena-cosa-de-CandelariaZamar-grave-.mp3'] } },
  { day: 12, openDate: new Date('2026-02-12'), reward: { type: 'image', content: ['/images/zing/z01.jpeg', '/images/zing/z02.jpeg', '/images/zing/z03.jpeg', '/images/zing/z05.jpeg', '/images/zing/z06.jpeg', '/images/zing/z07.jpg', '/images/zing/z08.jpg', '/images/zing/z09.jpg', '/images/zing/z10.jpg', '/images/zing/z11.jpg', '/images/zing/z12.jpg', '/images/zing/z13.jpg'] } },
  { day: 13, openDate: new Date('2026-02-13'), reward: { type: 'image', content: '/images/reward13.png' } },
  { day: 14, openDate: new Date('2026-02-14'), reward: { type: 'text', content: '¡Final!' } },
];

const PAGES = [
  { start: 0, end: 7 },   // 1-7
  { start: 7, end: 14 },  // 8-14
];

export const AdvientoGrid: React.FC<AdvientoGridProps> = ({ openedBoxes = [], openBox, loadingProgress }) => {
  const [page, setPage] = useState(0);
  const { start, end } = PAGES[page];
  const daysToShow = advientoDays.slice(start, end);

  // Distribuir en dos columnas de 3 y el último centrado abajo
  const isLastPage = page === PAGES.length - 1;
  let gridRows: AdvientoDay[][] = [];
  if (!isLastPage) {
    for (let i = 0; i < daysToShow.length; i += 2) {
      gridRows.push(daysToShow.slice(i, i + 2));
    }
  } else {
    for (let i = 0; i < daysToShow.length - 1; i += 2) {
      gridRows.push(daysToShow.slice(i, i + 2));
    }
  }
  if (loadingProgress) {
    return <div className="text-pink-700 font-bold text-lg mt-8">Cargando progreso...</div>;
  }
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col gap-6 mb-4">
        {gridRows.map((row, idx) => (
          <div key={idx} className="flex flex-row gap-6 justify-center">
            {row.map((day) => (
              <AdvientoBox
                key={day.day}
                {...day}
                opened={openedBoxes.includes(day.day)}
                onOpen={openBox}
              />
            ))}
          </div>
        ))}
        {isLastPage && (
          <div className="flex justify-center mt-6">
            <AdvientoBox
              key={daysToShow[daysToShow.length - 1].day}
              {...daysToShow[daysToShow.length - 1]}
              opened={openedBoxes.includes(daysToShow[daysToShow.length - 1].day)}
              onOpen={openBox}
            />
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          ←
        </button>
        <span>Página {page + 1} de {PAGES.length}</span>
        <button
          onClick={() => setPage((p) => Math.min(PAGES.length - 1, p + 1))}
          disabled={page === PAGES.length - 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>
  );
};
