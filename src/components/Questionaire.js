import React from "react";

export default function Questionaire({
  data: { question, correct_answer, answers },
  handleAnswer,
  showAnswers,
}) {
  return (
    <div className="mt-2">
      <div className="bg-white text-purple-800 p-6 rounded shadow-lg float-none">
        <h2
          className="text-lg sm:text-xl"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <div className=" flex flex-col items-center sm:flex-row flex-wrap mt-4 justify-around">
        {answers.map((_answer) => (
          <button
            key={_answer}
            onClick={() => handleAnswer(_answer)}
            className={`w-4/5 md:w-5/12 p-4 my-2 font-semibold rounded shadow-lg ${
              showAnswers
                ? _answer === correct_answer
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-white text-purple-800"
            }`}
            dangerouslySetInnerHTML={{ __html: _answer }}
          />
        ))}
      </div>
    </div>
  );
}
