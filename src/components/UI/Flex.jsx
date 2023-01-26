import styles from "./Flex.module.css";
const Flex = (props) => {
  return <div className={styles.flex}>{props.children}</div>;
};
//<Flex>내용</Flex> 으로 flex 적용시키는 UI 컴포넌트

export default Flex;
