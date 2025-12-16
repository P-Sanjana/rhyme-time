'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const colors = [
  '#ef9967',
  '#407c51',
  '#409959',
  '#1c6b32',
  '#064d1a',
  '#81eb9f',
  '#16de4f',
  '#bf6836',
  '#783914',
  '#ed6211',
  '#f0a173',
  '#542408',
];
const ConfettiFireworks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const hasFired = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true;
          triggerFireworks();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const triggerFireworks = () => {
    const animationEnd = Date.now() + 5000;
    const defaults = {
      startVelocity: 15,
      spread: 300,
      ticks: 60,
      zIndex: 9999,
    };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / 5000);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors,
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors,
      });
    }, 250);
  };

  return <div ref={ref} className='relative w-full h-full'></div>;
};
export default ConfettiFireworks;
