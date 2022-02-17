import { dbGetDoc, dbAdd, dbDeleteBatch, dbUpdateBatch } from "./firestore";

const ShoppingListStorage = function () {
  const document = "shopping_list";

  /**
   * Add ShoppingListItem item to storage
   * @param {Object} item ShoppingListItem as is from state
   */
  this.add = async function (item) {
    await dbAdd(document, item.id, extractStoreableFields(item));
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
};

export default ShoppingListStorage;
