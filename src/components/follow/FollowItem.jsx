import styles from "./FollowItem.module.css";
import { storage } from "../../config/firebase";
import { useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import { Link } from "react-router-dom";
const FollowItem = (props) => {
  const [profile, setProfile] = useState(null);
  //프로필 이미지 불러오기
  const getProfile = async () => {
    const profileRef = ref(storage, `images/${props.followUser.profile}`);
    const url = await getDownloadURL(profileRef);
    setProfile(url);
  };

  useEffect(() => {
    getProfile();
  }, [props]);
  return (
    <div className={styles.container}>
      <div className={styles.img_wrap}>
        <Link to={`/user/${props.followUser.uid}`}>
          <img src={profile} />
        </Link>
      </div>
      <div>
        <Link to={`/user/${props.followUser.uid}`}>{props.followUser.name}</Link>
      </div>
    </div>
  );
};

export default FollowItem;