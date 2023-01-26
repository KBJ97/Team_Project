import { useEffect, useState } from "react";
import styles from "./PostItem.module.css";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
const PostItemProfile = (props) => {
  const [profile, setProfile] = useState();
  const profileRef = ref(storage, `images/${props.profile}`);
  const getProfile = async () => {
    const url = await getDownloadURL(profileRef);
    setProfile(url);
  };
  useEffect(() => {
    try {
      if (props.profile) {
        getProfile();
      }
    } catch (e) { 
      console.log(e.message)
    }
  }, [props.profile]);
  return (
    <div className={styles.profile_img}>
      <img src={profile} />
    </div>
  );
};

export default PostItemProfile;
