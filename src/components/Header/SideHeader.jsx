import styles from "./SideHeader.module.css";
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";
import { Link } from "react-router-dom";
import LuggageIcon from '@mui/icons-material/Luggage';

const SideHeader = (props) => {
  //테블릿 및 pc환경에서의 헤더
  return (
    <header className={styles.header}>
     <div className={styles.headericon}> <LuggageIcon style={{color:"#35a5a6"}} sx={{ fontSize: 70 }}/>  </div>
      <div className={styles.headertitle}>
      <Link to="/">
        <h1 className={`${styles.title} ${props.header}`}>travel</h1>
        <div className={props.icon}>
          <Diversity2OutlinedIcon fontSize="large" />
        </div>
      </Link>
      </div>
    </header>
  );
};

export default SideHeader;
