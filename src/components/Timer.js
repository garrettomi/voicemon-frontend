import React, { useState, useEffect } from "react";

export default function Timer({ setShowForm, setPokemonData }) {
  const [timerDuration, setTimerDuration] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimerDuration((prevDuration) => prevDuration - 1);
      }, 1000);
    }

    if (timerDuration === 0) {
      setIsTimeUp(true);
      setIsTimerRunning(false);
    }

    if (isTimeUp) {
      setShowForm(false);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerRunning, isTimeUp, setShowForm, timerDuration]);

  const handlePlayClick = () => {
    setIsTimerRunning(true);
    setShowForm(true);
    setTimerDuration(10);
    setIsTimeUp(false);
    setPokemonData([]);
  };

  return (
    <div>
      <h3>Timer: {timerDuration} seconds</h3>
      {!isTimerRunning && <button onClick={handlePlayClick}>Play</button>}
    </div>
  );
}
