'use client';

import { useEffect, useState } from 'react';
import {
  _10POINTS,
  _15POINTS,
  GAME_STARTS_IN,
  RARE_RHYME_EARNS,
  RHYME_EARNS,
} from '@/lib/constants';
import GooeyCountdownText from '@/components/countdown/Countdown';
import Header from '@/components/header/Header';

const GamePage = () => {
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className='relative bg-white dark:bg-black h-screen overflow-hidden'>
      <Header />
      {count > 0 ? (
        <>
          <h2 className='text-5xl text-center font-bold mb-4'>
            {GAME_STARTS_IN}
          </h2>
          <GooeyCountdownText />
          <div className='mt-2'>
            <h2 className='text-center font-semibold mb-2 tracking-wider'>
              {RHYME_EARNS}{' '}
              <span className='text-[#ef9967] font-bold'>{_10POINTS}</span>
            </h2>
            <h2 className='text-center font-semibold tracking-wider'>
              {RARE_RHYME_EARNS}{' '}
              <span className='text-[#407c51] font-bold'>{_15POINTS}</span>
            </h2>
          </div>
        </>
      ) : (
        'Go!'
      )}
    </div>
  );
};
export default GamePage;
