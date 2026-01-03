'use client';

import { PRESS_ENTER_MESSAGE } from '@/lib/constants';
import clsx from 'clsx';
import { FC, useEffect, useRef, useState } from 'react';

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  error: string;
  onEnter: () => void;
  score: number | null;
  setScore: (score: number | null) => void;
  disabled: boolean;
}
const Input: FC<InputProps> = ({
  value,
  setValue,
  error,
  onEnter,
  score,
  setScore,
  disabled,
}) => {
  const [showScore, setShowScore] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (score) {
      setShowScore(true);
      const timer = setTimeout(() => {
        setShowScore(false);
        setScore(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [score, setScore]);
  useEffect(() => {
    if (error && containerRef.current) {
      const el = containerRef.current;
      el.classList.remove('animate-shake');
      void el.offsetHeight;
      el.classList.add('animate-shake');
    }
  }, [error]);
  return (
    <div className='w-full max-w-sm mx-auto pt-8 animate-fadeIn relative'>
      <style>
        {`
          @keyframes floatUpRightNoCollision {
            0%   { opacity: 1; transform: translateY(0) translateX(0); }
            100% { opacity: 0; transform: translateY(-45px) translateX(12px); }
          }
          .animate-floatUpRightNoCollision {
            animation: floatUpRightNoCollision 1s ease-out forwards;
          }
        `}
      </style>
      <div ref={containerRef} className='relative group'>
        <input
          id='animated-input'
          value={value}
          onChange={disabled ? undefined : (e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (disabled) {
              e.preventDefault();
              return;
            }
            if (e.key === 'Enter') {
              e.preventDefault();
              onEnter();
            }
          }}
          className={`
            w-full px-4 py-3 border-[#407c51] border rounded-xl
           outline-none transition-all duration-300 text-xl font-bold tracking-wider
            focus:shadow-[0_0_12px_rgba(64,124,81,0.9)]
            peer z-100 relative
           ${error ? 'border-red-500' : ''}
          `}
          disabled={disabled}
        />
        {showScore && score && (
          <div
            className={clsx(
              'absolute right-4 top-0 -translate-y-full font-bold text-xl pointer-events-none select-none animate-floatUpRightNoCollision',
              score === 15 ? 'text-[#407c51]' : 'text-[#ef9967]'
            )}
          >
            +{score}
          </div>
        )}
      </div>
      <p className='text-sm font-semibold text-center text-[#407c51] mt-3 tracking-wider'>
        {PRESS_ENTER_MESSAGE}
      </p>
      {error && (
        <p className='text-red-400 text-center text-sm font-semibold tracking-wider mt-2 animate-fadeIn'>
          {error}
        </p>
      )}
    </div>
  );
};
export default Input;
