import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.css";

export default function PokemonCounter({ correctPokemon }) {
  const [correctPokemonCount, setCorrectPokemonCount] = useState(0);

  useEffect(() => {
    setCorrectPokemonCount(correctPokemon.length);
  }, [correctPokemon]);

  return (
    <div>
      <h2 className={styles.gamefont}>
        Correct Pokemon: {correctPokemonCount}
      </h2>
    </div>
  );
}
