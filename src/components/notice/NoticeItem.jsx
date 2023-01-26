import { updatePushData } from "../../common";
import styles from "./NoticeItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_NOTICE } from "../../modules/user";


const NoticeItem = (props) => {
  const dispatch = useDispatch();
  const currentUserInfo = useSelector(state => state.user.currentUserInfo);
  const deleteNoticeHandler = () => {
    try {
      updatePushData("userList", currentUserInfo.uid, "notice", props.notice, false)
      dispatch(REMOVE_NOTICE(props.notice.nid))
    } catch (e) { 
      console.log(e.message)
    }
  }
  return (
    <div className={styles.container}>
      <span>{props.notice.text}</span>
      <span className={styles.delete_btn} onClick={deleteNoticeHandler}>x</span>
    </div>
  );
};

export default NoticeItem;
