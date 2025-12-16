import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  HIGH_SCORE_MESSAGES,
  LOW_SCORE_MESSAGES,
  MODERATE_SCORE_MESSAGES,
} from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (time: number) => {
  const m = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const s = (time % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export function getRandomMessage(score: number) {
  if (score <= 10) return LOW_SCORE_MESSAGES[Math.floor(Math.random() * 10)];
  else if (score < 100)
    return MODERATE_SCORE_MESSAGES[Math.floor(Math.random() * 10)];
  else return HIGH_SCORE_MESSAGES[Math.floor(Math.random() * 10)];
}
