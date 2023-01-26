import styles from "./PostingModal.module.css";
import AddAPhotoOutlined from "@mui/icons-material/AddAPhotoOutlined";
import { ADD_IMG } from "../../modules/upload";
import { useDispatch } from "react-redux";

const Upload = () => {
  const dispatch = useDispatch();
  const handleChangeFile = (e) => {
    //업로드 데이터 담는 함수
    for (let i = 0; i < e.target.files.length; i++) {
      // 추가 업로드 하면 e.target.files.length 값은 초기화
      if (e.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onloadend = () => {
          const resultImage = reader.result;
          dispatch(ADD_IMG(resultImage));
        };
      }
    }
  };

  return (
    <div className={styles.filebox}>
      <label htmlFor="file" className={styles.label}>
        <AddAPhotoOutlined className={styles.icon} />
      </label>
      <input
        type="file"
        id="file"
        accept="image/jpg, image/jpeg, image/png, image/gif"
        multiple
        onChange={handleChangeFile}
      />
    </div>
  );
};

export default Upload;
