import { useState, useEffect } from "react";
import styles from "./PostItemComments.module.css";
import { addData, getId, getNowDate, getNowValue, updatePushData } from "../../../common";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";

const CommentForm = (props) => {
  //댓글 input 양방향 바인딩
  const [commentInput, setCommentInput] = useState("");
  const [profile, setProfile] = useState(null);
  const changeCommentHandler = (e) => {
    setCommentInput(e.target.value);
  };

  //현재 유저 프로필 불러오기
  const getProfile = async () => {
    const profileRef = ref(storage, `images/${props.currentUserInfo.profile}`);
    const url = await getDownloadURL(profileRef);
    setProfile(url);
  };
  useEffect(() => {
    getProfile();
  }, [props.currentUserInfo.profile]);

  //댓글 추가 함수
  const addCommentHandler = async (e) => {
    e.preventDefault();
    if (commentInput.trim().length > 0) {
      const addedComment = {
        cid: getId(),
        writer: props.currentUserInfo.uid,
        posting: props.pid,
        text: commentInput,
        writeDate: getNowDate(),
        timestamp: getNowValue(),
      };
      const commentNotice = { nid: getId(), text: `${props.currentUserInfo.name}님이 회원님의 글에 댓글을 달았습니다.` };
      try {
        //작성한 코멘트를 데이터베이스에 post
        addData("commentList", addedComment.cid, addedComment);

        //작성한 코멘트의 cid를 현재 유저의 데이터베이스에 update
        updatePushData("userList", props.currentUserInfo.uid, "myComments", addedComment.cid, true);

        //작성한 코멘트의 cid를 현재 포스팅의 데이터베이스에 update
        updatePushData("postingList", props.pid, "comments", addedComment.cid, true);

        //알림
        if (addedComment.writer !== props.writer) {
          updatePushData("userList", props.writer, "notice", commentNotice, true);
        }

        //사용자에게 보여지는 댓글 추가
        props.addCommentList(addedComment);

        //인풋창 초기화
        setCommentInput("");  
      } catch (e) {
        console.log(e.message);
      }
    }
    return;
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.profile_wrap}>
        <img src={profile} />
      </div>
      <form className={styles.comment_form} onSubmit={addCommentHandler}>
        <div>
          <input type="text" placeholder="댓글을 입력하세요" value={commentInput} onChange={changeCommentHandler} />
          <button>등록</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
