'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';

interface FlyingWordProps {
  word: string;
  start: DOMRect;
  clearFly: () => void;
  isRare: boolean;
}

const FlyingWord: FC<FlyingWordProps> = ({ word, start, clearFly, isRare }) => {
  const [target, setTarget] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const list = document.getElementById('rhyme-list');
    if (!list) return;

    const listRect = list.getBoundingClientRect();

    setTarget({
      x: listRect.left - start.left + 20,
      y: listRect.top - start.top + 20,
    });

    setTimeout(() => clearFly(), 600);
  }, [start, clearFly]);

  return (
    <motion.div
      initial={{
        position: 'fixed',
        left: start.left,
        top: start.top,
        opacity: 1,
        scale: 1,
        zIndex: 9999,
      }}
      animate={{
        left: start.left + target.x,
        top: start.top + target.y,
        opacity: 0,
        scale: 0.6,
      }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      className={clsx(
        'absolute font-bold text-xl',
        isRare ? 'text-[#407c51]' : 'text-[#ef9967]'
      )}
    >
      {word}
    </motion.div>
  );
};
export default FlyingWord;
