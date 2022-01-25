import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseApp = initializeApp({
  apiKey: "AIzaSyC5GSOK0WmU4k_xnnkG3HelJ9z3kyAWqPQ",
  authDomain: "groceryshopping-d1e8a.firebaseapp.com",
  projectId: "groceryshopping-d1e8a",
  storageBucket: "groceryshopping-d1e8a.appspot.com",
  messagingSenderId: "1090826541047",
  appId: "1:1090826541047:web:97225b81868751d0e800f2",
});

const db = getFirestore();

export default db;
