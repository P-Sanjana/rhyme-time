'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface WordProps {
  word: string;
  index: number;
  isRare: boolean;
}

const Word: FC<WordProps> = ({ word, index, isRare }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: 'easeOut',
      }}
      className={clsx(
        'px-3 py-4 rounded-md  text-center font-semibold shadow-sm tracking-wider',
        isRare
          ? 'text-[#407c51] bg-[#407c51]/10 dark:bg-[#407c51]/20'
          : 'text-[#ef9967] bg-[#ef9967]/10 dark:bg-[#ef9967]/20'
      )}
    >
      {word}
    </motion.div>
  );
};
export default Word;
