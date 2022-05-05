// React imports
import { useState } from "react";

// Contexts
import { QuizContext } from "./Contexts";

// Components
import Capital from "./components/Capital";
import Flag from "./components/Flag";
import Result from "./components/Result";

const App = () => {
  const [quizStatus, setQuizStatus] = useState("capital");
  const [numberOfGoodAnswers, setNumberOfGoodAnswers] = useState(0);

  return (
    <QuizContext.Provider
      value={{
        setQuizStatus,
        numberOfGoodAnswers,
        setNumberOfGoodAnswers,
      }}
    >
      <div className="App">
        <h1>Country Quiz</h1>
        {quizStatus === "capital" && <Capital />}
        {quizStatus === "flag" && <Flag />}
        {quizStatus === "result" && <Result />}
        <footer>
          <p>
            A{" "}
            <a
              href="https://devchallenges.io/challenges/Bu3G2irnaXmfwQ8sZkw8"
              target="_blank"
              rel="noreferrer"
            >
              DevChallenge
            </a>{" "}
            made at &#127968; by{" "}
            <a href="https://camillerakoto.fr" target="_blank" rel="noreferrer">
              Camille Rakotoarisoa
            </a>
          </p>
        </footer>
      </div>
    </QuizContext.Provider>
  );
};

export default App;
