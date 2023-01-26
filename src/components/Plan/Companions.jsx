import { useEffect, useState } from "react";
import { getSingleData } from "../../common";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import styles from "./Companions.module.css";
import { Link } from "react-router-dom";
const Companions = (props) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const getProfile = async () => {
    const profileRef = ref(storage, `images/${user.profile}`);
    const url = await getDownloadURL(profileRef);
    setProfile(url);
  };
  useEffect(() => {
    if (!user) {
      getSingleData("userList", props.uid, setUser);
    }
  }, [props.uid]);
  useEffect(() => {
    if (user && !profile) {
      getProfile();
    }
  }, [user]);
  const content = user ? (
    <Link to={`/user/${user.uid}`}>
      <div className={styles.container}>
        <div>
          <img src={profile} className={styles.profile} />
        </div>
        <p className={styles.name}>{user.name}</p>
      </div>
    </Link>
  ) : null;
  return content;
};

export default Companions;
