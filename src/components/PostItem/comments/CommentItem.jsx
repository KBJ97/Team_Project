import { useEffect, useState } from "react";
import { getSingleData } from "../../../common";
import { ref, getDownloadURL } from "firebase/storage";
import { getDocs, where, deleteDoc, doc, collection, query, updateDoc } from "firebase/firestore";
import { updatePushData } from "../../../common";
import { storage, db } from "../../../config/firebase";
import styles from "./PostItemComments.module.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import useToggle from "../../../hooks/useToggle";
const CommentItem = (props) => {
  const [commentWriterInfo, setCommentWriterInfo] = useState({});
  const [profile, setProfile] = useState(null);
  const [editorIsVisible, toggleEditHandler] = useToggle(false);
  const [enteredComment, setEnteredComment] = useState(props.comment.text);

  //프로필 스토리지에서 불러오기
  const getProfile = async () => {
    const profileRef = ref(storage, `images/${commentWriterInfo.profile}`);
    const url = await getDownloadURL(profileRef);
    setProfile(url);
  };

  //코멘트 작성자 데이터 불러오기
  useEffect(() => {
    getSingleData("userList", props.comment.writer, setCommentWriterInfo);
  }, []);
  useEffect(() => {
    if (commentWriterInfo.profile) {
      getProfile();
    }
  }, [commentWriterInfo.profile]);

  //데이터베이스 내 해당 comment 관련 요소 제거
  const removeCommentsElement = async (collectionId, docId) => {
    const q = query(collection(db, collectionId), where(docId, "array-contains", props.comment.cid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      updatePushData(collectionId, doc.id, docId, props.comment.cid, false);
    });
  };

  const removeCommentHandler = async () => {
    try {
      //데이터베이스 내 commentList 제거
      await deleteDoc(doc(db, "commentList", props.comment.cid));

      //데이터베이스 내 해당 posting의 comments 요소 제거
      removeCommentsElement("postingList", "comments");

      //데이터베이스 내 usreList의 myComments 요소 제거
      removeCommentsElement("userList", "myComments");

      //화면에 보여지는 댓글 제거 및 댓글 수 감소
      props.removeCommentList(props.comment.cid);
    } catch (e) {
      console.log(e.message);
    }
  };

  const changeCommentHandler = (e) => {
    setEnteredComment(e.target.value);
  };
  const updateComment = async () => { 
    const commentRef = doc(db, "commentList", props.comment.cid);
    await updateDoc(commentRef, {
      text : enteredComment
    });
    
  }

  const editCommentHandler = (e) => {
    e.preventDefault();
    if (enteredComment.trim() !== "") { 
      //데이터베이스 내 commentList의 text 수정
      updateComment();

      //화면에 보여지는 댓글 수정
      props.editCommentList(props.comment.cid, enteredComment)
      toggleEditHandler();
    }
  };

  let content = <p className={styles.comment_text}>{props.comment.text}</p>;
  if (editorIsVisible)
    content = (
        <form className={styles.comment_form} onSubmit={editCommentHandler}>
          <div>
            <input type="text" value={enteredComment} onChange={changeCommentHandler} />
            <button>수정</button>
          </div>
        </form>
    );

  return (
    <div className={styles.comment_item}>
      <div className={styles.comment_profile_wrap}>
        <img src={profile} />
      </div>
      <div className={styles.comment_content_wrap}>
        <div className={styles.comment_writer_info}>
          <span className={styles.comment_writer_name}>{commentWriterInfo.name}</span>
          <span className={styles.comment_date}>{props.comment.writeDate}</span>
          {props.comment.writer === props.currentUserInfo.uid && (
            <div>
              <button className={styles.edit_btn} onClick={toggleEditHandler}>
                <EditIcon fontSize="small" />
              </button>
              <button className={styles.delete_btn} onClick={removeCommentHandler}>
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </button>
            </div>
          )}
        </div>
        {content}
      </div>
    </div>
  );
};

export default CommentItem;
