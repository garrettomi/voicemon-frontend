import React from "react";
import styles from "../styles/styles.module.css";

export default function VoiceRecognitionButton({
  startVoiceRecognition,
  showTryAgain,
}) {
  return (
    <div>
      <button className={styles.voicebutton} onClick={startVoiceRecognition}>
        🎤
      </button>
      {showTryAgain && <p>Try again!</p>}
    </div>
  );
}
