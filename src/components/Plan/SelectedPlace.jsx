import styles from "./SelectedPlace.module.css";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_MARKED_PLACE } from "../../modules/plan";
const SelectedPlace = () => {
  const dispatch = useDispatch();
  const markedPlaces = useSelector((state) => state.plan.markedPlaces);
  const removePlaceHandler = (id) => {
    dispatch(REMOVE_MARKED_PLACE(id));
  };
  const content = markedPlaces.map((place) => {
    return (
      <div className={styles.selectedPlace}>
        <div className={styles.place_container} key={place.id}>
          <div className={styles.remove_btn_wrap}>
            <button onClick={() => removePlaceHandler(place.id)}>x</button>
          </div>
          <div className={styles.place_titlecontainer}>
            <div>
              <h3 className={styles.place_title}>{place.name}</h3>
            </div>
            <div className={styles.place_dic}>{place.address}</div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className={styles.pickplaceall}>
      <h3>내가 선택한 장소</h3>
      <p>
        <i> 검색으로 지역을 선택 한 후, 지도에 있는 장소를 클릭하면 장소를 추가 할 수있습니다. </i>
      </p>
      <div className={styles.selectcontent}>{content} </div>
    </div>
  );
};

export default SelectedPlace;
