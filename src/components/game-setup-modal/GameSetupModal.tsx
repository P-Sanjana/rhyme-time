import { useState, useRef, FC, useCallback } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { X } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/shadcn/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';
import {
  DIFFICULTY_LEVELS,
  TIMELIMITS,
  GAMESETUP,
  DIFFICULTY,
  CHOOSE_TIMER,
  PLAY,
} from '@/lib/constants';
import RippleButton from '../shadcn/ripplebutton';
import SlideButton from '../shadcn/slidebutton';
import Link from 'next/link';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};
interface ModalProps {
  onXClick: () => void;
}
const GameSetupModal: FC<ModalProps> = ({ onXClick }) => {
  const [difficulty, setDifficulty] = useState<string>(DIFFICULTY_LEVELS[0]);
  const [timeLimit, setTimeLimit] = useState<string>(TIMELIMITS[1]);
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue<number>(0);
  const y = useMotionValue<number>(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });
  const [lastY, setLastY] = useState<number>(0);

  const handleMouse = useCallback(
    (e: { clientX: number; clientY: number }) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      const rotationX = (offsetY / (rect.height / 2)) * -14;
      const rotationY = (offsetX / (rect.width / 2)) * 14;
      rotateX.set(rotationX);
      rotateY.set(rotationY);
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
      const velocityY = offsetY - lastY;
      rotateFigcaption.set(-velocityY * 0.6);
      setLastY(offsetY);
    },
    [lastY, rotateFigcaption, rotateX, rotateY, x, y]
  );

  const handleMouseEnter = useCallback(() => {
    scale.set(1.1);
    opacity.set(1);
  }, [opacity, scale]);

  const handleMouseLeave = useCallback(() => {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }, [opacity, rotateFigcaption, rotateX, rotateY, scale]);
  return (
    <div>
      <AnimatePresence>
        <div className='flex z-50 fixed inset-0 cursor-pointer items-center justify-center overflow-y-scroll p-8 backdrop-blur'>
          <motion.div
            initial={{ scale: 0, rotate: '180deg' }}
            animate={{
              scale: 1,
              rotate: '0deg',
              transition: {
                type: 'spring',
                bounce: 0.25,
              },
            }}
            exit={{ scale: 0, rotate: '180deg' }}
            onClick={(e) => e.stopPropagation()}
            className='relative cursor-default overflow-hidden rounded-xl p-6 max-w-sm'
          >
            <figure
              ref={ref}
              className='relative w-[100%] h-[100%] flex flex-col items-center justify-center perspective-[800px]'
              style={{
                height: '350px',
                width: '100%',
              }}
              onMouseMove={handleMouse}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                className='relative transform-3d will-change-transform transform translate-z-[0]'
                style={{
                  width: '350px',
                  height: '350px',
                  rotateX,
                  rotateY,
                  scale,
                }}
              >
                <Card className='relative shadow-xl'>
                  <button className='absolute top-3 right-3'>
                    <X size={20} onClick={onXClick} />
                  </button>
                  <CardHeader>
                    <CardTitle className='w-full text-center text-xl font-bold'>
                      {GAMESETUP}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    <p className='text-sm font-bold mb-2'>{DIFFICULTY}</p>
                    <div className='flex gap-2 justify-evenly'>
                      {DIFFICULTY_LEVELS.map((level) => (
                        <RippleButton
                          key={`difficulty-${level}`}
                          onClick={() => setDifficulty(level)}
                          isActive={difficulty === level}
                        >
                          <p>{level}</p>
                        </RippleButton>
                      ))}
                    </div>
                    <div>
                      <p className='text-sm font-bold mb-2'>{CHOOSE_TIMER}</p>
                      <Select
                        value={timeLimit}
                        onValueChange={(val) => setTimeLimit(val)}
                      >
                        <SelectTrigger className='w-[50%]'>
                          <SelectValue placeholder='Select timer' />
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
                  <CardFooter className='w-full flex justify-center'>
                    <Link href={'/play'}>
                      <SlideButton text={PLAY} />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </figure>
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};
export default GameSetupModal;
