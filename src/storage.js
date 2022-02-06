import { dbPull, dbAdd, dbDeleteBatch, dbUpdateBatch } from "./firestore";

export async function storeAdd(item) {
  await dbAdd(extractStoreableFields(item));
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

/**
 * Get saveable properties
 * @param {Object} item shoppingList item
 * @returns ShoppingList item with only saveable properties
 */
function extractStoreableFields(item) {
  const { id, text, checked, order } = item;
  return { id, text, checked, order };
}

/**
 * Remove all state properties and return saveable object for database
 * @param {Object[]} items shoppingList items
 * @returns ShoppingList items
 */
function cleanLocalProperties(items) {
  let cleanItems = [];
  items.forEach((item) => {
    cleanItems.push(extractStoreableFields(item));
  });
  return cleanItems;
}

/**
 * Add necessary state properties for view (not saved to database)
 * @param {Object[]} items Array of shoppingList items
 * @returns ShoppingList items
 */
function addLocalProperties(items) {
  return items.map((item) => ({
    ...item,
    isEditing: false,
    toolsVisible: false,
  }));
}

/**
 * Return only selected properties from object
 * @param {Object} item Item object
 * @param {string|string[]} properties Array of strings
 * @returns Object
 */
function extractProperties(item, properties) {
  let extracted = { id: item.id };
  properties.forEach((property) => {
    extracted[property] = item[property];
  });
  return extracted;
}
