'use client';

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  _10POINTS,
  _15POINTS,
  ALREADY_USED_MESSAGE,
  BACKEND_SLEEPY_MESSAGE,
  FALLING_TEXT,
  GAME_DESCRIPTION,
  GAME_DESCRIPTION2,
  GAME_STARTS_IN,
  NOT_A_RHYME_MESSAGE,
  RAIN,
  RARE_RHYME_EARNS,
  RHYME_EARNS,
  SAME,
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
import GameSetupModal from '@/components/game-setup-modal/GameSetupModal';
import ScoreModal from '@/components/score-modal/ScoreModal';

const GamePageClient = () => {
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
  const [isBackendSleepy, setIsBackendSleepy] = useState<boolean>(false);
  const [disableInput, setDisableInput] = useState<boolean>(false);
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
            setIsBackendSleepy(false);
            setDisableInput(false);
          } else {
            setIsBackendSleepy(true);
          }
        } else {
          setCount(count - 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count, randomWord, setDisableInput, setIsBackendSleepy]);
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
    setDisableInput(true);
    setShowResults(true);
  }, [setShowResults, setDisableInput]);
  const rareRhymes = useMemo(() => {
    return Object.entries(usedRhymes)
      .filter(([_, isRare]) => isRare)
      .map(([w]) => w)
      .slice(0, 5);
  }, [usedRhymes]);

  return (
    <div className='relative max-h-svh bg-white dark:bg-black h-screen'>
      <Header />
      {count > 0 ? (
        <>
          <p className='text-base sm:text-lg md:text-xl text-center font-semibold mb-4 px-4 tracking-wider'>
            {GAME_DESCRIPTION} {timelimit} {GAME_DESCRIPTION2}
          </p>
          <h2 className='text-3xl sm:text-4xl md:text-5xl text-center font-bold z-50'>
            {GAME_STARTS_IN}
          </h2>
          <Countdown />
          {isBackendSleepy && (
            <div className='min-h-7 sm:min-h-8'>
              <p className='text-sm sm:text-base text-center font-semibold mb-6 tracking-wider'>
                {BACKEND_SLEEPY_MESSAGE}
              </p>
            </div>
          )}
          <div className='space-y-1 sm:space-y-2'>
            <h2 className='text-sm sm:text-base text-center font-semibold mb-2 tracking-wider'>
              {RHYME_EARNS}{' '}
              <span className='text-[#ef9967] font-bold'>{_10POINTS}</span>
            </h2>
            <h2 className='text-sm sm:text-base text-center font-semibold tracking-wider'>
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
                  disabled={disableInput}
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
        <ScoreModal
          totalScore={totalScore}
          rareRhymes={rareRhymes}
          openModal={openModal}
        />
      )}
      {isOpen && <GameSetupModal onXClick={closeModal} />}
    </div>
  );
};

const GamePage = () => {
  return (
    <Suspense>
      <GamePageClient />
    </Suspense>
  );
};
export default GamePage;
