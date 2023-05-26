import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../components/Header";
import Form from "../components/Form";
import PokemonList from "../components/PokemonList";
import Login from "../components/Login";

export default function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleSubmit = async (pokemonName) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/poketype/${pokemonName}`
      );
      const data = response.data;

      if (response.status === 200) {
        const newPokemon = {
          name: data.name,
          img_url: data.img_url,
        };

        setPokemonData((prevData) => [...prevData, newPokemon]);
        setErrorMessage("");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorMessage("Pokemon not found");
      } else {
        setErrorMessage("An error occurred");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Header />
      <Login />
      <Form handleSubmit={handleSubmit} />
      {errorMessage && <p>{errorMessage}</p>}
      <PokemonList pokemonData={pokemonData} />
    </div>
  );
}
