'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/shadcn/button';

const ThemeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  return (
    <>
      {(theme === 'light' ||
        (theme === 'system' && systemTheme === 'light')) && (
        <Button
          variant='default'
          size='icon'
          onClick={() => setTheme('dark')}
          aria-label='Light mode'
          className='shadow-blue-500 border-1 border-blue-800 bg-transparent hover:bg-transparent'
        >
          <Moon className='h-[1.2rem] w-[1.2rem] text-blue-950' />
        </Button>
      )}
      {(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) && (
        <Button
          variant='outline'
          size='icon'
          onClick={() => setTheme('light')}
          aria-label='Dark mode'
          className='shadow-yellow-500 bg-white border-1 border-black'
        >
          <Sun className='h-[1.2rem] w-[1.2rem] text-yellow-700' />
        </Button>
      )}
    </>
  );
};
export default ThemeToggle;
