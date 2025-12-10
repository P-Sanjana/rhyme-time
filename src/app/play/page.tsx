'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  _10POINTS,
  _15POINTS,
  ALREADY_USED_MESSAGE,
  FALLING_TEXT,
  GAME_DESCRIPTION,
  GAME_DESCRIPTION2,
  GAME_OVER,
  GAME_STARTS_IN,
  NOT_A_RHYME_MESSAGE,
  PLAY_AGAIN,
  RAIN,
  RARE_RHYME_EARNS,
  RHYME_EARNS,
  SAME,
  TOP_RHYMES_HEADING,
  TOTAL_SCORE,
} from '@/lib/constants';
import Countdown from '@/components/countdown/Countdown';
import Header from '@/components/header/Header';
import { getRandomWord } from '@/lib/services';
import { useSearchParams } from 'next/navigation';
import FallingText from '@/components/shadcn/FallingText';
import DecryptedText from '@/components/shadcn/DecryptedText';
import Input from '@/components/input/Input';
import { getRhymes } from '@/lib/serverActions';
import Word from '@/components/word/Word';
import FlyingWord from '@/components/flying-word/FlyingWord';
import Timer from '@/components/timer/Timer';
import ConfettiFireworks from '@/components/confetti-fireworks/ConfettiFireworks';
import { getRandomMessage } from '@/lib/utils';
import GameSetupModal from '@/components/game-setup-modal/GameSetupModal';

const GamePage = () => {
  const params = useSearchParams();
  const [count, setCount] = useState<number>(3);
  const [randomWord, setRandomWord] = useState<string>('');
  const [rhymes, setRhymes] = useState<Record<string, number>>({});
  const [usedRhymes, setUsedRhymes] = useState<Record<string, boolean>>({});
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [score, setScore] = useState<number | null>(null);
  const difficulty = params.get('difficulty');
  const timelimit = Number(params.get('timelimit'));
  const highlightWords = useMemo(() => [RAIN, SAME] as never[], []);
  const inputRef = useRef<HTMLDivElement>(null);
  const [flyWord, setFlyWord] = useState<{
    word: string;
    start: DOMRect | null;
  }>({ word: '', start: null });
  const [totalScore, setTotalScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = useCallback(() => {
    setIsOpen(true);
    setShowResults(false);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const loadRandomWord = async () => {
      const word = await getRandomWord(difficulty ?? 'easy');
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
  useEffect(() => {
    const loadRhymes = async () => {
      const rhymes = await getRhymes(randomWord);
      setRhymes(rhymes);
    };
    if (randomWord !== '') {
      loadRhymes();
    }
  }, [randomWord]);
  const checkRhyme = useCallback(() => {
    if (value == '') return;
    const user_value = value.toLowerCase();
    if (user_value in rhymes && !(user_value in usedRhymes)) {
      const pts = rhymes[value] > 3 ? 10 : 15;
      setScore(pts);
      setTotalScore((prev) => prev + pts);
      const rect = inputRef.current?.getBoundingClientRect() ?? null;
      setFlyWord({
        word: value,
        start: rect,
      });
      setError('');
      setValue('');
      setUsedRhymes({ ...usedRhymes, [user_value]: rhymes[value] <= 3 });
    } else if (user_value in usedRhymes) {
      setScore(null);
      setError(ALREADY_USED_MESSAGE);
      setValue('');
    } else {
      setScore(null);
      setError(NOT_A_RHYME_MESSAGE);
      setValue('');
    }
  }, [rhymes, usedRhymes, value]);
  const timerFinish = useCallback(() => {
    setShowResults(true);
  }, [setShowResults]);
  const rareRhymes = useMemo(() => {
    return Object.entries(usedRhymes)
      .filter(([_, isRare]) => isRare)
      .map(([w]) => w)
      .slice(0, 5);
  }, [usedRhymes]);

  return (
    <div className='relative bg-white dark:bg-black h-screen'>
      <Header />
      {count > 0 ? (
        <>
          <p className='tetx-xl text-center font-semibold mb-4 tracking-wider'>
            {GAME_DESCRIPTION} {timelimit} {GAME_DESCRIPTION2}
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
        <div className='relative h-[90%] w-full overflow-hidden'>
          <div className='absolute inset-0 pointer-events-none z-0'>
            <FallingText
              text={FALLING_TEXT}
              highlightWords={highlightWords}
              backgroundColor='transparent'
              wireframes={false}
              gravity={0.56}
            ></FallingText>
          </div>
          <div className='flex flex-col h-full w-full px-6 py-8 absolute top-1/6'>
            <div className='w-full max-w-4xl mx-auto mb-6'>
              <div className='relative flex items-center justify-center w-full'>
                <div className='absolute left-1/2 transform -translate-x-1/2'>
                  <DecryptedText
                    text={randomWord.toUpperCase()}
                    animateOn='view'
                    revealDirection='start'
                    sequential
                    speed={200}
                    maxIterations={20}
                    encryptedClassName='font-bold text-4xl tracking-wider text-[#ef9967]'
                    className='font-bold text-4xl tracking-wider text-[#407c51]'
                  />
                </div>
                <div className='absolute right-0'>
                  <Timer start={timelimit} onFinish={timerFinish} />
                </div>
              </div>
              <div ref={inputRef} className='w-full mt-20 flex justify-center'>
                <Input
                  value={value}
                  setValue={setValue}
                  error={error}
                  onEnter={checkRhyme}
                  score={score}
                  setScore={setScore}
                />
              </div>
            </div>
            {flyWord.start && (
              <FlyingWord
                word={flyWord.word}
                start={flyWord.start}
                clearFly={() => setFlyWord({ word: '', start: null })}
                isRare={usedRhymes[flyWord.word]}
              />
            )}
            <div
              className='flex-1 w-full px-4 overflow-y-auto no-scrollbar'
              style={{
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y',
              }}
            >
              <div
                id='rhyme-list'
                className='max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12 pb-10'
              >
                {Object.entries(usedRhymes).map(([word, isRare], i) => (
                  <Word key={word} word={word} isRare={isRare} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {showResults && (
        <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40'>
          <div className='bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-center'>
            {totalScore >= 30 && <ConfettiFireworks />}
            <h2 className='text-3xl font-bold mb-3 tracking-wider'>
              {GAME_OVER}
            </h2>
            <p className='text-xl font-semibold mb-4 tracking-wider text-[#407c51]'>
              {TOTAL_SCORE}: {totalScore}
            </p>
            <p className='text-md mb-6 text-gray-700 dark:text-gray-300 font-semibold tracking-wider'>
              {getRandomMessage(totalScore)}
            </p>
            {rareRhymes.length > 0 && (
              <>
                <h3 className='font-bold text-lg mb-2'>{TOP_RHYMES_HEADING}</h3>
                <div className='flex flex-wrap justify-center gap-2 mb-6'>
                  {rareRhymes.map((word, i) => (
                    <span
                      key={`${word}-${i}`}
                      className='px-3 py-1 bg-[#407c51]/20 text-[#407c51] rounded-lg font-semibold'
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </>
            )}
            <button
              onClick={openModal}
              className='
          w-full py-3 rounded-xl bg-[#ef9967] text-white font-bold 
          hover:bg-[#d98253] transition
        '
            >
              {PLAY_AGAIN}
            </button>
          </div>
        </div>
      )}
      {isOpen && <GameSetupModal onXClick={closeModal} />}
    </div>
  );
};
export default GamePage;
