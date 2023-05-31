import Home from "../components/Home";
// import { useRouter } from "next/router";
// import styles from "../styles.module.css";

export default function Homepage() {
  // const router = useRouter();
  // const { user_id, username } = router.query;

  // if (!user_id) {
  //   return <div>Loading...</div>;
  // }
  // return (
  //   <>
  //     <div className={styles.homepagebackground}>
  //       <div className={styles.maintitlefont}>Hello {username}</div>
  //       <Home user_id={user_id} username={username} />
  //     </div>
  //   </>
  // );
  return <Home />;
}
