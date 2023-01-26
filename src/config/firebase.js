import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjA9sUZVxjerQYoORlOpD1M_2CVzb3lUw",
  authDomain: "travel-1g.firebaseapp.com",
  projectId: "travel-1g",
  storageBucket: "travel-1g.appspot.com",
  messagingSenderId: "642041405491",
  appId: "1:642041405491:web:f41b75b6fa6d5a63c4c346"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
