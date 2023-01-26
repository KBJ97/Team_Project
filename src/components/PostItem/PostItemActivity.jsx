import styles from "./PostItem.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { getId, updatePushData, getqueryData } from "../../common";
import useToggle from "../../hooks/useToggle";
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import ModifyPostingModal from "../modal/ModifyPostingModal";

const PostItemActivity = (props) => {
  //아이콘 변경을 위한 state
  //현재 로그인한 유저의 정보를 통해 '좋아요' 및 '마크' 여부 확인 후 초기값 설정
  const [isMarked, toggleMarked] = useToggle(false);
  const [isLiked, toggleLiked] = useToggle(false);
  const [open, setOpen] = useState(false);
  const [postingUser, setPostingUser] = useState();

  const handleOpen = () => setOpen(true);
  const [likeLength, setLikeLength] = useState(props.posting.like.length);
  useEffect(() => {
    if (
      props?.currentUserInfo?.markedPosting?.indexOf(props.posting.pid) !==
        -1 &&
      isMarked === false
    ) {
      toggleMarked();
    }
    if (
      props?.currentUserInfo?.likedPosting?.indexOf(props.posting.pid) !== -1 &&
      isLiked === false
    ) {
      toggleLiked();
    }
  }, [props.currentUserInfo]);
  const toggleLikeHandler = async () => {
    const likeNotice = {
      nid: getId(),
      text: `${props.currentUserInfo.name}님이 회원님의 글을 좋아합니다.`,
    };
    try {
      //현재 로그인한 user의 likedPosting 변경 (데이터베이스에 업데이트)
      //현재 포스팅을 좋아하는 유저리스트 변경(데이터베이스에 업데이트)
      //게시글 작성자에게 좋아요 알림
      updatePushData(
        "userList",
        props.currentUserInfo.uid,
        "likedPosting",
        props.posting.pid,
        !isLiked
      );
      updatePushData(
        "postingList",
        props.posting.pid,
        "like",
        props.currentUserInfo.uid,
        !isLiked
      );
      if (props.currentUserInfo.uid !== props.posting.writer && !isLiked) {
        updatePushData(
          "userList",
          props.posting.writer,
          "notice",
          likeNotice,
          true
        );
      }

      //보여지는 좋아요 갯수 변경
      if (isLiked) {
        setLikeLength((prev) => prev - 1);
      } else {
        setLikeLength((prev) => prev + 1);
      }

      //아이콘 변경
      toggleLiked();
    } catch (e) {
      console.log(e.message);
    }
  };

  const toggleMarkHandler = () => {
    try {
      //현재 로그인한 user의 markedPosting 변경(데이터베이스에 업데이트)
      updatePushData(
        "userList",
        props.currentUserInfo.uid,
        "markedPosting",
        props.posting.pid,
        !isMarked
      );
      //아이콘 변경
      toggleMarked();
    } catch (e) {
      console.log(e.message);
    }
  };

  const removeComment = async (cid) => {
    await deleteDoc(doc(db, "commentList", cid));
  };

  // 데이터베이스 내 posting 관련 요소 삭제
  const removePostingUserRef = async (element, elId) => {
    const q = query(
      collection(db, "userList"),
      where(element, "array-contains", elId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      updatePushData("userList", doc.id, element, elId, false);
    });
  };

  const removePostingHandler = async () => {
    try {
      //데이터베이스 내 postingList 삭제
      await deleteDoc(doc(db, "postingList", props.posting.pid));

      //데이터베이스 내 userList의 myPosting 배열 요소 삭제
      updatePushData(
        "userList",
        props.currentUserInfo.uid,
        "myPosting",
        props.posting.pid,
        false
      );

      //데이터베이스 내 commentList의 posting 삭제
      //데이터베이스 내 userList의 myComment 배열 요소 삭제
      const q = query(
        collection(db, "commentList"),
        where("posting", "==", props.posting.pid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        removeComment(doc.id);
        removePostingUserRef("myComments", doc.id);
      });

      //데이터베이스 내 userList의 markedPosting 배열 요소 삭제
      removePostingUserRef("markedPosting", props.posting.pid);
      //데이터베이스 내 userList의 likedPosting 배열 요소 삭제
      removePostingUserRef("likedPosting", props.posting.pid);

      //현재 포스팅 리스트 삭제(삭제 함수 props로 가져오기)
      props.onRemovePosting(props.posting.pid);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getqueryData = async () => {
    const q = query(
      collection(db, "postingList"),
      where("pid", "==", props.posting.pid)
    );
    const querySnapshot = await getDocs(q);
    const loadedData = querySnapshot.docs.map((doc) => doc.data());
    setPostingUser(loadedData);
  };
  useEffect(() => {
    getqueryData();
  }, []);
  return (
    <div className={styles.post_bottom}>
      <div>
        <button onClick={toggleLikeHandler}>
          {isLiked ? (
            <FavoriteIcon fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </button>
        <span>{likeLength}</span>
      </div>
      <div>
        <button onClick={props.onToggleComments}>
          <ChatBubbleOutlineIcon fontSize="small" />
        </button>
        <span>{props.commentsLength}</span>
      </div>
      <div>
        <button onClick={toggleMarkHandler}>
          {isMarked ? (
            <BookmarkIcon fontSize="small" />
          ) : (
            <BookmarkBorderIcon fontSize="small" />
          )}
        </button>
      </div>
      {props.currentUserInfo.uid === props.posting.writer && (
        <>
          <div>
            <button className={styles.edit_btn} onClick={handleOpen}>
              <EditIcon fontSize="small" />
            </button>
          </div>
          <div>
            <button
              className={styles.delete_btn}
              onClick={removePostingHandler}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </button>
          </div>
        </>
      )}
      {postingUser &&
        postingUser.map((postingUser) => (
          <ModifyPostingModal
            key={postingUser.pid}
            open={open}
            setOpen={setOpen}
            posting={props.posting}
            postingUser={postingUser}
            setPostingUser={setPostingUser}
          />
        ))}
    </div>
  );
};

export default PostItemActivity;
