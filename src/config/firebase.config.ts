import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDj_QMPEm3JLkPd4MUkdoJX2Ad-g9tcBU",
  authDomain: "hrm-app-39bd9.firebaseapp.com",
  databaseURL:
    "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hrm-app-39bd9",
  storageBucket: "hrm-app-39bd9.appspot.com",
  messagingSenderId: "832039794807",
  appId: "1:832039794807:web:9040ba14779a13af856e72",
  measurementId: "G-FF78NMEGPK",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
