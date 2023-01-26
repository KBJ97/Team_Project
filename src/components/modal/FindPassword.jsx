import { FormControl, Input, InputLabel } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import styles from "./FindPassword.module.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";



const FindPassword = () => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
    setModal(!modal);
    if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }
    }

    const [email, setEmail] = useState();
    const onChangeEmail = (e)=>{
        setEmail(e.target.value);
    }
    

    const findpwemail = () => {
        const auth = getAuth();
        auth.languageCode = 'it';
        sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    alert("이메일이 전송되었습니다. ")
    setModal(!modal);
  })
  .catch((error) => {
    alert("이메일을 확인해주세요")
  });

    }




    return ( <div><br/> 
    {
        !modal ? <button type="button" onClick={toggleModal} className={styles.btnmodal}>
        비밀번호 찾기
      </button>  :  <button type="button" onClick={toggleModal} className={styles.btnmodal}>
        닫기
      </button>
    }



      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className={styles.overlay}></div>
          <div className={styles.modalcontent} ><br />
            <h3>비밀번호 찾기를 위해서 이메일을 입력해주세요 </h3>

            <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
              <InputLabel htmlFor="standard-email">email</InputLabel>
              <Input
                id="standard-email"
                type="email"
                placeholder="Email Address"
                value={email || ""}
                className={styles.textbox}
                onChange={onChangeEmail}
              />
            </FormControl>

            <p> 입력하신 이메일로 비밀번호 재설정 이메일이 전송됩니다. </p>
            <button type="button" className={styles.smbtn} onClick={findpwemail}>
              찾기
            </button>
            <button className={styles.smbtn} onClick={toggleModal}>
              닫기
            </button>
          </div>
        </div>
      )}
      


    </div> );
}
 
export default FindPassword;