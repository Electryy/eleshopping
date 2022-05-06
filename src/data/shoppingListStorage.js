import * as firestore from "./firestore";
import * as localstore from "./localstore";
import { sortByOrder } from "../modules/utils";

const store = process.env.REACT_APP_apiKey && false ? firestore : localstore;

const document = "shopping_list";

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
 *
 * @param
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
        item = Object.assign(item, data);
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
 * Delete items from storage
 * @param {Obect|Object[]} item item or items
 */
export async function deleteItem(item) {
  // Convert single item to array
  const items = Array.isArray(item) ? item : [item];

  await store.dbDeleteBatch(document, items);
}

/**
 * Update item properties in storage. Accepts item or array of items.
 * @param {Object|Object[]} item item or items to update
 * @param {String|String[]} propertyName Property name or names to update
 */
export async function update(item) {
  // Convert single item to array
  const items = Array.isArray(item) ? item : [item];

  await store.dbUpdateBatch(document, items);
}
