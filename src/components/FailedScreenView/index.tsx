import React from "react";

interface FailedScreenProps {
  onRestartLevel: () => void;
}

const FailedScreen: React.FC<FailedScreenProps> = ({ onRestartLevel }) => {
  return (
    <div className="failed_container">
      <h1>Level Failed</h1>
      <p>Unfortunately, you answered fewer than 2 questions correctly.</p>
      <button onClick={onRestartLevel}>Restart Level</button>
    </div>
  );
};

export default FailedScreen;
