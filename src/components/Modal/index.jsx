import React, { useCallback, useState, useMemo } from "react";
import { data } from "../../data/data";
import Button from "@material-ui/core/Button";
import "./index.scss";

import Quiz from "../Quiz";

const Modal = ({
  markerSelected,
  closeModal,
  children,
  addQuizPoints,
  resolvedQuizes,
  currentModalQuizPoints
}) => {
  const [showMore, setShowMore] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizPoints, setQuizPoints] = useState(
    currentModalQuizPoints ? currentModalQuizPoints.quizPoints : 0
  );
  const [quizButtonDisabled, setDisableQuizButton] = useState(false);

  const currentMarkerData = useMemo(() => {
    if (markerSelected) {
      return data.points.find(point => point.name === markerSelected);
    }
  }, [markerSelected]);

  const renderChildren = useCallback(() => {
    return (
      <div className="modal__content">
        {children}
        <Button
          variant="contained"
          onClick={closeModal}
          style={{ display: "block", margin: "0 auto" }}
        >
          Zamknij
        </Button>
      </div>
    );
  }, [children, closeModal]);

  const handleExitQuizModal = () => setShowQuiz(false);

  const renderQuiz = useCallback(() => {
    const handleQuizPoints = quizPoints => {
      setQuizPoints(quizPoints);
      setDisableQuizButton(true);
      addQuizPoints(quizPoints, currentMarkerData.name);
    };
    return (
      <Quiz
        data={currentMarkerData.quiz}
        handleExitQuizModal={handleExitQuizModal}
        handleQuizPoints={handleQuizPoints}
      />
    );
  }, [currentMarkerData, addQuizPoints]);

  const renderMarkersInfo = useCallback(() => {
    const checkToQuizIsResolved = quiz =>
      quiz.quizName === currentMarkerData.name;
    const quizResolved =
      quizButtonDisabled || resolvedQuizes.some(checkToQuizIsResolved);
    return (
      <React.Fragment>
        <h2>{currentMarkerData.name}</h2>
        <img
          className="modal__image"
          alt="markerSelected"
          src={`${currentMarkerData.img}.jpg`}
        />
        {showMore && (
          <p className="modal__description">{currentMarkerData.description}</p>
        )}
        <div className="modal__controls">
          {currentMarkerData.quiz && (
            <Button
              onClick={() => setShowQuiz(true)}
              variant="contained"
              disabled={quizResolved}
              style={{
                backgroundColor: quizResolved ? "green" : "#ff9966",
                color: "white"
              }}
            >
              Quiz ({quizPoints}/{currentMarkerData.quiz.length})
            </Button>
          )}
          <Button
            variant="contained"
            style={{ backgroundColor: "#263761", color: "white" }}
            onClick={() => setShowMore(true)}
            disabled={showMore}
          >
            Więcej
          </Button>
          <Button variant="contained" onClick={closeModal}>
            Zamknij
          </Button>
        </div>
      </React.Fragment>
    );
  }, [
    showMore,
    currentMarkerData,
    quizPoints,
    quizButtonDisabled,
    closeModal,
    resolvedQuizes
  ]);

  return (
    <div className="modal">
      {(showQuiz && renderQuiz()) ||
        (markerSelected ? renderMarkersInfo() : renderChildren())}
    </div>
  );
};

export default Modal;
