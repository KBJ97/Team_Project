import PlanItem from "./PlanItem";
import { useEffect, useState } from "react";
import { getNowValue, getqueryData } from "../../common";
import { useSelector } from "react-redux";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from "./PlanItemList.module.css";


const PlanItemList = () => {
  const [planList, setPlanList] = useState();
  const [participatedPlans, setParticipatedPlans] = useState();
  const currentUserInfo = useSelector((state) => state.user.currentUserInfo);
  const getparticipatedPlans = async () => {
    const q = query(collection(db, "planList"), where("companion", "array-contains", currentUserInfo.uid), where("uid", "!=", currentUserInfo.uid));
    const querySnapshot = await getDocs(q);
    const loadedData = querySnapshot.docs.map((doc) => doc.data());
    setParticipatedPlans(loadedData);
  };
  useEffect(() => {
    getqueryData("planList", "uid", "==", currentUserInfo.uid, setPlanList);
    getparticipatedPlans();
  }, [currentUserInfo]);
  useEffect(() => {
    if (participatedPlans) {
      setPlanList((prev) => {
        return [...prev, ...participatedPlans];
      });
    }
  }, [participatedPlans]);
  const prevPlanList =
    planList && participatedPlans
      ? planList.filter((plan) => {
          const nowValue = getNowValue();
          const endsValue = new Date(plan.endsDate.slice(0, 4), plan.endsDate.slice(5, 7) - 1, Number(plan.endsDate.slice(-2)) + 1).valueOf();
          return nowValue > endsValue;
        })
      : null;
  const nextPlanList =
    planList && participatedPlans
      ? planList.filter((plan) => {
          const nowValue = getNowValue();
          const endsValue = new Date(plan.endsDate.slice(0, 4), plan.endsDate.slice(5, 7) - 1, Number(plan.endsDate.slice(-2)) + 1).valueOf();
          return nowValue <= endsValue;
        })
      : null;


  return (
    <div className={styles.planlist}>
        
      <div> <div className={styles.planlistpast}>
        <h3>지난 여행</h3>
        {prevPlanList && prevPlanList.length !== 0 ? (
          prevPlanList.map((plan) => {
            return <PlanItem key={plan.planId} plan={plan} />;
          })
        ) : (
          <div> <h3>완료한 여행이 없습니다. </h3></div>
        )}
      </div> <br />
        <div className={styles.planlistcurrent}> 
        <h3>진행중인 여행</h3>
        {nextPlanList && nextPlanList.length !== 0 ? (
          nextPlanList.map((plan) => {
            return <PlanItem key={plan.planId} plan={plan} />;
          })
        ) : (
          <div> <h3>계획중인 여행이 없습니다.</h3></div>
        )}
      </div></div>
    </div>
  );
};

export default PlanItemList;
