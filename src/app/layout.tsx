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
});

export const metadata: Metadata = {
  title: 'RhymeTime - Fast & Challenging Word Rhyme Game',
  description:
    'A fast, clever rhyme game that challenges your vocabulary and creativity. Think fast, rhyme smart, and beat your score.',
  openGraph: {
    title: 'RhymeTime - Fast & Challenging Word Rhyme Game',
    description:
      'A fast, clever rhyme game that challenges your vocabulary and creativity. Think fast, rhyme smart, and beat your score.',
    url: 'https://rhyme-time-two.vercel.app/',
    siteName: 'RhymeTime - Fast & Challenging Word Rhyme Game',
    images: [
      {
        url: 'https://rhyme-time-two.vercel.app/og.png',
        width: 1200,
        height: 630,
        alt: 'RhymeTime App Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RhymeTime - Fast & Challenging Word Rhyme Game',
    description:
      'A fast, clever rhyme game that challenges your vocabulary and creativity. Think fast, rhyme smart, and beat your score.',
    images: ['https://rhyme-time-two.vercel.app/og.png'],
  },
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
