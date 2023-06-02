import styles from "./page.module.css";

const Layout = ({ children }) => {
  return (
    <div>
      <main className={`${styles.test}`}>{children}</main>
    </div>
  );
};

export default Layout;
