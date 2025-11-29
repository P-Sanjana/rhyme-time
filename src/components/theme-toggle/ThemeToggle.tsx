'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/shadcn/button';

const ThemeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  return (
    <>
      {(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) && (
        <Button
          variant='default'
          size='icon'
          onClick={() => setTheme('light')}
          aria-label='Light mode'
          className='shadow-blue-900 border-1 border-white'
        >
          <Moon className='h-[1.2rem] w-[1.2rem]' />
        </Button>
      )}
      {(theme === 'light' ||
        (theme === 'system' && systemTheme === 'light')) && (
        <Button
          variant='outline'
          size='icon'
          onClick={() => setTheme('dark')}
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
