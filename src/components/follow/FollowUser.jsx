import styles from "./Follow.module.css";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { updatePushData, getId } from "../../common";
import { Link } from "react-router-dom";

const FollowUser = ({ follwUser, user }) => {
  const [followUserImg, setFollowUserImg] = useState();
  const currentUserInfo = useSelector((state) => state.user.currentUserInfo);

  const getProfiles = async () => {
    const profileRef = ref(storage, `images/${follwUser.profile}`);
    const url = await getDownloadURL(profileRef);
    setFollowUserImg(url);
  };

  useEffect(() => {
    getProfiles();
  }, [followUserImg]);

  //내 follow 목록쪽 Follow 함수
  const unfollow = async () => {
    try {
      await updatePushData(
        "userList",
        currentUserInfo.uid,
        "following",
        follwUser.uid,
        false
      );
      await updatePushData(
        "userList",
        follwUser.uid,
        "follower",
        currentUserInfo.uid,
        false
      );
      window.location.reload("/user");
    } catch (e) {}
  };

  const follow = async () => {
    const followNotice = {
      nid: getId(),
      text: `${currentUserInfo.name}님이 회원님을 팔로우 하였습니다.`,
    };
    try {
      await updatePushData(
        "userList",
        currentUserInfo.uid,
        "following",
        follwUser.uid,
        !currentUserInfo.following.includes(follwUser.uid)
      );
      await updatePushData(
        "userList",
        follwUser.uid,
        "follower",
        currentUserInfo.uid,
        !follwUser.follower.includes(currentUserInfo.uid)
      );
      if (!currentUserInfo.following.includes(follwUser?.uid)) {
        updatePushData("userList", follwUser.uid, "notice", followNotice, true);
      }
      window.location.reload("/user");
    } catch (e) {}
  };
  return (
    <li className={styles.follow_user_list}>
      <div className={styles.follow_user}>
        <div className={styles.follow_user_profile}>
          <Link to={`/user/${follwUser.uid}`}>
            <img
              src={followUserImg}
              alt="preview-img"
              width="100%"
              height="100%"
            />
          </Link>
        </div>
        <div className={styles.follow_user_data_box}>
          <Link to={`/user/${follwUser.uid}`}>
            <p className={styles.follow_user_data}>{follwUser.name}</p>
          </Link>
          <p className={styles.follow_user_data}>{follwUser.introduction}</p>
        </div>
      </div>
      <div className={styles.title_box}>
        {user.uid === currentUserInfo.uid && (
          <button className={styles.unfollow_btn} onClick={unfollow}>
            팔로우 취소
          </button>
        )}

        {user.uid !== currentUserInfo.uid &&
          !currentUserInfo.following?.includes(follwUser.uid) &&
          follwUser.uid !== currentUserInfo.uid && (
            <button className={styles.follow_btn} onClick={follow}>
              팔로우
            </button>
          )}
        {user.uid !== currentUserInfo.uid &&
          currentUserInfo.following?.includes(follwUser.uid) && (
            <button className={styles.unfollow_btn} onClick={follow}>
              팔로우 취소
            </button>
          )}
        <h3 className={styles.title}>travel</h3>
      </div>
    </li>
  );
};

export default FollowUser;
