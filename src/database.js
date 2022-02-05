import { dbPull, dbUpdate, dbAdd, dbDelete, dbDeleteBatch, dbUpdateBatch } from "./firestore";

export function storeAdd(item) {
  dbAdd(extractStoreableFields(item));
}
export async function storeGetAll() {
  let shoppingList = await dbPull();
  // add needed local states
  shoppingList = addLocalFields(shoppingList);
  // sort by order
  shoppingList.sort((a, b) => (a.order > b.order ? 1 : -1));
  return shoppingList;
}

export async function storeDelete(item) {
  let items = Array.isArray(item) ? item : [item];
  await dbDeleteBatch(cleanLocalFields(items));
}

export async function storeUpdate(item, propertyName = null) {
  dbUpdate(item, { [propertyName]: item[propertyName] });
}

export async function storeDeleteBatch(items) {
  dbDeleteBatch(cleanLocalFields(items));
}

export async function storeUpdateBatch(items) {
  dbUpdateBatch(cleanLocalFields(items));
}

function extractStoreableFields(item) {
  return {
    id: item.id,
    text: item.text,
    checked: item.checked,
    order: item.order,
  };
}

function cleanLocalFields(items) {
  let cleanItems = [];
  items.forEach((item) => {
    cleanItems.push(extractStoreableFields(item));
  });
  return cleanItems;
}

function addLocalFields(items) {
  return items.map((item) => ({ ...item, isEditing: false }));
}
