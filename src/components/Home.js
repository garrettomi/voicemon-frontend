// import { useState, useEffect } from "react";
// import PokemonImage from "./PokemonImage";
// import PokemonCounter from "./PokemonCounter";
// import Form from "./Form";
// import VoiceRecognitionButton from "./VoiceRecognitionButton";
// // import styles from "../styles.module.css";
// import axios from "axios";

// export default function Home() {
//   const [pokemon, setPokemon] = useState(null);
//   const [correctPokemon, setCorrectPokemon] = useState([]);
//   const [randomPokemonId, setRandomPokemonId] = useState(1);
//   const [inputValue, setInputValue] = useState("");
//   const [showTryAgain, setShowTryAgain] = useState(false);
//   const [timerActive, setTimerActive] = useState(false);
//   const [timerDuration, setTimerDuration] = useState(5);

//   const randomPokemon = () => {
//     setRandomPokemonId(Math.floor(Math.random() * 1276) + 1);
//     setShowTryAgain(false);
//   };

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//     if (
//       pokemon &&
//       event.target.value.toLowerCase() === pokemon.name.toLowerCase()
//     ) {
//       randomPokemon();
//       setInputValue("");
//       setCorrectPokemon([...correctPokemon, pokemon.name]);
//       setShowPokemonImage(true);
//     }
//   };

//   const startVoiceRecognition = () => {
//     if ("webkitSpeechRecognition" in window) {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.lang = "en-US";
//       recognition.interimResults = false;

//       recognition.onresult = (event) => {
//         const transcript =
//           event.results[event.results.length - 1][0].transcript;
//         console.log("Transcript:", transcript);
//         sendTranscriptionToBackend(transcript);
//       };

//       recognition.onerror = (event) => {
//         if (event.error === "not-allowed") {
//           console.error("Microphone access not allowed.");
//         } else {
//           console.error("Error:", event.error);
//         }
//       };

//       recognition.start();
//     } else {
//       console.log("Speech Recognition Not Available");
//     }
//   };

//   const sendTranscriptionToBackend = async (transcript) => {
//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/myapp/speech_recognition/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ transcript }),
//         }
//       );

//       const result = await response.json();
//       console.log("Backend Response:", result);

//       if (result.status === "success" && pokemon.id === result.pokemon_id) {
//         randomPokemon();
//         setCorrectPokemon([...correctPokemon, pokemon.name]);
//       } else {
//         setShowTryAgain(true);
//       }
//     } catch (error) {
//       console.error("Error sending transcription to backend:", error);
//     }
//   };

//   useEffect(() => {
//     let intervalId;

//     if (timerActive) {
//       intervalId = setInterval(() => {
//         setTimerDuration((prevDuration) => prevDuration - 1);
//       }, 1000);

//       if (timerDuration === 0) {
//         setTimerActive(false);
//       }

//       return () => {
//         clearTimeout(intervalId);
//       };
//     }
//   }, [timerActive, timerDuration]);

//   const handlePlayButtonClick = () => {
//     setTimerActive(true);
//     setTimerDuration(60);
//     setCorrectPokemon([]);
//   };

//   useEffect(() => {
//     const fetchPokemon = async () => {
//       const response = axios
//         .get(`http://127.0.0.1:8000/myapp/pokemon/${randomPokemonId}`)
//         .then((response) => setPokemon(response.data))
//         .catch((error) => console.error(`Error: ${error}`));
//     };
//     fetchPokemon();
//   }, [randomPokemonId]);

//   return (
//     <div>
//       {timerActive && <PokemonImage pokemon={pokemon} />}
//       {timerActive && (
//         <Form
//           inputValue={inputValue}
//           handleInputChange={handleInputChange}
//           showTryAgain={showTryAgain}
//         />
//       )}
//       {timerActive && <button onClick={randomPokemon}>Skip</button>}
//       {timerActive && (
//         <VoiceRecognitionButton startVoiceRecognition={startVoiceRecognition} />
//       )}
//       <button onClick={handlePlayButtonClick}>Play</button>
//       {timerActive && <h3>Timer: {timerDuration} seconds</h3>}
//       <PokemonCounter correctPokemon={correctPokemon} />
//     </div>
//   );
// }
