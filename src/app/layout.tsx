import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins } from 'next/font/google';
// import LocalFont from 'next/font/local';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

// const ginger = LocalFont({
//   src: '../../public/fonts/Ginger.ttf',
//   variable: '--font-ginger',
// })

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
        className={`${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {children}
      </body>
    </html>
  );
}
