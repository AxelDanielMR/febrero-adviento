import React, { useState } from 'react';
import { AdvientoBox, RewardType } from './AdvientoBox';

interface AdvientoDay {
  day: number;
  openDate: Date;
  reward: {
    type: RewardType;
    content: string;
  };
}

const advientoDays: AdvientoDay[] = [
  // Demo data, replace with real rewards and dates
  { day: 1, openDate: new Date('2026-01-24'), reward: { type: 'text', content: '¡Feliz día 1!' } },
  { day: 2, openDate: new Date('2026-01-25'), reward: { type: 'image', content: '/images/reward2.png' } },
  { day: 3, openDate: new Date('2026-01-26'), reward: { type: 'audio', content: '/audio/reward3.mp3' } },
  { day: 4, openDate: new Date('2026-01-27'), reward: { type: 'video', content: '/video/reward4.mp4' } },
  { day: 5, openDate: new Date('2026-01-28'), reward: { type: 'text', content: '¡Sigue así!' } },
  { day: 6, openDate: new Date('2026-01-29'), reward: { type: 'image', content: '/images/reward6.png' } },
  { day: 7, openDate: new Date('2026-01-30'), reward: { type: 'text', content: '¡Ya casi!' } },
  { day: 8, openDate: new Date('2026-01-31'), reward: { type: 'text', content: '¡Día 8!' } },
  { day: 9, openDate: new Date('2026-02-01'), reward: { type: 'image', content: '/images/reward9.png' } },
  { day: 10, openDate: new Date('2026-02-02'), reward: { type: 'audio', content: '/audio/reward10.mp3' } },
  { day: 11, openDate: new Date('2026-02-03'), reward: { type: 'video', content: '/video/reward11.mp4' } },
  { day: 12, openDate: new Date('2026-02-04'), reward: { type: 'text', content: '¡Casi terminas!' } },
  { day: 13, openDate: new Date('2026-02-05'), reward: { type: 'image', content: '/images/reward13.png' } },
  { day: 14, openDate: new Date('2026-02-06'), reward: { type: 'text', content: '¡Final!' } },
];

const PAGES = [
  { start: 0, end: 7 },   // 1-7
  { start: 7, end: 14 },  // 8-14
];

export const AdvientoGrid: React.FC = () => {
  const [page, setPage] = useState(0);
  const { start, end } = PAGES[page];
  const daysToShow = advientoDays.slice(start, end);

  // Distribuir en dos columnas de 3 y el último centrado abajo
  const isLastPage = page === PAGES.length - 1;
  let gridRows: AdvientoDay[][] = [];
  if (!isLastPage) {
    // 6 elementos: 3 filas de 2
    for (let i = 0; i < daysToShow.length; i += 2) {
      gridRows.push(daysToShow.slice(i, i + 2));
    }
  } else {
    // Última página: 6 arriba (3 filas de 2), último centrado
    for (let i = 0; i < daysToShow.length - 1; i += 2) {
      gridRows.push(daysToShow.slice(i, i + 2));
    }
  }
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col gap-6 mb-4">
        {gridRows.map((row, idx) => (
          <div key={idx} className="flex flex-row gap-6 justify-center">
            {row.map((day) => (
              <AdvientoBox key={day.day} {...day} />
            ))}
          </div>
        ))}
        {isLastPage && (
          <div className="flex justify-center mt-6">
            <AdvientoBox key={daysToShow[daysToShow.length - 1].day} {...daysToShow[daysToShow.length - 1]} />
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
