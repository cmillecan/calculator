import React, { useState } from "react";
import "./Calculator.css";
import values from "./values";
import evaluate from "../evaluate";

function Calculator() {
  const [input, setInput] = useState("");
  const [wasEvaluated, setWasEvaluated] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleClick = (e) => {
    let curVal = e.target.innerText;
    if (curVal === "C") setInput("");
    else if (curVal === "Evaluate") {
      try {
        const total = evaluate(input);
        setInput(total);
        setWasEvaluated(true);
      } catch (e) {
        console.error("error calculating: ", e);
        alert("Please enter a valid operation");
        setInput("");
      }
    } else {
      if (wasEvaluated) {
        setInput(curVal);
        setWasEvaluated(false);
      } else setInput(input + curVal);
    }
  };

  return (
    <div className="calc-container">
      <div className="calculator">
        <div className="input-values">
          <input
            type="text"
            placeholder="0"
            onChange={handleInput}
            value={input}
          />
        </div>
        <div className="calc-values">
          <div className="calc-row">
            {values.map((val) => {
              return (
                <button
                  className="calc-btn"
                  key={val}
                  value={val}
                  onClick={handleClick}
                >
                  <p>{val}</p>
                </button>
              );
            })}
            <button className="eval-btn" value="Evaluate" onClick={handleClick}>
              <p>Evaluate</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
