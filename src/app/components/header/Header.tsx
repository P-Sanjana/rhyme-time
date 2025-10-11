'use client';
import React from 'react';
import Image from '../image/Image';
import { ModeToggle } from '../mode-toggle/ModeToggle';
import { Button } from '@/ui/button';
import { useTheme } from 'next-themes';
import Logo from '../../../../public/logo.png';
import DarkLogo from '../../../../public/dark-logo.png';
import { DAILYCHALLENGE, SIGNUPSIGNIN } from '@/app/constants';

const Header = () => {
  const { theme } = useTheme();
  return (
    <div className='flex justify-between items-center mx-1'>
      <Image
        onClick={() => {
          console.log('logo clicked');
        }}
        src={theme === 'dark' ? DarkLogo : Logo}
        width={80}
        height={80}
        alt='Logo'
      />
      <div className='flex justify-between items-center gap-4'>
        <Button
          onClick={() => {
            console.log('clicked');
          }}
          className='font-medium border-0 bg-transparent text-black dark:text-white hover:bg-transparent hover:cursor-pointer m-0 p-0'
        >
          {DAILYCHALLENGE}
        </Button>
        <ModeToggle />
        <Button>{SIGNUPSIGNIN}</Button>
      </div>
    </div>
  );
};

export default Header;
