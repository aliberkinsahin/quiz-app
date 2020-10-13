import React from "react";
import { useState, useEffect } from "react";
import Questionaire from "./Questionaire";

function Quiz({ apiUrl, category, reconfigure }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  const handleAnswer = (answer) => {
    if (!showAnswers && !gameEnd) {
      if (answer === questions[currentQuestionIndex].correct_answer) {
        setScore(score + 1);
      }
      setTimeout(() => {
        if (currentQuestionIndex <= questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        setShowAnswers(false);
      }, 1000);
    }
    setShowAnswers(true);
  };

  const handleRestart = () => {
    setScore(0);
    setQuestions([]);
    fetchQuestions(apiUrl);
    setIsRestarting(true);
  };

  const fetchQuestions = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results.map((_question) => ({
          ..._question,
          answers: [
            _question.correct_answer,
            ..._question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }));
        setQuestions(questions);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchQuestions(apiUrl);
  }, [apiUrl]);

  useEffect(() => {
    if (currentQuestionIndex > questions.length - 1 && questions.length !== 0) {
      setCurrentQuestionIndex(0);
      setGameEnd(true);
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (isRestarting && questions.length > 0) {
      setGameEnd(false);
      setIsRestarting(false);
    }
  }, [isRestarting, questions]);

  return (
    <div className="container p-5 w-screen sm:max-w-3xl">
      {gameEnd && !isRestarting ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl text-white text-center mb-2">
            Your score is {score}/{questions.length}
          </h1>
          <button
            className="font-bold text-white bg-indigo-500 hover:bg-indigo-700 w-1/2 my-4 p-4 rounded shadow-lg"
            onClick={handleRestart}
          >
            Restart
          </button>
          <button
            className="font-bold text-white bg-orange-500 hover:bg-orange-700 w-1/2 p-4 rounded shadow-lg"
            onClick={reconfigure}
          >
            Reconfigure
          </button>
        </div>
      ) : questions.length > 0 &&
        !isRestarting &&
        currentQuestionIndex !== questions.length ? (
        <>
          <h1 className="text-white text-3xl text-center">
            -- {category} --
          </h1>
          <h1 className="mt-3 text-white text-2xl text-center">
            Question {currentQuestionIndex + 1}/{questions.length}
          </h1>
          <Questionaire
            data={questions[currentQuestionIndex]}
            handleAnswer={handleAnswer}
            showAnswers={showAnswers}
          />
        </>
      ) : (
        <h1 className="text-2xl text-white text-center mt-10">
          Fetching questions...
        </h1>
      )}
    </div>
  );
}

export default Quiz;
