import styles from "./PostItem.module.css";
import { Link } from "react-router-dom";

const PostItemInfo = (props) => {
  return (
    <div className={styles.post_top}>
      <Link to={"/user/" + props.uid}>
        <span className={styles.user_name}>{props.name}</span>
      </Link>
      <span className={styles.timestamp}>{props.writeDate}</span>
    </div>
  );
};

export default PostItemInfo;
