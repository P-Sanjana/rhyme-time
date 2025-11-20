import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import LocalFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/lib/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const saudagar = LocalFont({
  src: '../../public/fonts/Saudagar.ttf',
  variable: '--font-saudagar',
})

export const metadata: Metadata = {
  title: 'Rhyme Time',
  description: 'A rhyme game',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={` ${saudagar.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
