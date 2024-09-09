"use client";
import React, { useState } from "react";

const questions = [
  {
    id: 1,
    text: "How satisfied are you with our products?",
    type: "rating",
    options: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    text: "How fair are the prices compared to similar retailers?",
    type: "rating",
    options: [1, 2, 3, 4, 5],
  },
  {
    id: 3,
    text: "How satisfied are you with the value for money of your purchase?",
    type: "rating",
    options: [1, 2, 3, 4, 5],
  },
  {
    id: 4,
    text: "On a scale of 1-5 how would you recommend us to your friends and family?",
    type: "rating",
    options: [1, 2, 3, 4, 5],
  },
  {
    id: 5,
    text: "What could we do to improve our service?",
    type: "text",
  },
];

function Questionaire() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId, setSessionId] = useState(null);

  const handleStart = () => {
    setSessionId(Date.now());
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (answer) => {
    setIsClicked(true);
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: answer,
    });
  };

  const handleSubmit = () => {
        setSubmit(true);
        console.log(answers)
  }
 
  const [isSubmit,setSubmit] = useState(false);
  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex === questions.length - 1) {
        return prevIndex;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex === 0) {
        return prevIndex;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const handleSkip = () => {
    handleNext();
  };

  const currentQuestion = questions[currentQuestionIndex];
  const [isClicked,setIsClicked] = useState(false);
  return (
    <>
     {isSubmit ? (

        <div className="flex justify-center items-center flex-col">
            <h1 className="text-4xl font-mono ">Thank You for Submiting!</h1>
            
        </div>
        




    ):(<div className="app bg-slate-200 shadow-xl p-16 rounded-3xl">
      {!sessionId ? (
        <div className="welcome">
          <h1 className="font-bold text-2xl pb-4">Welcome to our Customer Survey!</h1>
          <button className=" bg-sky-500 p-3 text-white flex items-center justify-center rounded-3xl text-center" onClick={handleStart}>Start</button>
        </div>
      ) : (
        <div className="survey">
          <h2 className="font-bold text-center text-2xl pb-10">Customer Survey</h2>
          <p className="pb-4 text-lg">
            Question: {currentQuestionIndex + 1}/{questions.length}
          </p>

          {currentQuestion.type === "rating" ? (
            <div className="question">
              <h3 className="pb-4">{currentQuestion.text}</h3>
              <div className="options  border-solid rounded-full pb-8 flex gap-4">
                {currentQuestion.options.map((option) => (
                  <div className=" h-[30px] w-[30px] text-center rounded-full ">
                    <button
                      key={option}
                    
                      onClick={() => handleAnswer(option)}
                      className={
                        answers[currentQuestion.id] === option ? "bg-green-500 h-[30px] w-[30px] text-center rounded-full" : "bg-sky-500 h-[30px] w-[30px] text-center rounded-full"
                      }
                    >
                      {option}
                    </button>
                  
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="question">
              <h3 className="text-center pb-4">{currentQuestion.text}</h3>
              <textarea
              className="mb-4"
                onChange={(e) => handleAnswer(e.target.value)}
                value={answers[currentQuestion.id] || ""}
              />
            </div>
          )}

          <div className="buttons flex justify-between">
            {currentQuestionIndex > 0 && (
              <button className="bg-black text-white p-3 rounded-xl "  onClick={handlePrev}>Prev</button>
            )}
            {currentQuestionIndex < questions.length - 1 && (
              <>
                <button className="bg-black text-white p-3 rounded-xl " onClick={handleSkip}>Skip</button>
                <button className="bg-black text-white p-3 rounded-xl " onClick={handleNext}>Next</button>
              </>
            )}
            {currentQuestionIndex == questions.length - 1 && (
              <>
                <button className="bg-green-600 text-white p-3 rounded-xl " onClick={handleSubmit}>Submit</button>
               
              </>
            )}

          </div>
        </div>
      )}
    </div>)

}
    
    </>
  );
}

export default Questionaire;
