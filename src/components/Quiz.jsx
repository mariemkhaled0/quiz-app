import React from "react";
import { useState, useRef } from "react";
import { data } from "../data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [dataItem, setData] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setscore] = useState(0);

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (ans === dataItem.answer) {
        e.target.classList.add("correct");
        setLock(true);
        setscore(score + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        const options = document.querySelectorAll(".options");
        options.forEach((option) => {
          if (option.textContent === dataItem.answer) {
            option.classList.add("correct");
          }
        });
      }
    }
  };

  const next = () => {
    if (lock === true) {
      const options = document.querySelectorAll(".options");

      options.forEach((option) => {
        option.classList.remove("correct", "wrong");
      });
      setIndex(++index);
      setData(data[index]);
      setLock(false);
    }
  };

  const reset = () => {
    setIndex(0);
    setData(data[0]);
    setscore(0);
  };

  return (
    <div className="quizContainer">
      <h1>Quiz app</h1>
      <hr></hr>
      {index < data.length ? (
        <>
          <p>
            {" "}
            {index + 1} -{dataItem.question}
          </p>

          <ul>
            {dataItem.options.map((option, index) => {
              return (
                <li
                  key={index}
                  onClick={(e) => {
                    checkAns(e, option);
                  }}
                  className="options"
                >
                  {option}
                </li>
              );
            })}
          </ul>
          <button onClick={next}>Next</button>

          <p className="no-q">
            {index + 1} of {data.length}
          </p>
        </>
      ) : (
        <div>
          <p>
            yor score is {score} out of {data.length}
          </p>
          <button onClick={reset}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
