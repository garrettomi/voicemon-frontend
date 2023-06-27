// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import Layout from "./layout";

// export default function Index() {
//   const router = useRouter();

//   useEffect(() => {
//     router.push("/homepage");
//   }, []);
//   return <Layout></Layout>;
// }

import { useState, useEffect } from "react";
import PokemonImage from "@/components/PokemonImage";
import PokemonCounter from "@/components/PokemonCounter";
import VoiceRecognitionButton from "@/components/VoiceRecognitionButton";
import axios from "axios";
import styles from "../styles/styles.module.css";
import { GiPokecog } from "react-icons/gi";

export default function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [correctPokemon, setCorrectPokemon] = useState([]);
  const [randomPokemonId, setRandomPokemonId] = useState(1);
  // const [inputValue, setInputValue] = useState("");
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(5);
  const [showPokeball, setShowPokeball] = useState(true);
  const [showComponents, setShowComponents] = useState(false);

  const randomPokemon = () => {
    setRandomPokemonId(Math.floor(Math.random() * 1276) + 1);
    setShowTryAgain(false);
  };

  const startVoiceRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        console.log("Transcript:", transcript);
        sendTranscriptionToBackend(transcript);
      };

      recognition.onerror = (event) => {
        if (event.error === "not-allowed") {
          console.error("Microphone access not allowed.");
        } else {
          console.error("Error:", event.error);
        }
      };

      recognition.start();
    } else {
      console.log("Speech Recognition Not Available");
    }
  };

  const sendTranscriptionToBackend = async (transcript) => {
    try {
      const response = await fetch(
        // "http://127.0.0.1:8000/myapp/speech_recognition/",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}myapp/speech_recognition/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcript }),
        }
      );

      const result = await response.json();
      console.log("Backend Response:", result);

      if (result.status === "success" && pokemon.id === result.pokemon_id) {
        randomPokemon();
        setCorrectPokemon([...correctPokemon, pokemon.name]);
      } else {
        setShowTryAgain(true);
      }
    } catch (error) {
      console.error("Error sending transcription to backend:", error);
    }
  };

  useEffect(() => {
    let intervalId;

    if (timerActive) {
      intervalId = setInterval(() => {
        setTimerDuration((prevDuration) => prevDuration - 1);
      }, 1000);

      if (timerDuration === 0) {
        setTimerActive(false);
        setShowPokeball(true);
      }

      return () => {
        clearTimeout(intervalId);
      };
    }
  }, [timerActive, timerDuration]);

  const handlePlayButtonClick = () => {
    setTimerActive(true);
    setTimerDuration(60);
    setCorrectPokemon([]);
    setShowPokeball(false);
    setShowComponents(true);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = axios
        // .get(`http://127.0.0.1:8000/myapp/pokemon/${randomPokemonId}`)
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}myapp/pokemon/${randomPokemonId}`
        )
        .then((response) => setPokemon(response.data))
        .catch((error) => console.error(`Error: ${error}`));
    };
    fetchPokemon();
  }, [randomPokemonId]);

  return (
    <div className={styles.container}>
      {showComponents && (
        <div className={styles.pokemoncontainer}>
          {timerActive && (
            <h3 className={styles.maintitlefont}>
              Timer: {timerDuration} seconds
            </h3>
          )}
          <div className={styles.circleContainer}>
            <PokemonImage pokemon={pokemon} />
          </div>
          {showComponents && <PokemonCounter correctPokemon={correctPokemon} />}
        </div>
      )}
      {/* {showComponents && (
        <Form
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          showTryAgain={showTryAgain}
        />
      )} */}
      {timerActive && (
        <div className={styles.buttonwrapper}>
          <button className={styles.skipbutton} onClick={randomPokemon}>
            Skip
          </button>
          <VoiceRecognitionButton
            startVoiceRecognition={startVoiceRecognition}
            showTryAgain={showTryAgain}
          />
        </div>
      )}
      {showPokeball && (
        <GiPokecog
          className={styles.centeredbutton}
          onClick={handlePlayButtonClick}
          size="8em"
        />
      )}
    </div>
  );
}
