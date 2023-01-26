import styles from "./NavBar.module.css";
import SideHeader from "../Header/SideHeader";
import Nav from "./Nav";

// 헤더 및 네브 바
const NavBar = () => {
  return (
    <>
      {/* 태블릿 및 pc환경에서 렌더되는 헤더 및 네브 바(좌측) */}
      <div className={styles.side_container}>
        <SideHeader header={styles.header} icon={styles.header_icon} />
        <Nav />
      </div>

      {/* 모바일 환경에서 렌더되는 네브 바(하단) */}
      <div className={styles.bottom_container}>
        <Nav />
      </div>
    </>
  );
};

export default NavBar;
