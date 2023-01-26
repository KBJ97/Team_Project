import styles from "./PostingSkeleton.module.css";
const PostingSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profile_wrap}>
        <div className={styles.profile}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.user_info}>
          <div className={styles.user_name}></div>
          <div className={styles.timestamp}></div>
        </div>
        <div className={styles.text}></div>
        <div className={styles.bottom}>
          <div className={styles.like}></div>
          <div className={styles.comment}></div>
          <div className={styles.mark}></div>
        </div>
      </div>
    </div>
  );
};

export default PostingSkeleton;
