'use client';

import dynamic from 'next/dynamic';
import LightRays from '@/components/shadcn/LightRays';
import Header from '@/components/header/Header';
import SplashCursor from '@/components/shadcn/SplashCursor';

const Home = () => {
  const CubeScene = dynamic(
    () => import('../components/3d-cube-scene/Cube-Scene'),
    { ssr: false }
  );
  return (
    <div className='relative bg-black h-screen overflow-hidden'>
      <SplashCursor />
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
    </div>
  );
};
export default Home;
