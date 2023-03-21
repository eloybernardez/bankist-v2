import React from "react";
import "../styles/Timer.css";

const Timer = ({ setSubmitted, time, resetTime }) => {
  let timer;

  const min = String(Math.trunc(time / 60)).padStart(2, 0);
  const sec = String(time % 60).padStart(2, 0);

  // Create time string
  timer = `${min}:${sec}`;

  return (
    <div className="logout">
      <p className="logout__timer">
        You will be logged out in{" "}
        <span className={`${time < (time * 1) / 10 ? "timer-end" : "timer"}`}>
          {timer}
        </span>
      </p>
      <button
        type="button"
        className="logout__button"
        onClick={() => {
          setSubmitted(false);
          resetTime();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Timer;
