import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Form from "../components/Form";
import Timer from "../components/Timer";
import PokemonList from "../components/PokemonList";
import PokemonCounter from "../components/PokemonCounter";

export default function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

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
      {showForm ? <Form handleSubmit={handleSubmit} /> : <p>Press Play!</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <PokemonCounter count={pokemonData.length} />
      <PokemonList pokemonData={pokemonData} />
      <Timer setShowForm={setShowForm} setPokemonData={setPokemonData} />
    </div>
  );
}
