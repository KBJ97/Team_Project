import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PostingModal from "../modal/PostingModal";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_SEARCH_MODAL } from "../../modules/modal";
import { getAuth, signOut } from "firebase/auth";
import { LOGOUT } from "../../modules/login";
import { storage } from "../../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";

const Nav = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  //네브바에 들어가는 리스트 모음
  const toggleSearchModalHandler = () => {
    dispatch(TOGGLE_SEARCH_MODAL());
  };

  const currentUserInfo = useSelector((state) => state.user.currentUserInfo);
  // 현재 유저 프로필 불러오기
  const getProfile = async () => {
    const profileRef = ref(storage, `images/${currentUserInfo.profile}`);
    const url = await getDownloadURL(profileRef);
    setProfile(url);
  };
  useEffect(() => {
    if (currentUserInfo.profile) getProfile();
  }, [currentUserInfo.profile]);

  // 로그아웃
  const onLogOutClick = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(LOGOUT());
        console.log("로그아웃성공");
      })
      .catch((error) => {
        console.log("로그아웃실패");
      });
  };

  return (
    <div className={styles.container}>
      <ul className={styles.nav}>
        {/* 클릭 시 유저 페이지로 이동*/}
        <li className={styles.item}>
          <Link to={"/user/" + currentUserInfo.uid}>
            <div className={styles.profile_wrap}>
              <img src={profile} />
            </div>
            <span className={styles.userName}>{currentUserInfo.name}</span>
          </Link>
        </li>

        {/* 클릭 시 홈 페이지로 이동 */}
        <li className={styles.item}>
          <Link to="/">
            <HomeIcon fontSize="string" color="blue" />

            <span>홈</span>
          </Link>
        </li>

        {/* 클릭 시 검색 모달 오픈 */}
        <li
          className={`${styles.item} ${styles.search}`}
          onClick={toggleSearchModalHandler}
        >
          <div>
            <SearchIcon fontSize="string" />
            <span>검색</span>
          </div>
        </li>

        {/* 클릭 시 게시글 작성 모달 오픈 */}

        <li className={styles.item} onClick={handleOpen}>
          <div>
            {/*props전달*/}
            <AddBoxOutlinedIcon fontSize="string" />
            <span>글 작성</span>
          </div>
        </li>
        <PostingModal open={open} setOpen={setOpen} />

        <li className={styles.item}>
          <Link to="/myplans">
            <LoyaltyIcon fontSize="string" />
            <span>여행 계획 수립</span>
          </Link>
        </li>

        {/* 클릭 시 로그아웃*/}

        <li className={`${styles.item} ${styles.logout}`}>
          <Link to="/" onClick={onLogOutClick}>
            <LogoutOutlinedIcon fontSize="string" />
            <span>로그 아웃</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
