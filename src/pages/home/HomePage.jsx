import MainAside from "../../components/main/MainAside";
import MainPost from "../../components/main/MainPost";
import styles from "./HomePage.module.css";
const HomePage = () => {
  return (
    <div className={styles.home_container}>
      <MainPost />
      <MainAside />
    </div>
  );
};

export default HomePage;
