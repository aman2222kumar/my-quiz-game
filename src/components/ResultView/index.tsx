import { FC } from "react";

interface propTyes {
  score: number;
  onRestart: () => void;
}
const ResultScreen: FC<propTyes> = ({ score, onRestart }) => {
  return (
    <div className="result_container">
      <h1>Congratulations! You won the game.</h1>
      <h2>Your Score: {score}</h2>
      <button onClick={() => onRestart()}>Restart Game</button>
    </div>
  );
};

export default ResultScreen;
