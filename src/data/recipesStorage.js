import * as firestore from "./firestore";
import * as localstore from "./localstore";

const document = "recipes";

// If firestore api key is not found -> use local storage as database
const store = process.env.REACT_APP_apiKey ? firestore : localstore;

// Do we want demo data to play with? Change this in .env file
const shouldCreateDemoData = process.env.REACT_APP_useDemoData.toLowerCase() === "true";

/**
 * Get all Recipes from storage
 * @returns Array of items
 */
export async function getAll() {
  let recipes = await store.dbGetAll(document);

  if (!recipes.length && shouldCreateDemoData) {
    recipes = await createDemoData();
  }
  return recipes;
}

/**
 * Add recipe
 * @param {Object|Object[]} item item to add
 */
export async function add(item) {
  // convert to array
  let items = Array.isArray(item) ? item : [item];

  await store.dbAdd(document, items);
}

/**
 * Update recipe
 * @param {Object} item item to update
 */
export async function update(item) {
  // Convert item to array
  await store.dbUpdate(document, [item]);
}

/**
 * Delete recipe
 * @param {Object} item item to delete
 */
export async function deleteItem(item) {
  // Convert item to array
  await store.dbRemove(document, [item]);
}

/**
 * Create demo data for tinkering and testing
 * @returns Array of items
 */
async function createDemoData() {
  const demodata = require("./demodata/recipes.json");
  await add(demodata);
  return demodata;
}
