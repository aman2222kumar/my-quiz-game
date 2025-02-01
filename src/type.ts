export interface Question {
  type: "multiple-choice" | "true-false" | "text-input";
  question: string;
  options?: string[];
  correctAnswer: string;
}

export interface Quiz {
  Easy: Question[];
  Medium: Question[];
  Hard: Question[];
}
