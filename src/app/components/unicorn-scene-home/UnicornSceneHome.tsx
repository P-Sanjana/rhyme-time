// 'use client';

// import { useState } from 'react';
import { SLOGAN, SUBHEADING1, SUBHEADING2 } from '@/app/constants';
import UnicornScene from 'unicornstudio-react/next';

const UnicornSceneHome =  () => {

// TODO: fix the client-side issue
// const [sceneLoaded, setSceneLoaded] = useState(false);

  return (
    <div style={{ height: '90vh' }}>
      <UnicornScene
        projectId={process.env.UNICORN_STUDIO_PROJECT_ID}
        placeholderClassName='bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse'
        placeholder={<div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-200">Loading 3D Scene...</p>
          </div>
        </div>}
        // onLoad={() => setSceneLoaded(true)}
      />
      <div className=' absolute w-full top-3/5 sm:top-4/6 flex flex-col space-y-3 text-white  items-center justify-center'>
        <div>
          <p className='text-2xl font-semibold'>{SLOGAN}</p>
        </div>
        <div>
          <p className='text-sm text-center'>{SUBHEADING1}
            <span className='block'>{SUBHEADING2}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default UnicornSceneHome;