import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { collection, doc, query, orderBy, getDocs, setDoc, deleteDoc, writeBatch, updateDoc } from "firebase/firestore";
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
  item["timestamp"] = serverTimestamp();
  await setDoc(doc(db, document, id), item);
}

export async function dbGetDoc(document) {
  const q = query(collection(db, document), orderBy("timestamp"));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

export async function dbUpdateBatch(document, data) {
  const batch = writeBatch(db);
  // data is "123: {order: 1}" for example
  for (const id in data) {
    batch.update(doc(db, document, id), data[id]);
  }
  await batch.commit();
}

export async function dbDeleteBatch(document, items) {
  const batch = writeBatch(db);
  items.forEach((id) => {
    batch.delete(doc(db, document, id));
  });
  await batch.commit();
}
export async function dbDelete(document, id) {
  await deleteDoc(doc(db, document, id));
}
export async function dbUpdate(document, id, data) {
  await updateDoc(doc(db, document, id), data);
}
