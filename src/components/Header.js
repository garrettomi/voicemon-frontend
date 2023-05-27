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
      <h1 className="header__title">Typemon</h1>
      <ul className="header__tabs">
        <li onClick={handleLeaderboardClick}>
          {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
        </li>
        <Logout handleLogout={handleLogout} />
      </ul>
      {showLeaderboard && <Leaderboard />}
    </header>
  );
}
