'use client';

import { useEffect, useState } from 'react';
import {
  _10POINTS,
  _15POINTS,
  GAME_STARTS_IN,
  RARE_RHYME_EARNS,
  RHYME_EARNS,
} from '@/lib/constants';
import Countdown from '@/components/countdown/Countdown';
import Header from '@/components/header/Header';
import { getRandomWord } from '@/lib/services';
import { useSearchParams } from 'next/navigation';
import FallingText from '@/components/shadcn/FallingText';
import DecryptedText from '@/components/shadcn/DecryptedText';

const GamePage = () => {
  const params = useSearchParams();
  const [count, setCount] = useState<number>(3);
  const [randomWord, setRandomWord] = useState<string>('');
  const difficulty = params.get('difficulty')?.toLowerCase();
  const timelimit = params.get('timelimit');

  useEffect(() => {
    const loadRandomWord = async () => {
      const word = await getRandomWord(difficulty ?? 'Easy');
      setRandomWord(word);
    };
    loadRandomWord();
  }, [difficulty]);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        if (count == 1) {
          if (randomWord !== '') {
            setCount(count - 1);
          }
        } else {
          setCount(count - 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count, randomWord]);

  return (
    <div className='relative bg-white dark:bg-black h-screen'>
      <Header />
      {count > 0 ? (
        <>
          <p className='tetx-xl text-center font-semibold mb-4'>
            Rhyme as many as you can and as fast as you can within {timelimit}{' '}
            seconds
          </p>
          <h2 className='text-5xl text-center font-bold mb-4 z-50'>
            {GAME_STARTS_IN}
          </h2>
          <Countdown />
          <div>
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
        <div className='flex h-[90%] items-center flex-col z-50'>
          <div className='h-[100%] w-[100%]'>
            <FallingText
              text={'Let the rhymes rain, words that sound the same!'}
              trigger='auto'
              className='px-12'
              highlightWords={['rain', 'same!'] as unknown as never[]}
              backgroundColor='transparent'
              wireframes={false}
              gravity={0.56}
              mouseConstraintStiffness={0.9}
            >
              <DecryptedText
                text={randomWord}
                animateOn='view'
                revealDirection='start'
                sequential
                speed={200}
                maxIterations={20}
                encryptedClassName='font-bold text-3xl tracking-wider text-[#ef9967]'
                className='mt-50 font-bold text-3xl tracking-wider text-[#407c51]'
              />
            </FallingText>
          </div>
        </div>
      )}
    </div>
  );
};
export default GamePage;
