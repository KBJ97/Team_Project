import PostItem from "../PostItem/PostItem";
import styles from "./MainPost.module.css";
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
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  START_MAIN_POST_PENDING,
  END_MAIN_POST_PENDING,
} from "../../modules/pending";
import PostingSkeleton from "../UI/PostingSkeleton";
import MainButton from "../UI/MainButton";

const MainPost = () => {
  const dispatch = useDispatch();
  const [postingList, setPostingList] = useState();
  const [lastVisible, setLastVisible] = useState();
  const mainPostPending = useSelector((state) => state.pending.mainPostPending);

  const getPostingList = async () => {
    try {
      if (!lastVisible) {
        dispatch(START_MAIN_POST_PENDING());
        const first = query(
          collection(db, "postingList"),
          where("isPublic", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(first);
        setLastVisible(querySnapshot.docs[querySnapshot?.docs?.length - 1]);
        const loadedData = querySnapshot.docs.map((doc) => doc.data());
        setPostingList(loadedData);
        dispatch(END_MAIN_POST_PENDING());
      } else {
        const next = query(
          collection(db, "postingList"),
          where("isPublic", "==", true),
          orderBy("timestamp", "desc"),
          startAfter(lastVisible),
          limit(5)
        );
        const querySnapshot = await getDocs(next);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        const loadedData = querySnapshot.docs.map((doc) => doc.data());
        setPostingList((prev) => {
          return [...prev, ...loadedData];
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getPostingList();
  }, []);

  //화면에 보여지는 postingList 삭제
  const removePostingListHandler = (pid) => {
    const filteredPostingList = postingList.filter((posting) => {
      return posting.pid !== pid;
    });
    setPostingList(filteredPostingList);
  };
  let content = Array(5)
    .fill()
    .map((el, idx) => <PostingSkeleton key={idx} />);
  if (postingList && postingList.length !== 0 && !mainPostPending) {
    content = postingList?.map((posting) => {
      return (
        <PostItem
          key={posting.pid}
          posting={posting}
          onRemovePosting={removePostingListHandler}
        />
      );
    });
  }

  return (
    <div className={styles.main}>
      {content}
      <button className={styles.more_btn} onClick={getPostingList}>
        더 보기
      </button>
    </div>
  );
};

export default MainPost;
