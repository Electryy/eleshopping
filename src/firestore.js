import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDocs, setDoc, deleteDoc, writeBatch, updateDoc } from "firebase/firestore";
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
  await setDoc(doc(db, "shopping_list", item.id), item);
}
export async function dbPull() {
  const querySnapshot = await getDocs(collection(db, "shopping_list"));
  let shoppingList = [];
  querySnapshot.forEach((doc) => {
    shoppingList.push(doc.data());
  });
  return shoppingList;
}

export async function dbDelete(id) {
  await deleteDoc(doc(db, "shopping_list", id));
}

export async function dbUpdateBatch(items) {
  const batch = writeBatch(db);
  items.forEach((item) => {
    batch.update(doc(db, "shopping_list", item.id), item);
  });
  console.log(items);
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
  await updateDoc(itemRef, data);
}
