import { useSelector } from "react-redux";
import styles from "./Notice.module.css";
import NoticeItem from "./NoticeItem";
const Notice = () => {
  const noticeList = useSelector(state => state.user.currentUserInfo.notice)
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>알림</h2>
      {noticeList?.length !== 0 ? noticeList?.map((notice) => {
        return <NoticeItem notice={notice} key={notice.nid} />
      }) : <div className={styles.not_found}>알림이 없습니다.</div>} 
    </div>
  );
};

export default Notice;
