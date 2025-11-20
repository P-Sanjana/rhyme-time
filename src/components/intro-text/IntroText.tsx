'use client';

import { PLAY, SLOGAN, SUBHEADING1, SUBHEADING2 } from '@/lib/constants';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function IntroText() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.classList.remove('opacity-0');
        containerRef.current.classList.add('opacity-100');
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={containerRef}
      className='opacity-0 transition-opacity duration-1000 text-center'
    >
      <h1 className='text-4xl font-bold tracking-wide'>
        <Link href={'/play'}>
          <span className='text-[#407c51] hover:text-[#ef9967] cursor-pointer'>
            {PLAY}
          </span>
        </Link>{' '}
        {SLOGAN}
      </h1>
      <p className='text-xl mt-4 mb-2 font-bold tracking-wide'>{SUBHEADING1}</p>
      <p className='text-xl font-bold tracking-wide'>{SUBHEADING2}</p>
    </div>
  );
}
