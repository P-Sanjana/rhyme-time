'use client';

import dynamic from 'next/dynamic';
import LightRays from '@/components/shadcn/LightRays';
import Header from '@/components/header/Header';
import IntroText from '@/components/intro-text/IntroText';
import CharacterCursor from '@/components/shadcn/CharacterCursor';
import { useCallback, useState } from 'react';
import GameSetupModal from '@/components/game-setup-modal/GameSetupModal';
const CubeScene = dynamic(
  () => import('../components/3d-cube-scene/Cube-Scene'),
  { ssr: false }
);
const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <div className='relative bg-white dark:bg-black h-screen overflow-hidden'>
      <CharacterCursor />
      <div className='absolute inset-0 z-0'>
        <LightRays
          raysOrigin='top-center'
          raysColor='#ef9967'
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className='custom-rays'
        />
      </div>
      <div className='relative z-20'>
        <Header />
      </div>
      <div className='absolute inset-0 z-10'>
        <CubeScene />
      </div>
      <div className='relative z-20 top-[45%]'>
        <IntroText onClick={openModal} />
      </div>
      {isOpen && <GameSetupModal onXClick={closeModal} />}
    </div>
  );
};
export default Home;
