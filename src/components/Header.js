import React, { useState } from "react";
import Leaderboard from "../pages/leaderboard";
import Logout from "./Logout";
import styles from "../styles.module.css";

export default function Header({ handleLogout }) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleLeaderboardClick = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>Typemon</h1>
      <div className={styles.header__tabs}>
        <div onClick={handleLeaderboardClick}>
          {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
        </div>
        <Logout handleLogout={handleLogout} />
      </div>
      {showLeaderboard && <Leaderboard />}
    </header>
  );
}
