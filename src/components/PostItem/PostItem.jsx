import styles from "./PostItem.module.css";
import { useSelector } from "react-redux";
import PostItemProfile from "./PostItemProfile";
import PostItemInfo from "./PostItemInfo";
import PostItemContent from "./PostItemContent";
import PostItemActivity from "./PostItemActivity";
import PostItemComments from "./comments/PostItemComments";
import { useState, useEffect } from "react";
import { getqueryData, getSingleData } from "../../common";
import {
  query,
  collection,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import useToggle from "../../hooks/useToggle";
import { Link } from "react-router-dom";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

const PostItem = (props) => {
  const currentUserInfo = useSelector((state) => state.user.currentUserInfo);
  const [writerInfo, setWriterInfo] = useState("");
  const [commentList, setCommentList] = useState("");
  const [commentsLength, setCommentLength] = useState(
    props.posting?.comments.length
  );
  const [lastVisible, setLastVisible] = useState();
  // 댓글창 on/off
  const [isCommentsShown, toggleCommentsHandler] = useToggle(false);

  // 화면에 보여지는 댓글 및 댓글 수 추가
  const addCommentList = (addedcomment) => {
    setCommentList((prev) => {
      return [addedcomment, ...prev];
    });
    setCommentLength((prev) => prev + 1);
  };

  //화면에 보여지는 댓글 및 댓글 수 감소
  const removeCommentList = (cid) => {
    const filteredCommentList = commentList.filter((comment) => {
      return comment.cid !== cid;
    });
    setCommentList(filteredCommentList);
    setCommentLength((prev) => prev - 1);
  };

  //화면에 보여지는 댓글 수정
  const editCommentList = (cid, text) => {
    const editedCommentList = commentList.map((comment) => {
      if (comment.cid === cid) {
        return { ...comment, text: text };
      }
      return comment;
    });
    setCommentList(editedCommentList);
  };

  //해당 포스팅에 해당하는 코멘트 리스트 불러오기
  const getCommentList = async () => {
    if (!lastVisible) {
    const q = query(
      collection(db, "commentList"),
      where("posting", "==", props.posting.pid),
      orderBy("timestamp", "desc"),
      limit(5));
    const querySnapshot = await getDocs(q);
    setLastVisible(querySnapshot.docs[querySnapshot?.docs?.length - 1]);
    const loadedData = querySnapshot.docs.map((doc) => doc.data());
    setCommentList(loadedData);
  } else { 
    const q = query(
      collection(db, "commentList"),
      where("posting", "==", props.posting.pid),
      orderBy("timestamp", "desc"),
      startAfter(lastVisible), 
      limit(5));
    const querySnapshot = await getDocs(q);
    setLastVisible(querySnapshot.docs[querySnapshot?.docs?.length - 1]);
    const loadedData = querySnapshot.docs.map((doc) => doc.data());
    setCommentList((prev) => {
      return [...prev, ...loadedData];
    });
  }};

  useEffect(() => {
    try {
      //해당 포스팅의 작성자 정보 불러오기
      getSingleData("userList", props.posting.writer, setWriterInfo);

      //해당 포스팅에 해당하는 코멘트 리스트 불러오기
      getCommentList();
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  return (
    <div className={`${styles.post_container} ${props.className}`}>
      <Link to={"/user/" + writerInfo.uid}>
        <PostItemProfile profile={writerInfo.profile} />
      </Link>
      <div className={styles.post}>
        {/*클릭시 그사람 유아이디로*/}
        <PostItemInfo
          name={writerInfo.name}
          uid={writerInfo.uid}
          writeDate={props.posting.writeDate}
        />
        <PostItemContent
          images={props.posting.images}
          hashtags={props.posting.hashtags}
          text={props.posting.text}
          isPlan={props.posting.isPlan}
          planId={props.posting.planId}
        />
        <PostItemActivity
          posting={props.posting}
          currentUserInfo={currentUserInfo}
          commentsLength={commentsLength}
          onToggleComments={toggleCommentsHandler}
          onRemovePosting={props.onRemovePosting}
        />
        {isCommentsShown && (
          <PostItemComments
            commentList={commentList}
            currentUserInfo={currentUserInfo}
            pid={props.posting.pid}
            writer={props.posting.writer}
            addCommentList={addCommentList}
            removeCommentList={removeCommentList}
            editCommentList={editCommentList} />
            )}
          {/** 댓글 수 5개 이상일 때 더보기 버튼 보이게 */}
        {isCommentsShown && props.posting?.comments.length >=5 && (
          <button onClick={getCommentList} className={styles.post_comment_btn}>
            더 보기 +
          </button>
          )}
      </div>
    </div>
  );
};

export default PostItem;
