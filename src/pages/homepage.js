import Home from "../components/Home";
import { useRouter } from "next/router";

export default function Homepage() {
  const router = useRouter();
  const { user_id, username } = router.query;

  if (!user_id) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>Hello {username}</div>
      <Home user_id={user_id} username={username} />;
    </>
  );
}
