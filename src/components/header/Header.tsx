'use client';
import React from 'react';
import Image from '../image/Image';
import { Button } from '@/components/shadcn/button';
import { DAILYCHALLENGE, SIGNUPSIGNIN } from '@/lib/constants';
import ThemeToggle from '../theme-toggle/ThemeToggle';

const Header = () => {
  return (
    <div className='flex justify-between items-center mx-2 h-[10vh]'>
      <Image
        onClick={() => {
          console.log('logo clicked');
        }}
        src={'/logo.gif'}
        width={80}
        height={80}
        alt='Logo'
      />
      <div className='flex justify-between items-center gap-4'>
        {/* <Button
          onClick={() => {
            console.log('clicked');
          }}
          className='font-bold tracking-wider border-0 bg-transparent  hover:bg-transparent hover:cursor-pointer m-0 p-0'
        >
          {DAILYCHALLENGE}
        </Button>
        <Button
          variant='ghost'
          className='bg-transparent font-bold tracking-wider border-[0.5px] border-black dark:border-white'
        >
          {SIGNUPSIGNIN}
        </Button> */}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
