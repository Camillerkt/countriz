// React imports
import { useContext } from "react";

// Contexts
import { QuizContext } from "../Contexts";

// Assets
import success from "../assets/images/undraw_winners_ao2o 2.svg";

const Result = () => {
  const quiz = useContext(QuizContext);

  const handleClick = () => {
    quiz.setNumberOfGoodAnswers(0);
    quiz.setQuizStatus("capital");
  };

  return (
    <div className="Result">
      <img src={success} alt="success" />
      <h3>Results</h3>
      <p>
        You got <span>{quiz.numberOfGoodAnswers}</span> correct answers
      </p>
      <button onClick={handleClick}>Try again</button>
    </div>
  );
};

export default Result;
