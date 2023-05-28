import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";

export default function Timer({ setShowForm, setPokemonData, user_id }) {
  const [timerDuration, setTimerDuration] = useState(60);
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
    setTimerDuration(60);
    setIsTimeUp(false);
    setPokemonData([]);
  };

  return (
    <div>
      <h3 className={styles.commonfont}>Timer: {timerDuration} seconds</h3>
      {!isTimerRunning && (
        <button onClick={handlePlayClick} className={styles.scorebutton}>
          Play
        </button>
      )}
    </div>
  );
}
