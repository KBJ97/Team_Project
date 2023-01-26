import styles from './PostItem.module.css'
const PostItemImg = (props) => {
  return <div className={styles.thumbnail_wrap}>
    {props.imgList.map((img, idx) => {
      return <img src={img} key={idx} onClick={() => props.onChangeImg(idx)} className={props.imgIdx === idx ? styles.active : ""} />
    })}
  </div>;
};

export default PostItemImg;
