import * as React from "react";
import styles from "./LoginPage.module.css";

import Iconbutton from "@mui/material/Iconbutton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link } from "react-router-dom";
import snsimg from "../login/snsimg.jpg";
import { db } from "../../config/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getNowDate, getNowValue } from "../../common";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../modules/login";
import { Box, Modal, Typography } from "@mui/material";
import FindPassword from "../../components/modal/FindPassword";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const onChangeEmail = (e) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!e.target.value || emailRegex.test(e.target.value))
      setEmailError(false);
    else setEmailError(true);
    setEmail(e.target.value);
  };

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // 비밀번호 아이콘 작동
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const createUser = async (user) => {
    await setDoc(doc(db, "userList", user.uid), {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      phone: user.phoneNumber,
      profile: "default_profile.jpg",
      following: [],
      follower: [],
      myPosting: [],
      likedPosting: [],
      markedPosting: [],
      myComments: [],
      notice: [],
      recentSearchs: [],
      timestamp: getNowValue(),
      signUpDate: getNowDate(),
      introduction: "",
    });
  };

  const [userInfo, setUserInfo] = useState();
  const provider = new GoogleAuthProvider();

  const googleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // 로그인된 결과를 구글인증을 통해서 확인 > 토큰 발급
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // 로그인된 결과 중에서 user를 통해서 관련 정보를 가져올수 있다
        const user = result.user;
        const checkDoc = async () => {
          const docRef = doc(db, "userList", user.uid);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            createUser(user);
          }
        };
        checkDoc();
        navigate("/");
        dispatch(LOGIN(user.uid));
        console.log("구글로그인성공!");
        window.location.reload("/");
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("구글로그인실패!");
      });
  };

  const dblogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("로그인성공!");
        navigate("/");
        dispatch(LOGIN(user.uid));
        console.log("로그인", user.uid);
        window.location.reload("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("로그인실패!");
        alert("아이디와 비밀번호를 확인해주세요");
      });
  };

  return (
    <div className={styles.login_full}>
      <div className={styles.login_img}>
        <img src={snsimg} />
      </div>

      <div className={styles.login_text}>
        <h1>로그인</h1>
        <div className={styles.textsm}>
          서비스 시작을 위해 로그인을 해주세요
        </div>
        <br />
        <form>
          <div className={styles.textform}>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-email">email</InputLabel>
              <Input
                id="standard-email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={onChangeEmail}
              />
              {emailError && (
                <div
                  className="invalid-input"
                  style={{ fontSize: "11px", color: "#D73E3E" }}
                >
                  이메일 주소를 확인해주세요.
                </div>
              )}
            </FormControl>
            <br />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-password">Password</InputLabel>
              <Input
                id="standard-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <Iconbutton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </Iconbutton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <br />
            <div className={styles.textbtnW}>
              <FindPassword />
            </div>
            <br />
          </div>
          <br />
          <button className={styles.simplebtn} onClick={dblogin}>
            로그인
          </button>
          <br />
          <span style={{ fontSize: "12px", margin: "7px" }}> or </span> <br />
          <button className={styles.simplebtn2} onClick={googleLogin}>
            구글 계정으로 계속하기
          </button>
          <br />
          <div className={styles.textm}>
            계정이 없으시다면
            <span>
              <Link
                to="/register"
                className="text0"
                style={{ fontWeight: "bold" }}
              >
                <u>회원가입</u>
              </Link>
            </span>
            을 해주세요
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
