'use client';
import { useState } from "react";
import Header from "./components/header/Header";
import UnicornSceneComponent from "./components/unicorn-scene-home/UnicornSceneHome";
import GameSetupModal from "./components/game-setup-modal/GameSetupModal";

const Home = () => {
  const [difficulty, setDifficulty] = useState('Easy');
  return (
    <div className="bg-gray-800">
      <Header />
      {/* <UnicornSceneComponent /> */}
      <GameSetupModal />
    </div>
  );
}
 export default Home