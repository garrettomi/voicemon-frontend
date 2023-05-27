import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // `${process.env.NEXT_PUBLIC_API_URL}signup`,
        "http://localhost:9000/signup",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        // router.push(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/login`);
        router.push("/login");
      } else {
        alert("Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Please try again later");
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
