import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
