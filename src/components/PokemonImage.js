import React from "react";

export default function PokemonImage({ pokemon }) {
  return pokemon ? (
    <div>
      <img
        src={pokemon.img_url}
        alt={pokemon.name}
        style={{ width: "500px", height: "500px" }}
      />
    </div>
  ) : (
    <p>Loading...</p>
  );
}
