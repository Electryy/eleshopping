import { dbGetAll, dbDelete, dbAdd, dbUpdate } from "./firestore";

const RecipesStorage = function () {
  const document = "recipes";

  /**
   * Get all Recipes from storage
   * @returns Array of items
   */
  this.getAll = async function () {
    let recipes = await dbGetAll(document);
    return recipes;
  };

  /**
   * Add recipe
   * @param {Object} item item to add
   */
  this.add = async function (item) {
    await dbAdd(document, [item]);
  };

  /**
   * Update recipe
   * @param {Object} item item to update
   */
  this.update = async function (item) {
    await dbUpdate(document, item.id, item);
  };

  /**
   * Delete recipe
   * @param {Object} item item to delete
   */
  this.delete = async function (item) {
    await dbDelete(document, item.id, item);
  };
};

export default RecipesStorage;
