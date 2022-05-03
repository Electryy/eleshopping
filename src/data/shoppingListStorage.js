import { dbGetDoc, dbAdd, dbDeleteBatch, dbUpdateBatch, dbLiveUpdates } from "./firestore";
import { sortByOrder } from "../modules/utils";
import { snapshotEqual } from "firebase/firestore";

const ShoppingListStorage = function () {
  const document = "shopping_list";

  /**
   * Add ShoppingListItem item/items to storage
   * @param {Obect|Object[]} item item or items
   */
  this.add = async function (item) {
    // convert to array
    let items = Array.isArray(item) ? item : [item];

    await dbAdd(document, items);
  };

  /**
   *
   * @param
   */
  this.subscribe = function (getShoppingList, setShoppingList) {
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

    return dbLiveUpdates(document, handleChanges);
  };

  /**
   * Get all ShoppingListItems from storage
   * @returns Array of items
   */
  this.getAll = async function () {
    let shoppingList = await dbGetDoc(document);
    //shoppingList = addLocalProperties(shoppingList);

    // sort by order desc
    shoppingList.sort((a, b) => (a.order < b.order ? 1 : -1));
    return shoppingList;
  };

  /**
   * Delete items from storage
   * @param {Obect|Object[]} item item or items
   */
  this.delete = async function (item) {
    // convert to array
    let items = Array.isArray(item) ? item : [item];

    // Get ids
    let data = items.map((item) => {
      return item.id;
    });
    await dbDeleteBatch(document, data);
  };

  /**
   * Update item properties in storage. Accepts item or array of items.
   * @param {Object|Object[]} item item or items to update
   * @param {String|String[]} propertyName Property name or names to update
   */
  this.update = async function (item, propertyName) {
    // Convert single item to array
    const items = Array.isArray(item) ? item : [item];

    // Convert propertyNames to array if single item
    const propertyNames = Array.isArray(propertyName) ? propertyName : [propertyName];

    // Extract only the properties that need to be saved
    let dbItems = [];
    items.forEach((item) => {
      let extracted = {};
      // propertyNames is ["order", "id"] for example
      propertyNames.forEach((prop) => {
        extracted[prop] = item[prop];
      });
      // extracted is {order: 1, id: foobar} for example
      // complete data object is "1234: {order: 1, id: foobar}" for example
      dbItems[item.id] = extracted;
    });
    await dbUpdateBatch(document, dbItems);
  };

  /**
   * Get saveable properties
   * @param {Object} item shoppingList item
   * @returns ShoppingList item with only saveable properties
   */
  function extractStoreableFields(item) {
    const { id, text, checked, order } = item;
    return { id, text, checked, order };
  }
};

export default ShoppingListStorage;
