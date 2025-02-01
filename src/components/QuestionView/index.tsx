import React from "react";
import { Question } from "../../type";

interface QuestionProps {
  question: Question;
  currentAnswer: string;
  setCurrentAnswer: (answer: string) => void;
  handleAnswerSubmit: () => void;
}

const Questions: React.FC<QuestionProps> = ({
  question,
  currentAnswer,
  setCurrentAnswer,
  handleAnswerSubmit,
}) => {
  return (
    <div className="question_container">
      <h3>{question?.question}</h3>
      <div className="multiple_choice_container">
        {question?.type === "multiple-choice" &&
          question.options?.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={currentAnswer === option}
                onChange={() => setCurrentAnswer(option)}
              />
              {option}
            </label>
          ))}
      </div>

      {question?.type === "true-false" && (
        <>
          <label>
            <input
              type="radio"
              name="answer"
              value="true"
              checked={currentAnswer === "true"}
              onChange={() => setCurrentAnswer("true")}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name="answer"
              value="false"
              checked={currentAnswer === "false"}
              onChange={() => setCurrentAnswer("false")}
            />
            False
          </label>
        </>
      )}
      {question?.type === "text-input" && (
        <input
          type="text"
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
        />
      )}
      <button onClick={handleAnswerSubmit} className="submit_btn">
        Submit
      </button>
    </div>
  );
};

export default Questions;
