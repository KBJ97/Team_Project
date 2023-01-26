import { useEffect } from "react";
import { useState } from "react";
import { getqueryData } from "../../common";
import RequestUser from "./RequestUser";
import styles from "./RequestAccompany.module.css";

const RequestAccompany = (props) => {
  const [requestUser, setRequestUser] = useState(null);
  useEffect(() => {
    getqueryData("userList", "uid", "in", props.request, setRequestUser);
  }, [props.request]);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {requestUser &&
          requestUser.map((user) => {
            return (
              <RequestUser
                key={user.uid}
                user={user}
                plan={props.plan}
                onToggleRequest={props.onToggleRequest}
                onRemoveRequest={props.onRemoveRequest}
                planner={props.planner}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default RequestAccompany;
