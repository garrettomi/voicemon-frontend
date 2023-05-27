import React, { useState } from "react";
import Leaderboard from "../pages/leaderboard";

export default function Header() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleLeaderboardClick = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  return (
    <header className="header">
      <h1 className="header__title">Typemon</h1>
      <ul className="header__tabs">
        <li onClick={handleLeaderboardClick}>
          {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
        </li>
      </ul>
      {showLeaderboard && <Leaderboard />}
    </header>
  );
}
