import { NavLink } from "react-router-dom";
import styles from "./Myplan.module.css";
import PlanItemList from "../../components/Plan/PlanItemList";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";

const MyPlans = () => {
  const [profile, setProfile] = useState();
  const currentUserInfo = useSelector(state => state.user.currentUserInfo);
  const getProfile = async () => {
    const profileRef = ref(storage, `images/${currentUserInfo.profile}`);
    const url = await getDownloadURL(profileRef);
    setProfile(url);
  };
  useEffect(() => {
    if(!profile)
    getProfile()
  },[currentUserInfo])

  return (
    <div className={styles.myplan}>
      <div className={styles.myplantitlewrap}>
        <div>
          <img src={profile} className={styles.profileimg} />
        </div>
        <div className={styles.myplantitle}>
          <div className={styles.titletextplus}>
            <h3> 내 여행 계획 </h3>
          </div>
          <NavLink to="/makeplan">
            <div className={styles.addround}> + 여행 추가 </div>
          </NavLink>
        </div>
      </div>

      <hr />
      <div className={styles.myplanList}>
        <br />
        <PlanItemList />
        {/** 누르면 Plan으로 보이기 */}
      </div>
    </div>
  );
};
export default MyPlans;
