import styles from "./PostingModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { ADD_TAG, DELETE_TAG } from "../../modules/hash";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

const HashTag = () => {
  //해쉬태그 저장 state
  const [tagItem, setTagItem] = useState("");

  //dispatch
  const dispatch = useDispatch();
  //해쉬태그 리듀서에서 가져온 HashList[]
  const HashList = useSelector((state) => state.hash.HashList);

  //해쉬태그 OnChange함수
  const valueOnChange = (e) => {
    setTagItem(e.target.value);
  };
  //해쉬태그 함수
  const addTag = () => {
    if (tagItem.trim() !== "") {
      dispatch(ADD_TAG(tagItem.trim())); //작성한 해쉬태그 HashList에 저장될 리듀서 함수
      setTagItem(""); //함수 실행후 인풋 빈값으로
    }
  };

  //해쉬태그 조건 함수
  const onKeyPress = (e) => {
    //Enter key를 치면 함수 실행
    if (
      (e.target.value.length !== 0 && e.code === "Space") ||
      e.key === "Enter"
    ) {
      addTag();
    }
  };

  //해쉬태그 삭제 함수
  const deleteTagItem = (index) => {
    const deleteItem = HashList.filter((idx) => idx !== index);
    dispatch(DELETE_TAG(deleteItem)); //해쉬태그 삭제 리듀서 함수 함수
  };
  //해쉬태그 출력 map
  const hashTag = HashList.map((tagItem, index) => {
    return (
      <div
        key={index}
        className={styles.hash}
        onClick={() => deleteTagItem(tagItem)}
      >
        <span className={styles.tag}>{tagItem}</span>
        <AddCircleSharpIcon
          onClick={() => deleteTagItem(tagItem)}
          className={styles.delete_font}
          fontSize={"small"}
        />
      </div>
    );
  });

  return (
    <>
      <div className={styles.hash_box}>{hashTag}</div>
      <input
        type="text"
        placeholder="해시태그"
        onChange={valueOnChange}
        className={styles.hash_input}
        value={tagItem}
        onKeyPress={onKeyPress}
      />
    </>
  );
};

export default HashTag;
