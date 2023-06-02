import { useState, useEffect } from "react";

const Timer = ({ onPlay, onTimeUp }) => {
  const [timerActive, setTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(5);

  useEffect(() => {
    let intervalId;

    if (timerActive) {
      intervalId = setInterval(() => {
        setTimerDuration((prevDuration) => prevDuration - 1);
      }, 1000);

      if (timerDuration === 0) {
        setTimerActive(false);
        onTimeUp();
      }

      return () => {
        clearTimeout(intervalId);
      };
    }
  }, [timerActive, timerDuration]);

  const handlePlayButtonClick = () => {
    setTimerActive(true);
    setTimerDuration(60);
    onPlay();
  };

  return (
    <div>
      <button onClick={handlePlayButtonClick}>Play</button>
      {timerActive && <h3>Timer: {timerDuration} seconds</h3>}
    </div>
  );
};

export default Timer;
