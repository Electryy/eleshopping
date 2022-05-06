import * as firestore from "./firestore";
import * as localstore from "./localstore";

const document = "recipes";

const jotai = false;

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
  await store.dbAdd(document, [item]);
}

/**
 * Update recipe
 * @param {Object} item item to update
 */
export async function update(item) {
  // Convert single item to array
  const items = Array.isArray(item) ? item : [item];

  await store.dbUpdateBatch(document, items);
}

/**
 * Delete recipe
 * @param {Object} item item to delete
 */
export async function deleteItem(item) {
  // Convert single item to array
  const items = Array.isArray(item) ? item : [item];

  await store.dbDeleteBatch(document, items);
}
