import { GoogleMap, InfoWindow, LoadScript } from "@react-google-maps/api";

import styles from "./PlaceMap.module.css";
const containerStyle = {
  width: "100%",
  height: "400px",
};
const PlaceMap = (props) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyA6OrenYAlZUEIfy_7PIFEwL4sRxu2cV64" libraries={["places"]}>
      <GoogleMap mapContainerStyle={containerStyle} zoom={15} center={props.coordinates}>
        {props.plan.plan.map((plan) => {
          return (
            <InfoWindow position={plan.position} key={plan.id} options={{disableAutoPan:true}}>
              <div className={styles.window_container}>
                <div className={styles.window_header_wrap}>
                  <p><b>[Day {plan.whatDate}]</b></p>
                  <p>{plan.time}</p>
                </div>
                  <p>{plan.place}</p>
              </div>
            </InfoWindow>
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default PlaceMap;
