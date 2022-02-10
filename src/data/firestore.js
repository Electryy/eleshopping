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

export async function dbAdd(document, id, item) {
  await setDoc(doc(db, document, id), item);
}
export async function dbPull(document) {
  const querySnapshot = await getDocs(collection(db, document));
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

export async function dbDelete(id) {
  await deleteDoc(doc(db, "shopping_list", id));
}

export async function dbUpdateBatch(document, dbItems) {
  const batch = writeBatch(db);
  console.log(dbItems);
  dbItems.forEach((dbItem) => {
    batch.update(doc(db, document, dbItem.id), dbItem.item);
  });
  await batch.commit();
}

export async function dbDeleteBatch(document, items) {
  const batch = writeBatch(db);
  items.forEach((id) => {
    batch.delete(doc(db, document, id));
  });
  await batch.commit();
}

export async function dbUpdate(item, data) {
  const itemRef = doc(db, "shopping_list", item.id);
  await updateDoc(itemRef, data);
}
