import styles from "./MyPagePost.module.css";
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
import { useSelector } from "react-redux";
import PostItem from "../../components/PostItem/PostItem";
import { useParams } from "react-router-dom";
import { getSingleData } from "../../common";

const MyPagePost = () => {
  const [postingList, setPostingList] = useState();
  const [lastVisible, setLastVisible] = useState();
  const [testUser, setTestUser] = useState();
  const params = useParams();
  //리덕스 user정보 가져오기
  const user = useSelector((state) => state.user.currentUserInfo);

  useEffect(() => {
    //다른사람 페이지 들어갔을때 그사람 userList 데이터 받아오는 함수
    getSingleData("userList", params.uid, setTestUser);
    setPostingList();
    setLastVisible();
  }, [params]);
  // 유저가 마크한 페이지
  // "in" 포스트 10개까지 가져옴
  const getPostingList = async () => {
    if (params.uid == user.uid) {
      if (!lastVisible) {
        const first = query(
          collection(db, "postingList"),
          where("pid", "in", testUser?.markedPosting),
          orderBy("timestamp", "desc"),
          limit(5)
        );
        const querySnapshot = await getDocs(first);
        setLastVisible(querySnapshot.docs[querySnapshot?.docs?.length - 1]);
        const loadedData = querySnapshot.docs.map((doc) => doc.data());
        setPostingList(loadedData);
      } else {
        const next = query(
          collection(db, "postingList"),
          where("pid", "in", testUser?.markedPosting),
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
    } else {
      // 마크된 게시물로 다른 유저 페이지 들어가면 해당 유저 게시글 페이지로 표시
      if (!lastVisible) {
        const first = query(
          collection(db, "postingList"),
          where("isPublic", "==", true),
          where("writer", "==", params.uid),
          orderBy("timestamp", "desc"),
          limit(5)
        );
        const querySnapshot = await getDocs(first);
        setLastVisible(querySnapshot.docs[querySnapshot?.docs?.length - 1]);
        const loadedData = querySnapshot.docs.map((doc) => doc.data());
        setPostingList(loadedData);
      } else {
        const next = query(
          collection(db, "postingList"),
          where("isPublic", "==", true),
          where("writer", "==", params.uid),
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
    }
  };
  useEffect(() => {
    getPostingList();
  }, [testUser]);

  //화면에 보여지는 postingList 삭제
  const removePostingListHandler = (pid) => {
    const filteredPostingList = postingList.filter((posting) => {
      return posting.pid !== pid;
    });
    setPostingList(filteredPostingList);
  };

  return (
    <div className={styles.main}>
      {testUser?.markedPosting.length === 0 ? (
        <div className={styles.not_post}>
          <h1 className={styles.not_post_title}>마크된 게시물이 없습니다</h1>
        </div>
      ) : (
        postingList?.map((posting) => {
          return (
            <PostItem
              key={posting.pid}
              posting={posting}
              onRemovePosting={removePostingListHandler}
            />
          );
        })
      )}
      {testUser?.markedPosting.length >= 5 && (
        <button onClick={getPostingList} className={styles.more_btn}>
          더 보기
        </button>
      )}
    </div>
  );
};

export default MyPagePost;
