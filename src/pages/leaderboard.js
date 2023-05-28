import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles.module.css";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}games`
        );
        setLeaderboardData(response.data.data);
      } catch (error) {
        console.error("Error getting leaderboard data:", error);
      }
    };
    fetchData();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const sortedLeaderboardData = leaderboardData.sort(
    (a, b) => b.score - a.score
  );

  return (
    <div>
      <h1 className={styles.leaderboard}>Leaderboard</h1>
      <table>
        <thead>
          <tr className={styles.maintitlefont}>
            <th>Username</th>
            <th>Score</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedLeaderboardData.map((data, index) => (
            <tr
              key={data.id}
              className={index % 2 === 0 ? styles.even : styles.odd}
            >
              <td>{data.username}</td>
              <td>{data.score}</td>
              <td>{formatTimestamp(data.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
