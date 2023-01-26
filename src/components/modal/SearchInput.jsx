import styles from "./SearchModal.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updatePushData } from "../../common";
import { REMOVE_RECENT_SEARCH, ADD_RECENT_SEARCH } from "../../modules/user";
import { SET_CURRENT_SEARCH } from "../../modules/search";
import { TOGGLE_SEARCH_MODAL } from "../../modules/modal";
const SearchInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserInfo = useSelector((state) => state.user.currentUserInfo);
  const [userInput, setUserInput] = useState("");
  const changeInputHandler = (e) => {
    setUserInput(e.target.value);
  };
  const searchHandler = (e) => {
    e.preventDefault();
    if (userInput.trim().length > 0) {
      try {
        if (currentUserInfo.recentSearchs.includes(userInput)) { 
          updatePushData("userList", currentUserInfo.uid, "recentSearchs", userInput, false);
          dispatch(REMOVE_RECENT_SEARCH(userInput))
        }
        updatePushData("userList", currentUserInfo.uid, "recentSearchs", userInput, true);
        dispatch(SET_CURRENT_SEARCH(userInput));
        dispatch(ADD_RECENT_SEARCH(userInput));
        dispatch(TOGGLE_SEARCH_MODAL());
        navigate("/search");
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  return (
    <form className={styles.search_form} onSubmit={searchHandler}>
      <div className={styles.search_input_wrap}>
        <input onChange={changeInputHandler} value={userInput} placeholder="검색할 내용을 입력하세요"></input>
        <button className={styles.search_btn}>
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
