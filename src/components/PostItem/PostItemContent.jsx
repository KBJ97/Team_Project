import styles from "./PostItem.module.css";
import { storage } from "../../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";
import PostItemImg from "./PostItemImg";
import { useSelector, useDispatch } from "react-redux";
import { updatePushData } from "../../common";
import { Link, useNavigate } from "react-router-dom";
import { REMOVE_RECENT_SEARCH, ADD_RECENT_SEARCH } from "../../modules/user";
import {
  SET_CURRENT_SEARCH,
  SET_SEARCH_LAST_VISIBLE,
} from "../../modules/search";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
const PostItemContent = (props) => {
  const { images, hashtags, text } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserInfo = useSelector((state) => state.user.currentUserInfo);
  const [imgRefList, setImgRefList] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [imgIdx, setImgIdx] = useState(0);
  const [imgStyle, setImgStyle] = useState({});
  const [toggle, setToggle] = useState(false);
  const changeImgHandler = (idx) => {
    setImgIdx(idx);
    if (idx !== imgIdx) setImgStyle({ transition: "none" });
  };
  const getImgUrl = async (idx) => {
    return await getDownloadURL(imgRefList[idx]);
  };
  const getImgList = () => {
    imgRefList.map((imgRef, idx) => {
      getImgUrl(idx).then((url) => {
        setImgList((prev) => {
          return [...prev, url];
        });
      });
    });
  };

  useEffect(() => {
    if (images && images.length > 0) {
      images.map((img) => {
        setImgRefList((prev) => {
          return [...prev, ref(storage, `images/${img}`)];
        });
      });
    }
  }, []);

  useEffect(() => {
    if (imgRefList && imgRefList.length > 0) {
      getImgList();
    }
  }, [imgRefList]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImgStyle({
        opacity: "1",
      });
    });
    return () => {
      clearTimeout(timer);
    };
  }, [imgIdx]);

  const searchHandler = (content) => {
    try {
      if (currentUserInfo.recentSearchs.includes(content)) {
        updatePushData(
          "userList",
          currentUserInfo.uid,
          "recentSearchs",
          content,
          false
        );
        dispatch(REMOVE_RECENT_SEARCH(content));
      }
      updatePushData(
        "userList",
        currentUserInfo.uid,
        "recentSearchs",
        content,
        true
      );
      dispatch(SET_CURRENT_SEARCH(content));
      dispatch(ADD_RECENT_SEARCH(content));
      dispatch(SET_SEARCH_LAST_VISIBLE(null));
      navigate("/search");
    } catch (e) {
      console.log(e.message);
    }
  };
  const onClick = () => {
    setToggle(!toggle);
  };
  return (
    <div className={styles.post_contents}>
      <div>
        <div className={styles.post_contents_images_wrap}>
          {imgList && imgList.length > 0 && (
            <img
              className={styles.post_contents_images}
              src={imgList[imgIdx]}
              style={imgStyle}
            />
          )}
        </div>
        {imgList && imgList.length > 1 && (
          <PostItemImg
            imgList={imgList}
            imgIdx={imgIdx}
            onChangeImg={changeImgHandler}
          />
        )}
      </div>
      <div className={styles.post_contents_text}>
        {text.length > 200
          ? toggle === false
            ? text.slice(0, 300)
            : text.slice(0)
          : text}

        {text.length > 200 ? (
          toggle === false ? (
            <button onClick={onClick} className={styles.toggle_btn}>
              ... 더 보기
            </button>
          ) : (
            <button onClick={onClick} className={styles.toggle_btn}>
              ...닫기
            </button>
          )
        ) : (
          ""
        )}
      </div>
      {props.isPlan && (
        <div>
          <Link to={`/plan/${props.planId}`} className={styles.plan_text}>
            <span>같이 여행하기</span>
            <span>
              <ArrowRightOutlinedIcon />
            </span>
          </Link>
        </div>
      )}
      <div className={styles.hashtags_wrap}>
        {hashtags &&
          hashtags.map((tag, idx) => {
            return (
              <span
                className={styles.post_contents_hashtags}
                key={idx}
                onClick={() => searchHandler(tag)}
              >
                {tag}
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default PostItemContent;
