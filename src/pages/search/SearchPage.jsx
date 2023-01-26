import MainAside from "../../components/main/MainAside";
import SearchResult from "../../components/search/SearchResult";
import styles from './SearchPage.module.css'

const SearchPage = () => {
  return (
    <div className={styles.container}>
      <SearchResult />
      <MainAside/>
    </div>
  );
};

export default SearchPage;
