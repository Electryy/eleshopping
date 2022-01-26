import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
});

const db = getFirestore();

export async function dbPush(item) {
  try {
    await setDoc(doc(db, "shopping_list", item.id), item);
    console.log("saved");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function dbPull() {
  const querySnapshot = await getDocs(collection(db, "shopping_list"));
  let shoppingList = [];
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    shoppingList.push(doc.data());
  });
  return shoppingList;
}

export function dbDelete(items) {
  let itemsArray = [];
  if (Array.isArray(items)) {
    itemsArray = items;
  } else {
    itemsArray.push(items);
  }
  itemsArray.forEach((item) => {
    deleteDoc(doc(db, "shopping_list", item.id));
  });
}
