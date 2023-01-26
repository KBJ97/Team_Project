import styles from "./Follower.module.css";
import { getqueryData } from "../../common";
import { useState, useEffect } from "react";
import FollowerUser from "./FollowerUser";

const Follower = ({ user }) => {
  const [followerUserData, setFollowerUserData] = useState();

  useEffect(() => {
    getqueryData("userList", "uid", "in", user?.follower, setFollowerUserData);
  }, [user]); //유저리스트에 uid중에 현제 페이지에 해당하는 사람의 follower목록에 있는사람 데이터를 담는다
  //user = 현제 페이지에 해당하는 그사람 정보가 담겨있음
  return (
    <div className={styles.follw_wraps}>
      <div className={styles.follw_wrap}>
        <ul className={styles.follw_list}>
          {followerUserData &&
            followerUserData.map((follower) => (
              <FollowerUser
                follower={follower}
                key={follower.uid}
                user={user}
              />
            ))}
        </ul>
        {followerUserData === undefined && (
          <div className={styles.follwer_undefined}>
            <h1 className={styles.follwer_title}>팔로워 유저가 없습니다</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Follower;
