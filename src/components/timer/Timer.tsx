'use client';

import { formatTime } from '@/lib/utils';
import { FC, useEffect, useState } from 'react';

interface TimerProps {
  start: number;
  onFinish: () => void;
}

const Timer: FC<TimerProps> = ({ start, onFinish }) => {
  const [time, setTime] = useState<number>(start);
  const [active, setActive] = useState<boolean>(false); // Timer starts only after 2s

  useEffect(() => {
    const delay = setTimeout(() => {
      setActive(true);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (time == 0) {
      onFinish?.();
      return;
    }
    if (!active || time === 0) return;

    const interval = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [active, onFinish, time]);

  return (
    <div className='flex items-center justify-center mt-4 sm:mt-8 animate-slide-in transition-all duration-700'>
      <div
        className={`
          text-base sm:text-lg md:text-2xl font-bold tracking-widest px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-2xl shadow-md
          ${
            time <= 5
              ? 'bg-red-500 shadow-red-400 animate-heartbeat animate-shake animate-pulse'
              : 'bg-[#407c51]/50'
          }
        `}
      >
        <span key={formatTime(time)} className='inline-block animate-flip'>
          {formatTime(time)}
        </span>
      </div>
    </div>
  );
};

export default Timer;
