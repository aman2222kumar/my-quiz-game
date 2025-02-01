import React from "react";

interface ScoreScreenProps {
  score: number;
  currentLevel: "easy" | "medium" | "hard";
  onNextLevel: () => void;
}

const ScoreScreen: React.FC<ScoreScreenProps> = ({
  score,
  currentLevel,
  onNextLevel,
}) => {
  const handleNextLevel = () => {
    onNextLevel(); // Move to the next level
  };

  return (
    <div className="score_container">
      <h1>Level Completed!</h1>
      <h2>Your Score: {score}</h2>
      <div className="level_container">
        {currentLevel === "easy" && (
          <button onClick={handleNextLevel}>Go to Medium Level</button>
        )}
        {currentLevel === "medium" && (
          <button onClick={handleNextLevel}>Go to Hard Level</button>
        )}
      </div>
    </div>
  );
};

export default ScoreScreen;
