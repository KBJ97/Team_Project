import styles from "./Search.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { updatePushData } from "../../common";
import { useNavigate } from "react-router-dom";
import { REMOVE_RECENT_SEARCH, ADD_RECENT_SEARCH } from "../../modules/user";
import { SET_CURRENT_SEARCH, SET_SEARCH_LAST_VISIBLE } from "../../modules/search";
import { TOGGLE_SEARCH_MODAL } from "../../modules/modal";

const SearchLog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserInfo = useSelector((state) => state.user.currentUserInfo);
  const recentSearchs = currentUserInfo.recentSearchs ? [...currentUserInfo.recentSearchs].reverse() : null;
  const removeRecentSearchHandler = async (content) => {
    try {
      updatePushData("userList", currentUserInfo.uid, "recentSearchs", content, false);
      dispatch(REMOVE_RECENT_SEARCH(content));
    } catch (e) {
      console.log(e.message);
    }
  };
  const searchHandler = (content) => {
    try {
      if (currentUserInfo.recentSearchs.includes(content)) {
        updatePushData("userList", currentUserInfo.uid, "recentSearchs", content, false);
        dispatch(REMOVE_RECENT_SEARCH(content));
      }
      updatePushData("userList", currentUserInfo.uid, "recentSearchs", content, true);
      dispatch(SET_CURRENT_SEARCH(content));
      dispatch(ADD_RECENT_SEARCH(content));
      dispatch(SET_SEARCH_LAST_VISIBLE(null))
      dispatch(TOGGLE_SEARCH_MODAL());
      navigate("/search");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={styles.search_log}>
      <h3 className={styles.recent_search}>최근 검색어</h3>
      {recentSearchs &&
        recentSearchs.map((content) => {
          return (
            <div key={currentUserInfo.uid + content} className={styles.search_content_wrap}>
              <p className={styles.search_content} onClick={()=>searchHandler(content)}>
                {content}
              </p>
              <button className={styles.remove_btn} onClick={() => removeRecentSearchHandler(content)}>
                <span>x</span>
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default SearchLog;
