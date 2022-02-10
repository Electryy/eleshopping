import { dbPull, dbAdd, dbDeleteBatch, dbUpdateBatch } from "./firestore";

const document = "shopping_list";

export async function storeAdd(item) {
  await dbAdd(document, item.id, extractStoreableFields(item));
}
export async function storeGetAll() {
  let shoppingList = await dbPull(document);
  //shoppingList = addLocalProperties(shoppingList);

  // sort by order desc
  shoppingList.sort((a, b) => (a.order < b.order ? 1 : -1));
  return shoppingList;
}

export async function storeDelete(item) {
  // convert to array
  let items = Array.isArray(item) ? item : [item];

  // Get ids
  let data = items.map((item) => {
    return item.id;
  });
  await dbDeleteBatch(document, data);
}

export async function storeUpdate(item, property) {
  // Convert single item to array
  const items = Array.isArray(item) ? item : [item];

  // Convert properties to array if single item
  const properties = Array.isArray(property) ? property : [property];

  // Extract only the properties that need to be saved
  let dbItems = [];
  items.forEach((item) => {
    let extracted = {};
    // properties is ["order", "id"] for example
    properties.forEach((prop) => {
      extracted[prop] = item[prop];
    });
    // extracted is {order: 1, id: foobar} for example
    // complete data object is "1234: {order: 1, id: foobar}" for example
    dbItems[item.id] = extracted;
  });
  await dbUpdateBatch(document, dbItems);
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
