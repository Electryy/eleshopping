import * as firestore from "./firestore";
import * as localstore from "./localstore";
import { sortByOrder } from "../modules/utils";

const document = "shopping_list";

// If firestore api key is not found -> use local storage as database
const store = process.env.REACT_APP_apiKey ? firestore : localstore;

/**
 * Get all ShoppingListItems from storage
 * @returns Array of items
 */
export async function getAll() {
  let shoppingList = await store.dbGetAll(document);
  //shoppingList = addLocalProperties(shoppingList);

  // sort by order desc
  shoppingList.sort((a, b) => (a.order < b.order ? 1 : -1));
  return shoppingList;
}

/**
 * Add ShoppingListItem item/items to storage
 * @param {Obect|Object[]} item item or items
 */
export async function add(item) {
  // convert to array
  let items = Array.isArray(item) ? item : [item];

  await store.dbAdd(document, items);
}

/**
 * Listen to live changes in the database
 * @param {function(Object)} getShoppingList
 * @param {function(Object)} setShoppingList
 * @returns Unsubscribe method
 */
export function subscribe(getShoppingList, setShoppingList) {
  const handleChanges = function (snapshot) {
    if (snapshot.metadata.hasPendingWrites) {
      return;
    }
    let shoppingListCpy = [...getShoppingList()];
    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data();
      if (change.type === "added") {
        if (!shoppingListCpy.some((item) => item.id === data.id)) {
          shoppingListCpy.push(data);
        }
      }
      if (change.type === "modified") {
        let item = shoppingListCpy.find((item) => item.id === data.id);
        Object.assign(item, data);
      }
      if (change.type === "removed") {
        shoppingListCpy = shoppingListCpy.filter(function (item) {
          return item.id !== data.id;
        });
      }
    });
    sortByOrder(shoppingListCpy);
    setShoppingList(shoppingListCpy);
  };

  return store.dbLiveUpdates(document, handleChanges);
}

/**
 * Delete items from storage
 * @param {Obect|Object[]} item item or items
 */
export async function deleteItem(item) {
  // Convert single item to array
  const items = Array.isArray(item) ? item : [item];

  await store.dbRemove(document, items);
}

/**
 * Update item properties in storage. Accepts item or array of items.
 * @param {Object|Object[]} item item or items to update
 */
export async function update(item) {
  // Convert single item to array
  const items = Array.isArray(item) ? item : [item];

  await store.dbUpdate(document, items);
}
