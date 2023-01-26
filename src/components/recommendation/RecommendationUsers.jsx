import RecommendationUser from "./RecommendationUser";
import styles from "./RecommendationUsers.module.css";
import { useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const RecommendationUsers = () => {
  const [userList, setUserList] = useState(null);
  const currentUserInfo = useSelector((state) => state.user.currentUserInfo);

  //추천 유저 목록 불러오기
  const getRecommendedUser = async () => {
    if (currentUserInfo && currentUserInfo.uid) {
      console.log("실행");
      const q = query(collection(db, "userList"), where("uid", "not-in", [...currentUserInfo.following, currentUserInfo.uid]), limit(5));
      const querySnapshot = await getDocs(q);
      const loadedData = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      setUserList(loadedData);
    }
  };
  useEffect(() => {
    getRecommendedUser();
  }, [currentUserInfo]);

  const content =
    userList && userList.length !== 0 ? (
      userList.map((user) => {
        return <RecommendationUser key={user.uid} user={user} />;
      })
    ) : (
      <div className={styles.container}> 추천 유저가 없습니다.</div>
    );
  return (
    <div>
      <h2 className={styles.title}>추천 유저 목록</h2>
      <div className={styles.recommend_wrap}>{content}</div>
    </div>
  );
};

export default RecommendationUsers;
