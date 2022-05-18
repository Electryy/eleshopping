import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { collection, doc, query, orderBy, getDocs, writeBatch, onSnapshot } from "firebase/firestore";

initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
});

const db = getFirestore();

/**
 * Get all items in the document
 * @param {String} document document name
 * @returns Array of results
 */
export async function dbGetAll(document) {
  const q = query(collection(db, document), orderBy("timestamp"));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

/**
 * Listen to live database changes
 * @param {String} document document name
 * @param {function(Object)} handleChanges Change callback
 * @returns
 */
export function dbLiveUpdates(document, handleChanges) {
  const q = query(collection(db, document));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    handleChanges(snapshot);
  });
  return unsubscribe;
}

/**
 * Add items to the db
 * @param {String} document document name
 * @param {Object[]} items Array of items
 */
export async function dbAdd(document, data) {
  const batch = writeBatch(db);

  data.forEach((item) => {
    item["timestamp"] = serverTimestamp();
    batch.set(doc(db, document, item.id), item);
  });
  await batch.commit();
}

/**
 * Update items
 * @param {String} document document name
 * @param {Object[]} data Array of items
 */
export async function dbUpdate(document, data) {
  const batch = writeBatch(db);
  data.forEach((item) => {
    batch.update(doc(db, document, item.id), item);
  });
  await batch.commit();
}

/**
 * Remove items from db
 * @param {String} document document name
 * @param {Object[]} data Array of items
 */
export async function dbRemove(document, data) {
  const batch = writeBatch(db);
  data.forEach((item) => {
    batch.delete(doc(db, document, item.id), item);
  });
  await batch.commit();
}
