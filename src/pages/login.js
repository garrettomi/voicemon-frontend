import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import styles from "../styles.module.css";
import useSound from "use-sound";
import clickSound from "../public/pokemon-a-button.mp3";
import loginimg from "../public/login-image.jpg";
import Image from "next/image";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [play] = useSound(clickSound);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}login`,
        // "http://localhost:9000/login",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        const user_id = response.data.id;
        const username = response.data.username;
        router.push({
          pathname: `${process.env.NEXT_PUBLIC_DOMAIN_URL}homepage`,
          // pathname: "http://localhost:3000/homepage",
          query: { user_id, username },
        });
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    }
    play();
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Typemon Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <div className={styles.signupText}>
          Need an account?
          <div>
            <Link href="/signup">Sign Up</Link>
          </div>
        </div>
        <div className="loginPageBackground">
          <Image src={loginimg} alt="Login background" />
        </div>
      </div>
    </div>
  );
}
