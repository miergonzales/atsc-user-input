import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYPjRZFbhk1wzDHy2twbDN27Lig5X6Nvc",
  authDomain: "atsc-development.firebaseapp.com",
  databaseURL: "https://atsc-development-default-rtdb.firebaseio.com",
  projectId: "atsc-development",
  storageBucket: "atsc-development.appspot.com",
  messagingSenderId: "183179970755",
  appId: "1:183179970755:web:f547ebb28ab19b731cfa76"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
