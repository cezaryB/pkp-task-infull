import React from "react";
import "./index.scss";
import Button from "@material-ui/core/Button";

// Delete after passing in props
import { data } from "../../data/data";

const Quiz = props => {
  const [results, setShowResults] = React.useState(false);
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [points, setPoints] = React.useState(0);
  const { question, answers, correctAnswer } = data.points[0].quiz[
    questionNumber
  ];
  const questionsLength = data.points[0].quiz.length;

  const handleClick = (answer, correctAnswer) => () => {
    if (results) {
      return;
    }

    if (answer === correctAnswer) {
      setPoints(state => state + 1);
    }

    return setShowResults(true);
  };

  const handleSendResults = () => {
    console.log("zdobyte punkty: ", points);
    // Tutaj funkcja z propsow do przekazania punktow komponentowi wyzej
  };

  const handleNextQuestion = () => {
    setShowResults(false);
    setQuestionNumber(state => state + 1);
  };

  const checkAnswers = (answer, correctAnswer) =>
    answer === correctAnswer ? "green" : "red";

  return (
    <div className="quiz_container">
      <div className="quiz_title">
        Pytanie {questionNumber + 1}/{questionsLength}
      </div>
      <div className="quiz_question">{question}</div>
      <div className="quiz_answers">
        {answers.map(answer => (
          <div className="quiz_answer">
            <Button
              variant="contained"
              color={"primary"}
              style={{
                backgroundColor: results
                  ? checkAnswers(answer.value, correctAnswer)
                  : ""
              }}
              onClick={handleClick(answer.value, correctAnswer)}
              key={answer.id}
            >
              {answer.label}
            </Button>
          </div>
        ))}
      </div>
      <div className="quiz_buttons-container">
        {questionNumber !== questionsLength - 1 ? (
          <Button
            variant="contained"
            disabled={!results}
            onClick={handleNextQuestion}
          >
            NASTĘPNE PYTANIE
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSendResults}
            disabled={!results}
          >
            ZAKOŃCZ
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
