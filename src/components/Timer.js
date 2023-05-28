import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import useSound from "use-sound";
import clickSound from "../public/pokemon-a-button.mp3";

export default function Timer({ setShowForm, setPokemonData }) {
  const [timerDuration, setTimerDuration] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [play] = useSound(clickSound);

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
    play();
  };

  return (
    <div>
      <h3 className={styles.maintitlefont}>Timer: {timerDuration} seconds</h3>
      {!isTimerRunning && (
        <button onClick={handlePlayClick} className={styles.scorebutton}>
          PLAY
        </button>
      )}
    </div>
  );
}
