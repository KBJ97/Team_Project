import styles from "./TopHeader.module.css";
import LuggageIcon from '@mui/icons-material/Luggage';import { Link } from "react-router-dom";
import SearchInput from "../modal/SearchInput";
//모바일 환경에서의 헤더 + 검색 기능
const TopHeader = () => {
  return (
    <header className={styles.container}>
      <Link to="/">
        <div className={styles.title}>
          <LuggageIcon  style={{color:"#35a5a6"}} sx={{ fontSize: 30 }} />
          <h1>travel</h1>
        </div>
      </Link>
      <div className={styles.search_wrap}>
        <SearchInput />
      </div>
    </header>
  );
};

export default TopHeader;
