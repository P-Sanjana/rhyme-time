import {
  GAME_OVER,
  TOTAL_SCORE,
  TOP_RHYMES_HEADING,
  PLAY_AGAIN,
} from '@/lib/constants';
import { getRandomMessage } from '@/lib/utils';
import ConfettiFireworks from '../confetti-fireworks/ConfettiFireworks';
import { FC } from 'react';

interface ScoreModalProps {
  totalScore: number;
  rareRhymes: string[];
  openModal: () => void;
}
const ScoreModal: FC<ScoreModalProps> = ({
  totalScore,
  rareRhymes,
  openModal,
}) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40'>
      <div className='bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-center'>
        {totalScore >= 30 && <ConfettiFireworks />}
        <h2 className='text-3xl font-bold mb-3 tracking-wider'>{GAME_OVER}</h2>
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
  );
};
export default ScoreModal;
