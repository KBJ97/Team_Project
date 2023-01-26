import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./config/firebase";

// 현재 시간 기준 Date 객체
export const getNow = () => new Date();

// 현재 날짜(2022. 12. 7.) 형식
export const getNowDate = () => new Date().toLocaleString();

// 현재 시간 기준 밸류값
export const getNowValue = () => new Date().valueOf();

// 랜덤 id 생성
export const getId = () => Math.random().toString(32).slice(2);

// 파이어베이스 콜렉션 내 모든 데이터 불러오기
export const getCollection = async (collectionId, setState) => {
  const querySnapshot = await getDocs(collection(db, collectionId));
  const result = querySnapshot.docs.map((doc) => doc.data());
  setState(result);
};

// 파이어베이스 콜렉션 내 특정 데이터 불러오기
export const getSingleData = async (collectionId, docId, setState) => {
  const docRef = doc(db, collectionId, docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setState(docSnap.data());
  }
};

//파이어베이스 콜렉션 내 조건에 따른 데이터 불러오기

export const getqueryData = async (
  collectionId,
  element,
  operator,
  conditionData,
  setState
) => {
  const q = query(
    collection(db, collectionId),
    where(element, operator, conditionData)
  );
  const querySnapshot = await getDocs(q);
  const loadedData = querySnapshot.docs.map((doc) => doc.data());
  setState(loadedData);
};

//파이어베이스 콜렉션 내 데이터 저장
export const addData = async (collectionId, docId, data) => {
  await setDoc(doc(db, collectionId, docId), data);
};

//파이어베이스 콜랙션 내 데이터 배열 요소 추가, 삭제
export const updatePushData = async (
  collectionId,
  docId,
  element,
  pushData,
  isAdded
) => {
  const docRef = doc(db, collectionId, docId);
  if (isAdded) {
    await updateDoc(docRef, {
      [element]: arrayUnion(pushData),
    });
  } else {
    await updateDoc(docRef, {
      [element]: arrayRemove(pushData),
    });
  }
};
