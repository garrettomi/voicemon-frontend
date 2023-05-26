import { useState } from "react";

export default function Form({ handleSubmit }) {
  const [pokemonName, setPokemonName] = useState("");

  const handleChange = (event) => {
    setPokemonName(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(pokemonName);
    setPokemonName("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={pokemonName} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
}
