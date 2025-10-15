interface ChipProps {
    difficultyLevels: string[];
    difficulty: string;
    setDifficulty: (difficulty: string) => void;
}
const Chip: React.FC<ChipProps> = ({ difficultyLevels, difficulty, setDifficulty}) => {
    return <div className="flex justify-between">
    {difficultyLevels.map((level) => (
      <button
        key={level}
        onClick={() => setDifficulty(level)}
        className={`px-3 py-2 rounded-4xl text-xs border ${
          difficulty === level
            ? 'bg-white border-white text-black'
            : 'border-gray-500 hover:bg-gray-700'
        }`}
      >
        {level}
      </button>
    ))}
  </div>
};

export default Chip;