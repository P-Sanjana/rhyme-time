'use client';
import React from 'react';
import Image from '../image/Image';
import { Button } from '@/ui/button';
import Logo from '../../../../public/logo.png';
import { DAILYCHALLENGE, SIGNUPSIGNIN } from '@/app/constants';

const Header = () => {
  return (
    <div className='flex justify-between items-center mx-2 h-[10vh]'>
      <Image
        onClick={() => {
          console.log('logo clicked');
        }}
        src={Logo}
        width={80}
        height={80}
        alt='Logo'
      />
      <div className='flex justify-between items-center gap-4'>
        <Button
          onClick={() => {
            console.log('clicked');
          }}
          className='font-medium border-0 bg-transparent  hover:bg-transparent hover:cursor-pointer m-0 p-0'
        >
          {DAILYCHALLENGE}
        </Button>
        <Button className='bg-transparent border-[0.5px] border-white'>{SIGNUPSIGNIN}</Button>
      </div>
    </div>
  );
};

export default Header;
