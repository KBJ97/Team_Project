import { useState } from "react";
import { useSelector } from "react-redux";
import { getId } from "../../common";
import style from "../Plan/PlanningOfDay.module.css";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const PlanningOfDay = (props) => {
  const [isHovering, setIsHovering] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState();
  const [selectedTime, setSelectedTime] = useState("08:00");
  const markedPlaces = useSelector((state) => state.plan.markedPlaces);
  const changeSelectedPlace = (e) => {
    setSelectedPlace(e.target.value);
  };
  const changeSelectedTime = (e) => {
    setSelectedTime(e.target.value);
  };
  const addPlanHandler = () => {
    if (selectedPlace && selectedTime) {
      const markedPlace = markedPlaces.find((place) => place.name === selectedPlace);
      const addedPlan = {
        id: getId(),
        whatDate: props.date,
        time: selectedTime,
        place: selectedPlace,
        address: markedPlace.address,
        position : markedPlace.position
      };
      props.onAddPlan(addedPlan);
    }
  };
  const removePlanHandler = (id) => {
    props.onRemovePlan(id);
  };
  const filteredPlan = props.plan
    .filter((plan) => plan.whatDate === props.date)
    .sort((a, b) => {
      const timeA = a.time;
      const timeB = b.time;
      if (timeA < timeB) return -1;
      if (timeA > timeB) return 1;
      return 0;
    });

  return (
    <div className={style.days}>
      <div className={style.datetime}>
        <div className={style.dates}>
          Day <h3>{props.date}</h3>
        </div>
        <div>
          <div className={style.oneline}>
            <div>
              &nbsp;&nbsp;
              <span>장소 </span>
              <select onChange={changeSelectedPlace} value={selectedPlace}>
                <option>장소를 선택해 주세요</option>
                {markedPlaces.length > 0 &&
                  markedPlaces.map((place) => {
                    return (
                      <option value={place.name} key={place.id}>
                        {place.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>시간 </span>&nbsp;
              <input type="time" onChange={changeSelectedTime} value={selectedTime} />
            </div>

            <div className={style.toplinebtn}>
              &nbsp;&nbsp;
              <button onClick={addPlanHandler}>등록</button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.timeplace}>
        {filteredPlan &&
          filteredPlan.length !== 0 &&
          filteredPlan.map((plan) => {
            return (
              <div className={style.place_a}>
                <div className={style.placewrap}>
                  <div className={style.placetime}>
                    <div
                      className={style.timeicon}
                      onClick={() => removePlanHandler(plan.id)}
                      onMouseOver={() => setIsHovering(1)}
                      onMouseOut={() => setIsHovering(0)}
                    >
                      {isHovering ? <HighlightOffIcon /> : <AlarmOnIcon />}
                    </div>
                    {plan.time}
                  </div>
                  <div className={style.placeadd}>
                    <div className={style.placetit}>{plan.place}</div>
                    <div className={style.placeaddress}>{plan.address}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlanningOfDay;
