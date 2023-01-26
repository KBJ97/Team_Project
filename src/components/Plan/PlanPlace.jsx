import styles from "./PlanPlace.module.css";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';

const PlanPlace = (props) => {
  const changeCenterHandler = (position) => { 
    props.onChangeCenter(position)
  }
  return (
    <div className={styles.day_container}>
      <h3> <b>Day {props.date}</b></h3>
      <ul>
        {props.plan.map((place) => {
          return (
            <li className={styles.list} onClick={() => changeCenterHandler(place.position)} key={place.id}>
              <div className={styles.place}>
                <div  className={styles.placeiconline}>
                <div className={styles.placeicon}><AlarmOnIcon /> </div>
                <p>{place.time}</p></div>
                </div>

              <div className={styles.placeaddressline}>
              <p><b>{place.place}</b></p>
              <p className={styles.address}>{place.address}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlanPlace;
