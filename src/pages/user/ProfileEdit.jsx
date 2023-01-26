import styles from "./ProfileEdit.module.css";
import ProfileImg from "./ProfileImg";
import { db, storage } from "../../config/firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { getId } from "../../common";

const ProfileEdit = (props) => {
  const [name, setName] = useState("");
  const [introduce, setIntroduce] = useState("");
  const user = useSelector((state) => state.login.currentUser);
  const handleClose = () => props.setOpen(false);
  const currentUserInfo = useSelector((state) => state.user.currentUserInfo);
  const profileImg = useSelector((state) => state.user.profileImg);
  //개시물 갯수 where절로 ref 설정 count 파이어베이스 문장 포스팅 리스트에서 바로 아이디 비교후
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeIntroduce = (e) => {
    setIntroduce(e.target.value);
  };

  const getSingleData = async () => {
    const docRef = doc(db, "userList", user);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setName(docSnap.data().name);
      setIntroduce(docSnap.data().introduction);
    }
  };

  useEffect(() => {
    //getSingleData("userList", user, setName);
    getSingleData();
  }, []);

  const updateProfile = () => {
    if (profileImg.length === 1) {
      try {
        //변경할 프로필 이미지가 담겨있을경우
        const randomNum = getId();
        const imageRef = ref(storage, `images/${randomNum}`);
        uploadString(imageRef, profileImg[0], "data_url");
        //스토리지에 변경할 이미지가 들어간뒤
        return randomNum;
      } catch (e) {
        alert("프로필 업데이트 실패");
      }
    } else {
      //프로필 변경없이 이름이나 소개글만 변경할 경우
      return currentUserInfo.profile;
    }
  };

  //프로필 업데이트 함수
  const modify = async (e) => {
    try {
      e.preventDefault();
      const washingtonRef = doc(db, "userList", user);
      await updateDoc(washingtonRef, {
        name: name,
        introduction: introduce,
        profile: updateProfile(),
      });
      setName("");
      setIntroduce("");
      alert("프로필이 수정되었습니다");
      window.location.reload("/user"); //새로고침
    } catch (e) {}
  };
  return (
    <div>
      <Modal
        onClose={handleClose}
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form className={styles.edit_profile}>
          <ProfileImg />
          <div className={styles.edit_memo}>
            <div className={styles.edit_text}>
              <label>이름</label>
              <input
                value={name}
                type="text"
                className={styles.edit_input}
                onChange={onChangeName}
              />
            </div>
          </div>
          <div className={styles.edit_memo}>
            <div className={styles.edit_text}>
              <label>소개</label>
              <textarea
                value={introduce}
                className={styles.edit_textarea}
                onChange={onChangeIntroduce}
              />
            </div>
          </div>
          <button className={styles.edit_button} onClick={modify}>
            제출
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ProfileEdit;
