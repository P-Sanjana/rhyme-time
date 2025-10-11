'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === 'dark' && (
        <Button
          variant='outline'
          size='icon'
          onClick={() => setTheme('light')}
          aria-label='Light mode'
          className='shadow-yellow-500'
        >
          <Sun className='h-[1.2rem] w-[1.2rem]' />
        </Button>
      )}
      {theme === 'light' && (
        <Button
          variant='outline'
          size='icon'
          onClick={() => setTheme('dark')}
          aria-label='Dark mode'
          className='shadow-blue-900'
        >
          <Moon className=' h-[1.2rem] w-[1.2rem]' />
        </Button>
      )}
    </>
  );
}
