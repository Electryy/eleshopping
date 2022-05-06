import * as firestore from "./firestore";
import * as localstore from "./localstore";

const document = "recipes";

// If firestore api key is not found -> use local storage as database
const store = process.env.REACT_APP_apiKey && false ? firestore : localstore;

/**
 * Get all Recipes from storage
 * @returns Array of items
 */
export async function getAll() {
  let recipes = await store.dbGetAll(document);
  return recipes;
}

/**
 * Add recipe
 * @param {Object} item item to add
 */
export async function add(item) {
  // Convert item to array
  await store.dbAdd(document, [item]);
}

/**
 * Update recipe
 * @param {Object} item item to update
 */
export async function update(item) {
  // Convert item to array
  await store.dbUpdateBatch(document, [item]);
}

/**
 * Delete recipe
 * @param {Object} item item to delete
 */
export async function deleteItem(item) {
  // Convert item to array
  await store.dbDeleteBatch(document, [item]);
}
