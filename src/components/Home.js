// import { useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import Header from "./Header";
// import Form from "./Form";
// import Timer from "./Timer";
// import PokemonList from "./PokemonList";
// import PokemonCounter from "./PokemonCounter";
// import useSound from "use-sound";
// import captureSound from "../public/pokeball_sound_effects_mp3cut_3.mp3";
// import styles from "../styles.module.css";

// export default function Home({ user_id, username }) {
//   const [pokemonData, setPokemonData] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [isActive, setIsActive] = useState(false);
//   const [play] = useSound(captureSound);
//   const router = useRouter();

//   const handleSubmit = async (pokemonName) => {
//     try {
//       const lowercaseName = pokemonName.toLowerCase();

//       if (
//         pokemonData.some(
//           (pokemon) => pokemon.name.toLowerCase() === lowercaseName
//         )
//       ) {
//         setErrorMessage("Already typed!");
//         return;
//       }

//       const response = await axios.get(
//         // `${process.env.NEXT_PUBLIC_API_URL}poketype/${lowercaseName}`
//         "http://127.0.0.1:8000/myapp/pokemon/1/"
//       );
//       const data = response.data;

//       if (response.status === 200) {
//         const newPokemon = {
//           name: data.name,
//           img_url: data.img_url,
//         };

//         setPokemonData((prevData) => [...prevData, newPokemon]);
//         setErrorMessage("");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 500) {
//         setErrorMessage("Pokemon not found");
//       } else {
//         setErrorMessage("An error occurred");
//       }
//       console.error("Error:", error);
//     }
//   };

//   const handleScoreSubmit = async () => {
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}games`, {
//         // await axios.post("http://localhost:9000/games", {
//         user_id: parseInt(user_id),
//         score: pokemonData.length,
//         username: username,
//       });
//       setPokemonData([]);
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     play();
//   };

//   const handleLogout = () => {
//     router.push("/login");
//     console.log("Logged out");
//   };

//   return (
//     <div>
//       <Header handleLogout={handleLogout} />
//       <div />

//       <div className={styles.pokemoncontainer}>
//         {showForm ? (
//           <Form handleSubmit={handleSubmit} />
//         ) : (
//           <h1 className={styles.gamefont}>Gotta type em all!</h1>
//         )}
//         {errorMessage && <p>{errorMessage}</p>}
//         <div className={`${styles.pokemonlist} ${isActive ? "active" : ""}`}>
//           <PokemonList pokemonData={pokemonData} />
//         </div>
//         <PokemonCounter count={pokemonData.length} />
//         <div className={styles.timerContainer}>
//           <Timer
//             setShowForm={setShowForm}
//             setPokemonData={setPokemonData}
//             user_id={user_id}
//           />
//         </div>
//         {pokemonData.length > 0 && (
//           <button className={styles.scorebutton} onClick={handleScoreSubmit}>
//             SUBMIT SCORE
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [randomPokemonId, setRandomPokemonId] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const randomPokemon = () => {
    setRandomPokemonId(Math.floor(Math.random() * 1276) + 1);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (
      pokemon &&
      event.target.value.toLowerCase() === pokemon.name.toLowerCase()
    ) {
      randomPokemon();
      setInputValue("");
    }
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = axios
        .get(`http://127.0.0.1:8000/myapp/pokemon/${randomPokemonId}`)
        .then((response) => setPokemon(response.data))
        .catch((error) => console.error(`Error: ${error}`));
    };
    fetchPokemon();
  }, [randomPokemonId]);

  return (
    <div>
      {pokemon ? (
        <div>
          <img
            src={pokemon.img_url}
            alt={pokemon.name}
            style={{ width: "500px", height: "500px" }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <input
        type="text"
        placeholder="Who's that Pokemon?"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={randomPokemon}>Skip</button>
    </div>
  );
}
