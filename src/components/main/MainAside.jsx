import FollowList from "../follow/FollowList";
import Notice from "../notice/Notice";
import RecommendationUsers from "../recommendation/RecommendationUsers";
import styles from "./MainAside.module.css";
const MainAside = () => {
  return (
    <div className={styles.container}>
      <Notice />
      <FollowList />
      <RecommendationUsers/>
    </div>
  );
};

export default MainAside;
