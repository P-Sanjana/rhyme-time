'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
  } from '@/ui/card';
  import { Button } from '@/ui/button';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/ui/select';
import Chip from '../chip/Chip';
import { CHOOSE_TIMER, DIFFICULTY, DIFFICULTY_LEVELS, GAMESETUP, PLAY, TIMELIMITS } from '@/app/constants';

const GameSetupModal = () => {
    const [difficulty, setDifficulty] = useState(DIFFICULTY_LEVELS[0]);
    const [timeLimit, setTimeLimit] = useState(TIMELIMITS[1]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="relative w-80 bg-gray-900 text-white border-gray-700 shadow-xl">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            {GAMESETUP}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-2">{DIFFICULTY}</p>
            <Chip difficultyLevels={DIFFICULTY_LEVELS} difficulty={difficulty} setDifficulty={setDifficulty} />
          </div>

          <div>
            <p className="text-sm font-medium mb-2">{CHOOSE_TIMER}</p>
            <Select value={timeLimit} onValueChange={(val) => setTimeLimit(val)}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-[50%]">
                <SelectValue placeholder="Select timer" />
              </SelectTrigger>
              <SelectContent>
                {TIMELIMITS.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
                
        <CardFooter>
          <Button
            className="w-full font-semibold bg-playbutton hover:bg-playbutton-hover hover:opacity-90 hover:scale-[1.02]"
          >
            {PLAY}
          </Button>
        </CardFooter>
      </Card>
    </div>
    )

}
export default GameSetupModal;