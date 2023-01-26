import styles from "./PostingModal.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { INITIAL_STATE_HASH, ADD_TAG } from "../../modules/hash";
import { INITIAL_STATE_IMG } from "../../modules/upload";
import HashTag from "./HashTag";
import Upload from "./Upload";
import UploadImg from "./UploadImg";
import "firebase/compat/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { storage } from "../../config/firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Dropdown from "./Dropdown";
import Emoticon from "./Emoticon";
import { getId, getNowValue, getNowDate } from "../../common";

//해쉬태그 삭제 확인

const ModifyPstingModal = (props) => {
  //posting-Text 저장 state
  const [text, setText] = useState(props.postingUser.text);
  const [hashTags, setHashTags] = useState([]);
  //업로드 이미지 저장 state
  const [imgs, setImgs] = useState();
  const [imgRefList, setImgRefList] = useState([]);
  const [imgLists, setImgLists] = useState([]);
  const [imgGetId, setImgGetId] = useState([]);
  //피드 공개 비공개
  const [show, setShow] = useState(true);
  //이모티콘 모달창
  const [icon, setIcon] = useState(false);
  //reducer dispatch
  const dispatch = useDispatch();
  //해쉬태그 redux
  const HashTagList = useSelector((state) => state.hash.HashList);
  const imgList = useSelector((state) => state.upload.ImgList);

  const getImgUrl = async (idx) => {
    return await getDownloadURL(imgRefList[idx]);
  };

  useEffect(() => {
    if (props.postingUser.images && props.postingUser.images.length > 0) {
      props.postingUser.images.map((img) => {
        setImgRefList((prev) => {
          return [...prev, ref(storage, `images/${img}`)];
        });
      });
    }
  }, []);

  const getImgList = () => {
    imgRefList.map((imgRef, idx) => {
      getImgUrl(idx).then((url) => {
        setImgLists((prev) => {
          return [...prev, url];
        });
      });
    });
  };

  useEffect(() => {
    setHashTags([...props.postingUser.hashtags]);
    hashTags.map((data) => dispatch(ADD_TAG(data)));

    if (props.open === true) {
      setImgGetId([...props.postingUser.images]);
      getImgList();
    }
  }, [props.open]);

  //모달창 Open,Close 함수
  const handleClose = () => {
    dispatch(INITIAL_STATE_HASH());
    setHashTags([]);
    dispatch(INITIAL_STATE_IMG());
    setImgLists([]);
    props.setOpen(false);
  };

  const contentsReplaceNewline = () => {
    return text.replaceAll("<br>", "\r\n");
  };

  const textOnChange = (e) => {
    setText(e.target.value);
  };

  //업데이트
  const updatePosting = () => {
    if (imgList.length > 0) {
      const img = imgGetId;
      for (let i = 0; i < imgList.length; i++) {
        const randomNum = getId(); //파일이름은 겹치지 않게 random으로
        const imageRef = ref(storage, `images/${randomNum}`);
        uploadString(imageRef, imgList[i], "data_url"); //data_url일때 초기 받아오면
        //uploadBytes(imageRef, imgList[i]);
        img.push(randomNum);
        //img.push(props.postingUser.images);
        //1.이미지 하나수정할때 있어야함
      }
      return img;
    } else if (imgLists.length === 0) {
      return imgList; // 수정할 이미지 삭제 이미지 추가 없을경우
    } else {
      return imgGetId; //props.postingUser.images; //이미지 수정없이 업데이트 할때
    }
  };
  const updatePushData = async () => {
    const docRef = doc(db, "postingList", props.posting.pid);
    if (true) {
      await updateDoc(docRef, {
        timestamp: getNowValue(),
        writeDate: getNowDate(),
        text: contentsReplaceNewline(),
        hashtags: HashTagList,
        isPublic: show,
        images: updatePosting(),
      });
    }
    handleClose();
    window.location.reload("/");
  };
  //이모티콘 모달창
  const clickIconModal = () => {
    setIcon(!icon);
  };

  return (
    <div>
      <Modal
        onClose={handleClose}
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.posting}>
          <div className={styles.nav}>
            <Upload />
            <p className={styles.title}>
              <span>새 개시물 만들기</span>
            </p>
            <p className={styles.delete}>
              <ClearIcon onClick={handleClose} className={styles.icon} />
            </p>
          </div>

          <img src={imgs} alt={imgs} width={"100%"} className={styles.image} />

          <div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={text}
              onChange={textOnChange}
              className={styles.posting_text}
            ></textarea>
            <HashTag hashTags={hashTags} />
          </div>
          <ul className={styles.upload_img}>
            <UploadImg
              imgs={imgs}
              setImgs={setImgs}
              imgLists={imgLists}
              setImgLists={setImgLists}
              imgGetId={imgGetId}
              setImgGetId={setImgGetId}
            />
          </ul>
          <div className={styles.bottom}>
            <button className={styles.emoticon_btn} onClick={clickIconModal}>
              😀
            </button>
            <div className={styles.posting_btn_box}>
              <button className={styles.posting_btn} onClick={updatePushData}>
                수정
              </button>
            </div>
            <Dropdown show={show} setShow={setShow} />
          </div>
          <Emoticon text={text} setText={setText} icon={icon} />
        </div>
      </Modal>
    </div>
  );
};

export default ModifyPstingModal;
