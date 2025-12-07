'use client';

import { formatTime } from '@/lib/utils';
import { FC, useEffect, useState } from 'react';

interface TimerProps {
  start: number;
}

const Timer: FC<TimerProps> = ({ start }) => {
  const [time, setTime] = useState<number>(start);

  useEffect(() => {
    if (time === 0) return;

    const interval = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className='flex items-center justify-center mt-8 animate-slide-in transition-all duration-700'>
      <div
        className={`
          text-2xl font-bold tracking-widest px-6 py-3 rounded-2xl shadow-md
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
