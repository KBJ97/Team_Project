import { useEffect } from "react";
import FollowItem from "./FollowItem";
import styles from "./FollowList.module.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getqueryData } from "../../common";
const FollowList = () => {
  const currentUserInfo = useSelector(state => state.user.currentUserInfo);
  const [followUsers, setFollowUsers] = useState([]);
  //현재 유저 followList 불러오기
  useEffect(() => {
    if(currentUserInfo.uid)
    getqueryData("userList", "follower", "array-contains", currentUserInfo.uid, setFollowUsers)
  },[currentUserInfo])
  const content = followUsers && followUsers.length !== 0 ? followUsers.map((user) => { 
    return <FollowItem followUser={user} key={user.uid} />
  }) : <div>팔로우한 유저가 없습니다.</div>
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>팔로우 목록</h2>
      <div className={styles.follow_wrap}>
        {content}
      </div>
    </div>
  );
};

export default FollowList;
