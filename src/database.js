import { dbPull, dbUpdate, dbAdd, dbDelete, dbDeleteBatch, dbUpdateBatch } from "./firestore";

export function storeAdd(item) {
  dbAdd(extractStoreableFields(item));
}
export async function storeGetAll() {
  let shoppingList = await dbPull();
  shoppingList = addLocalProperties(shoppingList);
  // sort by order
  shoppingList.sort((a, b) => (a.order > b.order ? 1 : -1));
  return shoppingList;
}

export async function storeDelete(item) {
  const items = Array.isArray(item) ? item : [item];
  await dbDeleteBatch(cleanLocalProperties(items));
}

export async function storeUpdate(item, property) {
  const items = Array.isArray(item) ? item : [item];
  const properties = Array.isArray(property) ? property : [property];
  let dbItems = [];
  items.forEach((item) => {
    dbItems.push(extractProperties(item, properties));
  });
  await dbUpdateBatch(dbItems);
}

export async function storeUpdateProperty(item, propertyName = null) {
  await dbUpdate(item, { [propertyName]: item[propertyName] });
}

export async function storeDeleteBatch(items) {
  await dbDeleteBatch(cleanLocalProperties(items));
}

export async function storeUpdateBatch(items) {
  await dbUpdateBatch(cleanLocalProperties(items));
}

function extractStoreableFields(item) {
  return {
    id: item.id,
    text: item.text,
    checked: item.checked,
    order: item.order,
  };
}

function cleanLocalProperties(items) {
  let cleanItems = [];
  items.forEach((item) => {
    cleanItems.push(extractStoreableFields(item));
  });
  return cleanItems;
}

function addLocalProperties(items) {
  return items.map((item) => ({ ...item, isEditing: false }));
}

function extractProperties(item, properties) {
  let extracted = { id: item.id };
  properties.forEach((property) => {
    extracted[property] = item[property];
  });
  console.log(extracted);
  return extracted;
}
