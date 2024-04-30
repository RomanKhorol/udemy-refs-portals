import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  let timer = useRef();
  let dialog = useRef();

  if (timeRemaining < 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }
  function onReset() {
    setTimeRemaining(targetTime * 1000);
  }
  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }
  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        remainingTime={timeRemaining}
        onReset={onReset}
        targetTime={targetTime}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timeIsActive ? handleStop : handleStart}>
            {timeIsActive ? "Stop" : "Start"} Chellenge
          </button>
        </p>
        <p className={timeIsActive ? "active" : undefined}>
          {timeIsActive ? "Timer is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
