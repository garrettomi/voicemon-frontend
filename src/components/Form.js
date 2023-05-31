// import { useState } from "react";
// import styles from "../styles.module.css";

// export default function Form({ handleSubmit }) {
//   const [pokemonName, setPokemonName] = useState("");

//   const handleChange = (event) => {
//     setPokemonName(event.target.value);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     handleSubmit(pokemonName);
//     setPokemonName("");
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         type="text"
//         value={pokemonName}
//         onChange={handleChange}
//         style={{
//           backgroundColor: "#fcfee1",
//           borderColor: "#707080",
//           borderRadius: "5px",
//           outline: "none",
//           color: "rgb(96, 96, 96)",
//           fontFamily: "Noto Sans JP",
//         }}
//       />
//       <button className={styles.submitbutton} type="submit">
//         CATCH
//       </button>
//     </form>
//   );
// }
