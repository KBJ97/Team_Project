import styles from './MainButton.module.css'
const MainButton = (props) => {
  return <button className={`${props.className} ${styles.button}`} onClick={props.onClick}>{props.children}</button>;
};

export default MainButton;
