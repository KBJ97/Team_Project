import styles from "./RecommendationUsers.module.css";
import { storage } from "../../config/firebase";
import { useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import { Link } from "react-router-dom";
const RecommendationUser = (props) => {
  const [profile, setProfile] = useState(null);

  //프로필 이미지 불러오기
  const getProfile = async () => {
    const profileRef = ref(storage, `images/${props.user.profile}`);
    const url = await getDownloadURL(profileRef);
    setProfile(url);
  };

  useEffect(() => {
    getProfile();
  }, [props]);
  return (
    <div className={styles.container}>
      <div className={styles.img_wrap}>
        <Link to={`/user/${props.user.uid}`}>
          <img src={profile} />
        </Link>
      </div>
      <div className={styles.user_info_wrap}>
        <Link to={`/user/${props.user.uid}`}>{props.user.name}</Link>
        <p className={styles.introduction}>{props.user.introduction}</p>
      </div>
    </div>
  );
};
 
export default RecommendationUser;