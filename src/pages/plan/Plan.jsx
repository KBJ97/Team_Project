import PlanPlace from "../../components/Plan/PlanPlace";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addData, getId, getNowDate, getNowValue, getSingleData, updatePushData } from "../../common";
import { useSelector } from "react-redux";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import PlaceMap from "../../components/Plan/PlaceMap";
import { Badge } from "@mui/material";
import RequestAccompany from "../../components/Plan/RequestAccompany";
import Companions from "../../components/Plan/Companions";
import useToggle from "../../hooks/useToggle";
import styles from "./Plan.module.css";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";

const Plan = () => {
  const [plan, setPlan] = useState();
  const [coordinates, setCoordinates] = useState(null);
  const [planner, setPlanner] = useState(null);
  const [requestIsShonw, toggleRequestIsShown] = useToggle(false);
  const [companionIsShown, toggleCompanionIsShown] = useToggle(false);
  const params = useParams();
  const navigate = useNavigate();
  const planId = params.planId;
  const currentUserInfo = useSelector((state) => state.user.currentUserInfo);
  const length = plan?.period === "당일" ? 1 : Number(plan?.period.slice(-2, -1));
  useEffect(() => {
    getSingleData("planList", planId, setPlan);
  }, [planId]);
  useEffect(() => {
    if (plan && !planner) getSingleData("userList", plan.uid, setPlanner);
    if (plan && !coordinates) setCoordinates(plan?.plan[0].position);
  }, [plan]);
  const deletePosting = async () => {
    const q = query(collection(db, "postingList"), where("planId", "==", planId));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.docs.map((doc) => {
      data.push(doc.data());
    });
    data.map(async (data) => {
      await deleteDoc(doc(db, "postingList", data.pid));
    });
  };
  const removePlanHandler = async () => {
    await deleteDoc(doc(db, "planList", planId));
    deletePosting();
    navigate("/myplans");
  };
  const changeCenterHandler = (position) => {
    setCoordinates(position);
  };
  const removeRequestHandler = (uid, isAccept) => {
    const filteredRequest = plan.request.filter((user) => {
      return user !== uid;
    });
    setPlan((prev) => {
      if (isAccept) {
        return { ...prev, request: filteredRequest, companion: [...prev.companion, uid] };
      } else {
        return { ...prev, request: filteredRequest };
      }
    });
  };
  const dateContent = plan?.period === "당일" ? plan?.startDate : `${plan?.startDate} ~ ${plan?.endsDate}`;
  const sharePlanHandler = () => {
    const text = `${currentUserInfo.name}님의 여행 계획 : ${plan.title}\n여행 기간 : ${dateContent}(${plan.period})`;
    const addedPosting = {
      pid: getId(),
      writer: currentUserInfo.uid,
      timestamp: getNowValue(),
      writeDate: getNowDate(),
      isPublic: true,
      isPlan: true,
      planId,
      images: [],
      comments: [],
      hashtags: ["여행계획"],
      like: [],
      text,
    };
    try {
      addData("postingList", addedPosting.pid, addedPosting);
      alert("여행계획을 공유했습니다.");
      navigate("/");
    } catch (e) {
      alert("업로드 실패");
    }
  };
  const requestAccompanyHandler = () => {
    const notice = { nid: getId(), text: `${currentUserInfo.name}님이 [${plan.title}]의 동행을 요청했습니다.` };
    try {
      updatePushData("planList", planId, "request", currentUserInfo.uid, true);
      setPlan((prev) => {
        return { ...prev, request: [...prev?.request, currentUserInfo.uid] };
      });
      updatePushData("userList", planner.uid, "notice", notice, true);
      alert("동행요청 완료");
    } catch (e) {
      alert("동행요청 실패");
    }
  };

  const btn =
    currentUserInfo.uid === plan?.uid ? (
      <div style={{ display: "flex" }}>
        <button className={styles.btnitem} onClick={sharePlanHandler}>
          <ShareIcon style={{ color: "#35a5a6" }} />
        </button>
        <button className={styles.btnitem} onClick={removePlanHandler}>
          <DeleteIcon style={{ color: "#35a5a6" }} />
        </button>
        {plan?.request && plan.request.length !== 0 && (
          <div style={{ position: "relative" }}>
            <Badge badgeContent={plan.request.length} color="primary">
              <button onClick={toggleRequestIsShown} className={styles.btnitem} style={{padding : "11px 20px"}}>동행 요청 확인</button>
            </Badge>
            {requestIsShonw && (
              <RequestAccompany
                request={plan.request}
                plan={plan}
                planner={planner}
                onToggleRequest={toggleRequestIsShown}
                onRemoveRequest={removeRequestHandler}
              />
            )}
          </div>
        )}
      </div>
    ) : plan?.request?.includes(currentUserInfo.uid) ? (
      <div className={`${styles.btnitem} ${styles.ing}`}>동행 요청 중</div>
    ) : !plan?.companion?.includes(currentUserInfo.uid) ? (
      <div>
        <button onClick={requestAccompanyHandler} className={styles.btnitem}>동행 요청</button>
      </div>
    ) : null;
  return (
    <div className={styles.PlanALL}>
      <div>
        <div className={styles.firstwrap}>
          <div className={styles.firstline}>
            <div className={styles.firsth2}>
              <h2>{plan?.title}</h2>
            </div>
            <div className={styles.btns}>{btn}</div>
          </div>
        </div>
      </div>
      <div className={styles.seclines}>
        <div className={styles.secdates}>
          <h3>{plan?.period} </h3>
        </div>
        <div className={styles.secconts}>
          <u>{dateContent} </u>
        </div>
      </div>
      <br />
      <div className={styles.friends}>
        <span>
          <b>함께 여행 {plan?.companion?.length}명</b>&nbsp;&nbsp;
        </span>
        <button className={styles.btnitem} onClick={toggleCompanionIsShown}>
          확인
        </button>
        {companionIsShown && (
          <div style={{ display: "flex", gap: "20px" }}>
            {plan &&
              plan.companion.map((uid) => {
                return <Companions uid={uid} key={uid} />;
              })}
            <br />
          </div>
        )}
      </div>
      <div></div>
      <div className={styles.nextfirst}>
        <div>{coordinates && <PlaceMap plan={plan} coordinates={coordinates} />}</div>
        <div className={styles.nexttexts}>
          {length &&
            Array(length)
              .fill()
              .map((el, idx) => {
                const filteredPlan = plan.plan.filter((plan) => plan.whatDate === idx + 1);
                return <PlanPlace key={idx} date={idx + 1} plan={filteredPlan} onChangeCenter={changeCenterHandler} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default Plan;
