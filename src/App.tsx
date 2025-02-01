import { useState, useEffect } from "react";
import ScoreScreen from "./components/ScoreScreenView/index";
import { Question } from "./type";
import questions from "./questions.json"; // import your JSON file
import Questions from "./components/QuestionView/index";
import "./App.css";
import { shuffleArray } from "./utils/suffle";
import FailedScreen from "./components/FailedScreenView";
import ResultScreen from "./components/ResultView";

type level = "easy" | "medium" | "hard";

const App = () => {
  const [isGameStarted, setGameStarted] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<level>(
    (localStorage.getItem("currentLevel") as level) || "easy"
  );
  const [score, setScore] = useState<number>(() => {
    const storedScore = localStorage.getItem("score");
    return storedScore ? parseInt(storedScore, 10) : 0;
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [questionsList, setQuestionsList] = useState<Question[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [showScoreScreen, setShowScoreScreen] = useState(false); // New state to show the score screen
  const [showFailedScreen, setShowFailedScreen] = useState(false);
  const [showFinalResultScreen, setfinalResultScreen] =
    useState<boolean>(false);

  const [submitHandle, setSubmitHandle] = useState<boolean>(false);
  const [correctAnswerCount, setCorrectanswer] = useState<number>(0);
  const [currentLevelScorecount, setcurrentLevelScorecount] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  useEffect(() => {
    if (submitHandle) {
      console.log("going");
      setTimeout(() => {
        if (currentQuestionIndex < questionsList.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          const minCorrectAnswers = 2;
          if (
            currentLevel === "hard" &&
            correctAnswerCount >= minCorrectAnswers
          ) {
            setfinalResultScreen(true);
          }
          // If the correct answers are less than the minimum required, show the failed screen.
          else if (correctAnswerCount >= minCorrectAnswers) {
            setShowScoreScreen(true);
          }
          // Otherwise, show the score screen.
          else {
            setShowFailedScreen(true);
          }
        }
        setCurrentAnswer("");
        setFeedback("");
        setSubmitHandle(false);
      }, 1000);
    }
  }, [
    currentLevel,
    currentQuestionIndex,
    questionsList,
    score,
    submitHandle,
    correctAnswerCount,
  ]);
  console.log(correctAnswerCount);
  useEffect(() => {
    const id = setTimeout(() => {
      if (feedback) {
        setFeedback("");
      }
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [feedback]);

  useEffect(() => {
    // Load questions based on the current level
    const levelQuestions = questions[currentLevel] as Question[];
    const randomQuestion = shuffleArray(levelQuestions);
    setQuestionsList(randomQuestion);
  }, [currentLevel]);

  useEffect(() => {
    const newScore = JSON.stringify(score);
    localStorage.setItem("score", newScore);
    localStorage.setItem("currentLevel", currentLevel);
  }, [score, currentLevel]);

  console.log("result", {
    showFailedScreen,
    showFinalResultScreen,
    showScoreScreen,
    questionsList,
    currentAnswer,
  });

  const handleAnswerSubmit = () => {
    if (!currentAnswer) {
      return;
    }

    const currentQuestion = questionsList[currentQuestionIndex];
    if (
      currentAnswer === currentQuestion.correctAnswer ||
      currentQuestion.correctAnswer.toLocaleLowerCase() ===
        currentAnswer.toLocaleLowerCase()
    ) {
      setFeedback("Correct Answer!");
      const scoreIncrement =
        currentLevel === "easy" ? 10 : currentLevel === "medium" ? 20 : 30;
      setScore(score + scoreIncrement); // Award points based on the level
      setCorrectanswer((prev) => prev + 1);
      if (currentLevel === "easy") {
        setcurrentLevelScorecount((prev) => ({
          ...prev,
          [currentLevel]: prev[currentLevel] + 10, // Dynamically update the current level's score
        }));
      }
      if (currentLevel === "medium") {
        setcurrentLevelScorecount((prev) => ({
          ...prev,
          [currentLevel]: prev[currentLevel] + 20, // Dynamically update the current level's score
        }));
      }
      if (currentLevel === "hard") {
        setcurrentLevelScorecount((prev) => ({
          ...prev,
          [currentLevel]: prev[currentLevel] + 30, // Dynamically update the current level's score
        }));
      }
    } else {
      setFeedback("Wrong Answer");
    }
    setSubmitHandle(true);
  };

  const handleNextLevel = () => {
    setShowScoreScreen(false); // Hide the score screen before moving to the next level
    setCurrentLevel((prevLevel) => {
      if (prevLevel === "easy") return "medium";
      if (prevLevel === "medium") return "hard";
      return prevLevel;
    });
    setCurrentQuestionIndex(0);
    setCorrectanswer(0);
  };

  const handleRestart = () => {
    setScore((score) => score - currentLevelScorecount[currentLevel]);
    window.location.reload();
  };

  const handleAllRestartGame = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleGameStart = () => {
    setGameStarted(true);
  };

  return (
    <div className="gameContainer">
      <header>
        {isGameStarted &&
        !showScoreScreen &&
        !showFinalResultScreen &&
        currentLevel ? (
          <h1>
            Quiz Game - {currentLevel[0].toUpperCase() + currentLevel.slice(1)}{" "}
            Level
          </h1>
        ) : (
          <h1>Quiz Game</h1>
        )}
      </header>
      <main>
        {isGameStarted &&
          !showFailedScreen &&
          !showFinalResultScreen &&
          !showScoreScreen && (
            <>
              <section className="question_section">
                <h2>Score: {score}</h2>
                {!feedback ? (
                  <Questions
                    question={questionsList[currentQuestionIndex]}
                    currentAnswer={currentAnswer}
                    setCurrentAnswer={setCurrentAnswer}
                    handleAnswerSubmit={handleAnswerSubmit}
                  />
                ) : (
                  <p
                    className={
                      feedback === "Wrong Answer"
                        ? "wrong_feedback"
                        : "right_feedback"
                    }
                  >
                    {feedback}
                  </p>
                )}
              </section>
            </>
          )}
        {showScoreScreen && (
          <section className="score_screen_section">
            <ScoreScreen
              onNextLevel={handleNextLevel}
              score={score}
              currentLevel={currentLevel}
            />
          </section>
        )}
        {showFailedScreen && (
          <section className="failed_screen">
            <FailedScreen onRestartLevel={handleRestart} />
          </section>
        )}
        {showFinalResultScreen && (
          <section className="result_section">
            <ResultScreen score={score} onRestart={handleAllRestartGame} />
          </section>
        )}
      </main>
      {!isGameStarted && (
        <button onClick={() => handleGameStart()} className="btn">
          Start Game
        </button>
      )}
    </div>
  );
};

export default App;
