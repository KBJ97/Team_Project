import { useRef, useEffect, useState } from "react";
import styles from "./UserPage.module.css";
import { ref, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import { storage } from "../../config/firebase";
import { useDispatch } from "react-redux";
import {
  GET_CURRENT_USER_PROFILE,
  ADD_CURRENT_USER_PROFILE,
} from "../../modules/user";
import AddAPhotoOutlined from "@mui/icons-material/AddAPhotoOutlined";
import { useParams } from "react-router-dom";
import { getSingleData } from "../../common";

export default function ProfileImg() {
  const [user, setUser] = useState({});
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const currentUserInfo = useSelector((state) => state.user.currentUserInfo);
  const profile = useSelector((state) => state.user.profile);

  const params = useParams();
  useEffect(() => {
    getSingleData("userList", params.uid, setUser);
  }, []);

  //프로필 이미지 넣어주는 함수
  const setProfile = (props) => {
    const reader = new FileReader();
    reader.readAsDataURL(props);
    reader.onload = () => {
      dispatch(GET_CURRENT_USER_PROFILE(reader.result));
      dispatch(ADD_CURRENT_USER_PROFILE(reader.result));
    };
  };
  // 유저 프로필 불러오기
  const getProfile = async () => {
    const profileRef = ref(storage, `images/${currentUserInfo.profile}`);
    const url = await getDownloadURL(profileRef);
    dispatch(GET_CURRENT_USER_PROFILE(url));
  };
  useEffect(() => {
    //currentUserInfo.profile값이 변하면 함수 실행
    getProfile();
  }, [currentUserInfo.profile]);

  return (
    <div>
      <main className={styles.container}>
        <UserProfile profile={profile} />
        <div className={styles.file_box}>
          <label htmlFor="file" className={styles.label}>
            <AddAPhotoOutlined
              className={styles.icon}
              onClick={() => {
                fileInput.current.click();
              }}
            />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setProfile(e.target.files[0]);
            }}
            style={{ display: "none" }}
            ref={fileInput}
          />
        </div>
      </main>
    </div>
  );
}

export function UserProfile({ profile }) {
  return (
    <div className={styles.preview}>
      <img src={profile} alt="preview-img" width="100%" height="100%" />
    </div>
  );
}
