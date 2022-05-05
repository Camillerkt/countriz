// React imports
import { useContext, useEffect, useState } from "react";
import axios from "axios";

// Contexts
import { QuizContext } from "../Contexts";

// Assets
import adventure from "../assets/images/undraw_adventure_4hum 1.svg";
import loadingGif from "../assets/images/loading.gif";

const Flag = () => {
  const quiz = useContext(QuizContext);

  const [loading, setLoading] = useState(true);

  const [countryFlag, setCountryFlag] = useState(null);
  const [allAnswers, setAllAnswers] = useState([]);

  const [trueAnswer, setTrueAnswer] = useState(null);
  const [incorrectAnswer, setIncorrectAnswer] = useState(null);

  const [answerHasBeenValidated, setAnswerHasBeenValidated] = useState(false);

  const getRandomCountryFlag = async () => {
    const allCountries = await axios.get("https://restcountries.com/v3.1/all");
    const randomCountry =
      allCountries.data[Math.floor(Math.random() * allCountries.data.length)];
    const flagOfThisCountry = randomCountry.flags.png;

    setCountryFlag(flagOfThisCountry);
    const retrievedCountryName = randomCountry.name.common;
    return retrievedCountryName;
  };

  const getThreeRandomAnswers = async () => {
    const allCountries = await axios.get("https://restcountries.com/v3.1/all");

    const retrievedCountries = async () => {
      const countries = [];

      for (let i = 0; i < 3; i++) {
        const randomCountry =
          allCountries.data[
            Math.floor(Math.random() * allCountries.data.length)
          ];
        countries.push(randomCountry.name.common);
      }

      return countries;
    };

    const countries = await retrievedCountries();
    return countries;
  };

  const getAllAnswers = async (trueCountryName, threeRandomCountries) => {
    const retrieveAllAnswersWithTheTrueOne = async () => {
      return [trueCountryName, ...threeRandomCountries];
    };

    const shuffleAnswers = (array) => {
      const shuffledAnswersArray = array.sort(() => Math.random() - 0.5);
      setAllAnswers(shuffledAnswersArray);
    };

    const answers = await retrieveAllAnswersWithTheTrueOne();
    shuffleAnswers(answers);
    setTrueAnswer(trueCountryName);
  };

  const checkIfAnswerIsCorrect = (answer) => {
    answer !== trueAnswer
      ? setIncorrectAnswer(answer)
      : quiz.setNumberOfGoodAnswers(quiz.numberOfGoodAnswers + 1);
    setAnswerHasBeenValidated(true);
  };

  const nextStep = () => {
    // Check if the user has the correct answer or not
    if (incorrectAnswer !== null) {
      quiz.setQuizStatus("result");
    } else {
      quiz.setQuizStatus("capital");
    }
  };

  const displayChoices = allAnswers.map((answer) => {
    // If the user hasn't clicked on a choice => let him click on any answer to check if it's correct or not
    if (!answerHasBeenValidated) {
      return (
        <li
          onClick={() => checkIfAnswerIsCorrect(answer)}
          className="choice"
          key={answer}
        >
          <span>{answer}</span>
        </li>
      );

      // If the user has already clicked on a choice => display all answers with the correct one and the not correct one and don't let him click again on a new answer
    } else {
      if (answer === trueAnswer) {
        return (
          <li className="choice correctAnswer" key={answer}>
            <span className="customSpan">{answer}</span>
            <span className="material-icons md-18 icon">
              check_circle_outline
            </span>
          </li>
        );
      } else if (answer === incorrectAnswer) {
        return (
          <li className="choice incorrectAnswer" key={answer}>
            <span className="customSpan">{answer}</span>
            <span className="material-icons md-18 icon">
              <span className="material-icons">highlight_off</span>
            </span>
          </li>
        );
      } else {
        return (
          <li className="choice" key={answer}>
            <span>{answer}</span>
          </li>
        );
      }
    }
  });

  useEffect(() => {
    (async () => {
      const trueCountryName = await getRandomCountryFlag();
      const threeRandomCountries = await getThreeRandomAnswers();
      setLoading(false);
      getAllAnswers(trueCountryName, threeRandomCountries);
    })();
  }, []);

  if (!loading) {
    return (
      <div className="Flag">
        <img src={adventure} alt="adventure" id="adventure" />
        <img src={countryFlag} alt="country flag" id="flag" />
        <h3>Which country does this flag belong to ?</h3>
        <ol className="choices">{displayChoices}</ol>
        {answerHasBeenValidated && <button onClick={nextStep}>Next</button>}
      </div>
    );
  } else {
    return (
      <div className="Capital" id="loading">
        <img src={loadingGif} alt="loading" />{" "}
      </div>
    );
  }
};

export default Flag;
