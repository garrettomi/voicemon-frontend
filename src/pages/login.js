import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        console.log(response.data);
        const user_id = response.data.id;
        console.log(user_id);
        router.push({
          pathname: "http://localhost:3000/homepage",
          query: { user_id },
        });
      } else {
        alert("Login failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    }
  };

  console.log("username:", username);
  console.log("password:", password);

  return (
    <div>
      <h1>Typemon Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Need an account?
        <div>
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </div>
      </p>
    </div>
  );
}
