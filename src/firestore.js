import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, getDocs, setDoc, deleteDoc, writeBatch } from "firebase/firestore";
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
  shoppingList.sort((a, b) => (a.order > b.order ? 1 : -1));
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

export async function dbUpdate(items) {
  const batch = writeBatch(db);
  const querySnapshot = await getDocs(collection(db, "shopping_list"));
  querySnapshot.forEach((item) => {
    batch.delete(doc(db, "shopping_list", item.id));
  });

  items.forEach((item) => {
    batch.set(doc(db, "shopping_list", item.id), item);
  });
  await batch.commit();
}
