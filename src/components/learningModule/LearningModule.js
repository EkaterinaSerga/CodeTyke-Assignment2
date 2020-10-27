import React from 'react';
import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';
import ProgressBar from '../progressBar/ProgressBar';

import './Styles.scss';

const LearningModule = ({ setGameStatus, gameStatus }) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  let currentQuestion = quizData.questionArr
    ? quizData.questionArr[currentQuestionId]
    : {};
  React.useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = () => {
    fetch('http://localhost:8080/problems')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuizData(data);
        setGameStatus({
          percentageToAdd: 100 / data.totalQuestions,
          currentPercentage: 100 / data.totalQuestions,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    if (currentQuestionId < quizData.totalQuestions - 1) {
      setCurrentQuestionId(currentQuestionId + 1);
      setGameStatus({
        currentPercentage:
          gameStatus.currentPercentage + gameStatus.percentageToAdd,
        percentageToAdd: 100 / quizData.totalQuestions,
      });
    } else {
      setCurrentQuestionId(0);
      setGameStatus({
        message: 'Great Job! Play again.',
        loadIntro: true,
        currentPercentage: 0,
        percentageToAdd: 0,
      });
    }
  };
  let possibleAnswers = [];
  if (currentQuestion.possibleAnswers) {
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox id={index} key={index} answer={answer} />;
    });
  }

  return (
    <div className="learningModule">
      <ProgressBar percentage={gameStatus.currentPercentage} />
      {currentQuestion.title && (
        <>
          <div className="learningModule--header">
            <div className="learningModule--title">{currentQuestion.title}</div>
            <div className="learningModule--subHeader">
              {currentQuestion.additionalInfo}
            </div>
          </div>

          <div className="learningModule--answerArea">
            <div className="learningModule--selections">{possibleAnswers}</div>
            <div className="learningModule--submitButtonContainer">
              <Button label="Submit" handleSubmit={handleSubmit} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LearningModule;
