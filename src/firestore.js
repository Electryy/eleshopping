import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, getDocs, setDoc, deleteDoc, writeBatch, updateDoc } from "firebase/firestore";
const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
});

const db = getFirestore();

export async function dbAdd(item) {
  try {
    console.log("dbAdd", item);
    await setDoc(doc(db, "shopping_list", item.id), item);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function dbPull() {
  const querySnapshot = await getDocs(collection(db, "shopping_list"));
  let shoppingList = [];
  querySnapshot.forEach((doc) => {
    shoppingList.push(doc.data());
  });
  return shoppingList;
}

export function dbDelete(id) {
  deleteDoc(doc(db, "shopping_list", id));
}

export async function dbUpdateBatch(items) {
  const batch = writeBatch(db);
  items.forEach((item) => {
    batch.update(doc(db, "shopping_list", item.id), item);
  });
  await batch.commit();
}

export async function dbDeleteBatch(items) {
  const batch = writeBatch(db);
  items.forEach((item) => {
    batch.delete(doc(db, "shopping_list", item.id), item);
  });
  await batch.commit();
}

export async function dbUpdate(item, data) {
  const itemRef = doc(db, "shopping_list", item.id);
  updateDoc(itemRef, data);
}
