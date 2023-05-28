import { useState } from "react";
import styles from "../styles.module.css";
import useSound from "use-sound";
import clickSound from "../public/pokemon-a-button.mp3";

export default function Form({ handleSubmit }) {
  const [pokemonName, setPokemonName] = useState("");
  const [play] = useSound(clickSound);

  const handleChange = (event) => {
    setPokemonName(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(pokemonName);
    setPokemonName("");
    play();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={pokemonName}
        onChange={handleChange}
        style={{
          backgroundColor: "#fcfee1",
          borderColor: "#707080",
          borderRadius: "5px",
          outline: "none",
          color: "rgb(96, 96, 96)",
          fontFamily: "Noto Sans JP",
        }}
      />
      <button className={styles.submitbutton} type="submit">
        CATCH
      </button>
    </form>
  );
}
