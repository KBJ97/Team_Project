import styles from "./Follow.module.css";
import { getqueryData } from "../../common";
import { useState, useEffect } from "react";
import FollowUser from "./FollowUser";

const Follow = ({ user }) => {
  const [follwUser, setFollwUserUser] = useState();

  useEffect(() => {
    getqueryData("userList", "uid", "in", user?.following, setFollwUserUser);
  }, [user]);
  return (
    <div className={styles.follw_wrap}>
      <ul className={styles.follw_list}>
        {follwUser &&
          follwUser.map((follwUser) => (
            <FollowUser follwUser={follwUser} key={follwUser.uid} user={user} />
          ))}
      </ul>
      {follwUser === undefined && (
        <div className={styles.follw_undefined}>
          <h1 className={styles.follw_title}>팔로우한 유저가 없습니다</h1>
        </div>
      )}
    </div>
  );
};

export default Follow;
