'use client';

import { useEffect, useState } from 'react';
import { _10POINTS, _15POINTS, GAME_STARTS_IN, RARE_RHYME_EARNS, RHYME_EARNS } from '@/app/constants';

const GamePage = () =>{
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className="relative h-[90vh] bg-black flex flex-col items-center justify-center text-white overflow-hidden">
      {count > 0 ? 
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_70%)] animate-flicker"></div>
        <h2 className="text-4xl font-semibold mb-4">{GAME_STARTS_IN}</h2>
        <h1 className="text-6xl font-bold z-10">{count}</h1>
      </> : 'Go!'}
      <div className="mt-8">
        <h2 className="text-secondary text-center font-normal mb-2">
          {RHYME_EARNS} <span className="text-[#799ae7] font-semibold">{_10POINTS}</span>
        </h2>
        <h2 className="text-secondary text-center font-normal">
          {RARE_RHYME_EARNS} <span className="text-[#8feca3] font-semibold">{_15POINTS}</span>
        </h2>
      </div>
    </div>
  );
}
export default GamePage;
