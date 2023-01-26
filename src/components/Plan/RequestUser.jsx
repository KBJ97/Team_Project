import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import styles from "./RequestUser.module.css";
import { Link } from "react-router-dom";
import { getId, updatePushData } from "../../common";

const RequestUser = (props) => {
  const [profile, setProfile] = useState();
  const getProfile = async () => {
    const profileRef = ref(storage, `images/${props.user.profile}`);
    const url = await getDownloadURL(profileRef);
    setProfile(url);
  };
  useEffect(() => {
    getProfile();
  }, [props.user]);
  const rejectRequestHandler = () => {
    const notice = { nid: getId(), text: `${props.planner.name}님이 [${props.plan.title}]의 동행을 거절했습니다.` };
    try {
      updatePushData("planList", props.plan.planId, "request", props.user.uid, false);
      updatePushData("userList", props.user.uid, "notice", notice, true);
      props.onRemoveRequest(props.user.uid, false);
      props.onToggleRequest();
    } catch (e) {
      console.log(e.message);
    }
  };
  const acceptRequestHandler = () => {
    const notice = { nid: getId(), text: `${props.planner.name}님이 [${props.plan.title}]의 동행을 수락했습니다.` };
    try {
      updatePushData("planList", props.plan.planId, "request", props.user.uid, false);
      updatePushData("planList", props.plan.planId, "companion", props.user.uid, true);
      updatePushData("userList", props.user.uid, "notice", notice, true);
      props.onRemoveRequest(props.user.uid, true);
      props.onToggleRequest();
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <li className={styles.container}>
      <div className={styles.user_wrap}>
        <div>
          <Link to={`/user/${props.user.uid}`}>
            <img src={profile} className={styles.profile} />
          </Link>
        </div>
        <div>
          <span className={styles.name}>
            <Link to={`/user/${props.user.uid}`}>{props.user.name}</Link>
          </span>
          <p className={styles.introduction}>{props.user.introduction}</p>
        </div>
      </div>
      <div>
        <button onClick={acceptRequestHandler} className={styles.btn}>수락</button>
        <button onClick={rejectRequestHandler} className={styles.btn}>거절</button>
      </div>
    </li>
  );
};

export default RequestUser;
