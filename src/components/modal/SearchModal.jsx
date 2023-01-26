import styles from "./SearchModal.module.css";
import SearchLog from "../search/SearchLog";
import SearchInput from "./SearchInput";
const SearchModal = () => {
  return (
    <div className={styles.search_modal}>
      <h2 className={styles.search_modal_header}>검색</h2>
      <SearchInput/>
      <SearchLog />
    </div>
  );
};

export default SearchModal;
